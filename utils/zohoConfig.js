import {
  InitializeBuilder,
  UserSignature,
  OAuthBuilder,
  Logger,
  LogLevel,
  DataCenter,
  USDataCenter,
} from "@zohocrm/nodejs-sdk-2.0";

const initializeSDK = async () => {
  let user = new UserSignature("your_email@domain.com");

  let environment = USDataCenter.PRODUCTION();

  let token = new OAuthBuilder()
    .clientId("YOUR_CLIENT_ID")
    .clientSecret("YOUR_CLIENT_SECRET")
    .refreshToken("YOUR_REFRESH_TOKEN")
    .redirectURL("YOUR_REDIRECT_URL")
    .build();

  let logger = new Logger(LogLevel.INFO, "path/to/log/file");

  let initialize = await new InitializeBuilder()
    .user(user)
    .environment(environment)
    .token(token)
    .logger(logger)
    .initialize();
};

initializeSDK()
  .then(() => {
    console.log("SDK Initialized");
  })
  .catch((err) => {
    console.error(err);
  });
