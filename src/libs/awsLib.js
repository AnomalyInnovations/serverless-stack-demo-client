import AWS from "aws-sdk";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import sigV4Client from "./sigV4Client";
import config from "../config";

export async function invokeApig({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  body
}) {
  if (!await authUser()) {
    throw new Error("User is not logged in");
  }

  const signedRequest = sigV4Client
    .newClient({
      accessKey: AWS.config.credentials.accessKeyId,
      secretKey: AWS.config.credentials.secretAccessKey,
      sessionToken: AWS.config.credentials.sessionToken,
      region: config.apiGateway.REGION,
      endpoint: config.apiGateway.URL
    })
    .signRequest({
      method,
      path,
      headers,
      queryParams,
      body
    });

  body = body ? JSON.stringify(body) : body;
  headers = signedRequest.headers;

  const results = await fetch(signedRequest.url, {
    method,
    headers,
    body
  });

  if (results.status !== 200) {
    throw new Error(await results.text());
  }

  return results.json();
}

export async function s3Upload(file) {
  if (!await authUser()) {
    throw new Error("User is not logged in");
  }

  const s3 = new AWS.S3({
    params: {
      Bucket: config.s3.BUCKET
    }
  });
  const filename = `${AWS.config.credentials
    .identityId}-${Date.now()}-${file.name}`;

  return s3
    .upload({
      Key: filename,
      Body: file,
      ContentType: file.type,
      ACL: "public-read"
    })
    .promise();
}

export async function authUser() {
  if (
    AWS.config.credentials &&
    Date.now() < AWS.config.credentials.expireTime - 60000
  ) {
    return true;
  }

  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return false;
  }

  const userToken = await getUserToken(currentUser);

  await getAwsCredentials(userToken);

  return true;
}

export function signOutUser() {
  const currentUser = getCurrentUser();

  if (currentUser !== null) {
    currentUser.signOut();
  }

  if (AWS.config.credentials) {
    AWS.config.credentials.clearCachedId();
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({});
  }
}

function getUserToken(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession(function(err, session) {
      if (err) {
        reject(err);
        return;
      }
      resolve(session.getIdToken().getJwtToken());
    });
  });
}

function getCurrentUser() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });
  return userPool.getCurrentUser();
}

function getAwsCredentials(userToken) {
  const authenticator = `cognito-idp.${config.cognito
    .REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

  AWS.config.update({ region: config.cognito.REGION });

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
    Logins: {
      [authenticator]: userToken
    }
  });

  return AWS.config.credentials.getPromise();
}

export async function socialOAuth2(netwrok = 'Facebook') {
  return new Promise((resolve, reject) => {
    let authHost = config.cognito.AUTH_HOST;
    let identityProvider = netwrok;
    let redirectUri = config.cognito.REDIRECT_URI;
    let responseType = 'token';
    let clientId = config.cognito.APP_CLIENT_ID;
    let state = 'some_state';
    let scope = 'profile email openid';

    let authUrl = `${authHost}/oauth2/authorize?identity_provider=${identityProvider}&redirect_uri=${redirectUri}&response_type=${responseType}&client_id=${clientId}&state=${state}&scope=${scope}`
    console.debug(authUrl);
    window.open(
      authUrl,
      "facebook",
      "location,toolbar,resizable,scrollbars,status,width=600,height=600"
    );

    window.addEventListener("message", res => {
      let tokensData = res.data;
      console.debug(tokensData);
      if (typeof tokensData === 'string' || 'error_description' in tokensData) {
        alert(tokensData.error_description);
        return;
      }


      let token = tokensData.IdToken;
      let payload = token.split('.')[1];
      payload = JSON.parse(atob(payload));
      let username = payload['cognito:username'];
      // const cognitoIdentityService = new AWS.CognitoIdentityServiceProvider();

      let userPoolId = config.cognito.USER_POOL_ID;
      let clientId = config.cognito.APP_CLIENT_ID;
      let login = 'cognito-idp.' + config.cognito.REGION + '.amazonaws.com/' + userPoolId;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
        Logins: {
          [login]: token
        }
      });
      AWS.config.update({ region: config.cognito.REGION });

      // AWS.config.credentials.params.Logins['cognito-idp.' + config.REGION + '.amazonaws.com/' + userPoolId] = token;
      AWS.config.credentials.get(err => {
        if (err) {
          return reject(err);
        }

        let poolData = {
          UserPoolId: userPoolId, // Your user pool id here
          ClientId: clientId // Your client id here
        };
        let userPool = new CognitoUserPool(poolData);
        let userData = {
          Username: username,
          Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);

        cognitoUser.signInUserSession = cognitoUser.getCognitoUserSession(tokensData);
        cognitoUser.cacheTokens();

        console.log("Amazon Cognito Identity", AWS.config.credentials.identityId);
        resolve(token);
      });
    }, false);
  });
}