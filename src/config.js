const config = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-qvdowkch2uj1",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_f8l0OHPtp",
    APP_CLIENT_ID: "5r5o292r1n7s2vgje5u5c7vpq0",
    IDENTITY_POOL_ID: "us-east-1:b718098b-fe72-410b-b4c6-0750f9135672",
  },
};

export default config;
