import AWS from 'aws-sdk';
import sigV4Client from './sigV4Client';
import config from '../config.js';

export async function invokeApig(
  { path,
    method = 'GET',
    headers = {},
    queryParams = {},
    body }, userToken) {

  await getAwsCredentials(userToken);

  const signedRequest = sigV4Client
    .newClient({
      accessKey: AWS.config.credentials.accessKeyId,
      secretKey: AWS.config.credentials.secretAccessKey,
      sessionToken: AWS.config.credentials.sessionToken,
      region: config.apiGateway.REGION,
      endpoint: config.apiGateway.URL,
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

export function getAwsCredentials(userToken) {
  if (AWS.config.credentials && Date.now() < AWS.config.credentials.expireTime - 60000) {
    return;
  }

  const authenticator = `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

  AWS.config.update({ region: config.cognito.REGION });

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
    Logins: {
      [authenticator]: userToken
    }
  });

  return AWS.config.credentials.getPromise();
}

export async function s3Upload(file, userToken) {
  await getAwsCredentials(userToken);

  const s3 = new AWS.S3({
    params: {
      Bucket: config.s3.BUCKET,
    }
  });
  const filename = `${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;

  return s3.upload({
    Key: filename,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
  }).promise();
}
