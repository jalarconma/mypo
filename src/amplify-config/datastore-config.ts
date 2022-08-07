import { Auth, DataStore, syncExpression } from "aws-amplify";
import { UserPortafolio } from "../models";

const dataStoreConfigs = {
  /*syncExpressions: [
    syncExpression(UserPortafolio, async () => {
      const { attributes: { email } } = await Auth.currentAuthenticatedUser();
      console.log('user to filter:', email);
      return (reg) => reg.user('eq', email);
    })
  ]*/
};


export default dataStoreConfigs;