import { Auth } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import updatedAwsConfig from './amplify-config';

const client = new AWSAppSyncClient({
  url: updatedAwsConfig.aws_appsync_graphqlEndpoint,
  region: updatedAwsConfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
  }
});

export default client;