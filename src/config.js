const dev = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  s3: {
    REGION: "us-east-1",
    BUCKET: "prod-notes-infra-s3-uploads4f6eb0fd-1838t5x17uk5u",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_7EHah5sYR",
    APP_CLIENT_ID: "2ju773d1d9se43nqio0cj899dl",
    IDENTITY_POOL_ID: "us-east-1:99ae4b42-8c98-46e2-8eb2-2c144786ae04",
  },
};

const prod = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1v9w7kkxnznb7",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_mLbfKylhm",
    APP_CLIENT_ID: "mli2vaupiq3ga29m4698m6mrl",
    IDENTITY_POOL_ID: "us-east-1:4e377eff-0617-4098-b218-673490ffab8d",
  },
};

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;
