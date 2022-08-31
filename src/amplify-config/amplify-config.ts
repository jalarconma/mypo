import { AuthModeStrategyType } from 'aws-amplify';
import awsConfig from '../aws-exports';

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  prodRedirectSignIn,
  devRedirectSignIn,
  localRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(",");

const [
  prodRedirectSignOut,
  devRedirectSignOut,
  localRedirectSignOut
] = awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsConfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  },
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : `${window.location.origin}/`,
    redirectSignOut: isLocalhost ? localRedirectSignOut : `${window.location.origin}/`,
  }
};

export default updatedAwsConfig;