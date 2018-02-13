export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: "notes-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://5by75p4gn3.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: 'ap-southeast-1',
    IDENTITY_POOL_ID: 'ap-southeast-1:492f49ef-38b8-412e-b554-ac85df80bb8b',
    USER_POOL_ID: 'ap-southeast-1_t5QL9Po55',
    APP_CLIENT_ID: '5q7qp2cbjjeoc8kaav27t6j0ug',
    AUTH_HOST: "https://{YOUR DOMAIN}.auth.ap-southeast-1.amazoncognito.com",
    REDIRECT_URI: 'http://localhost:3000/oauth/',
    FACEBOOK_API_KEY: '[facebook api key]'
  }
};
