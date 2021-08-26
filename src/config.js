const dev = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-1xboyuq7t4m3b",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_inr9YMAGu",
    APP_CLIENT_ID: "1j8rsat63d6bgrf4a1urfa5fl",
    IDENTITY_POOL_ID: "us-east-1:9fbc1763-a1b0-4e44-958d-8d8c155252d5",
  },
};

const prod = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1i904t99uyi9u",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_m3dpB46HZ",
    APP_CLIENT_ID: "fuindvj7f1ljpa35tp2d7kjrn",
    IDENTITY_POOL_ID: "us-east-1:67cb4bb1-d2b2-49ec-b412-5b7ef2404bcc",
  },
};

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;
