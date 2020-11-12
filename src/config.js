const config = {
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

export default config;
