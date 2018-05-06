const dev = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-1khdkttqb2q78"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_0hRiDJLzJ",
    APP_CLIENT_ID: "7or23o2ekgarg8hbcsfu36hd82",
    IDENTITY_POOL_ID: "us-east-1:87c9f911-b066-4ef4-b4e8-3ae4670bdfc8"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-131zmallvmk4x"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api-serverless-stack.seed-demo.club/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_334NNaDVG",
    APP_CLIENT_ID: "5p6uhm94fp07i5jvh7sh248m75",
    IDENTITY_POOL_ID: "us-east-1:be3d1021-10c0-47c3-85be-629be1b098e7"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
