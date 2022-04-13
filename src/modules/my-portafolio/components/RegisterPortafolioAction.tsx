import { useEffect, useState } from 'react';
import { listSymbols } from '../../../graphql/queries';
import { API, Auth, DataStore, graphqlOperation, syncExpression } from 'aws-amplify'
import { UserPortafolio, PortafolioAction, Symbol } from '../../../models';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const RegisterPortafolioAction = () => {
  useEffect(() => {
    getData();
  }, []);

  const [ symbols, setSymbols ] = useState([]);
  const [ user, setUser ] = useState(null);

  const getData = async () => {
    const models = await DataStore.query(Symbol);
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
    console.log(models);
    setSymbols(models);
    setUser(user);
    
    /*console.log('portafolio', await DataStore.query(UserPortafolio, (e) =>
    e.user('eq', user.attributes.email)));*/

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  const addPortafolioAction = async () => {
    const data = await DataStore.save(
      new UserPortafolio({
        user: user.attributes.email,
        action: PortafolioAction.BUY,
        asset_quantity: 1,
        action_date: '2022-03-15',
        current_asset_price: 12,
        symbol: symbols[0],
        userPortafolioSymbolId: symbols[0].id
    }));

    //await DataStore.clear();

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  const addAlternativePortafolioAction = async () => {
    const data = await DataStore.save(
      new UserPortafolio({
        user: 'test@test.com',
        action: PortafolioAction.BUY,
        asset_quantity: 1,
        action_date: '2022-03-15',
        current_asset_price: 12,
        symbol: symbols[0],
        userPortafolioSymbolId: symbols[0].id
    }));

    //await DataStore.clear();

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  return (
    <div>
      <button onClick={addPortafolioAction}>Create Portafolio</button>
      <button onClick={addAlternativePortafolioAction}>Create Portafolio With other User</button>
    </div>
  );
}

export default RegisterPortafolioAction;