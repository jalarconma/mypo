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

export const syncDataStore = async () => {
  console.log('clearing DB...');
  //await DataStore.start();

  await new Promise<boolean>((resolve) => {
    const clearTimmer = setTimeout(async () => {
      clearTimeout(clearTimmer);
      //await DataStore.clear();
    }, 1000);

    const startTimmer = setTimeout(async () => {
      clearTimeout(startTimmer);
      //await DataStore.query(UserPortafolio);
      resolve(true);
    }, 2000);
  });
}

export default dataStoreConfigs;