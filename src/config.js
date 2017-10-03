export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: "notes-app-uploads"
  },
  apiGateway: {
    REGION: 'eu-west-1',
    URL: 'https://localhost:3000/',
  },
  graphqlURL: process.env.REACT_APP_TCM_API || 'https://localhost:3000/graphql',
  cognito: {
    REGION: 'eu-west-1',
    IDENTITY_POOL_ID: 'us-east-1:000000', // is not used
    USER_POOL_ID : process.env.REACT_APP_USER_POOL_ID || 'eu-west-1_00000000',
    APP_CLIENT_ID : process.env.REACT_APP_APP_CLIENT_ID || '111111111111111111111111',
  }
};
