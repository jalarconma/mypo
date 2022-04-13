import { useEffect, useState } from 'react';
import { listSymbols } from '../../../graphql/queries';
import { API, Auth, DataStore, graphqlOperation } from 'aws-amplify'
import { UserPortafolio, PortafolioAction, Symbol } from '../../../models';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const RegisterPortafolioAction = () => {
  useEffect(() => {
    DataStore.clear();
    getData();
  }, []);

  const [ symbols, setSymbols ] = useState([]);

  const getData = async () => {
    const models = await DataStore.query(Symbol);
    console.log(models);
    setSymbols(models);
  }

  const addPortafolioAction = async () => {
    const data = await DataStore.save(
      new UserPortafolio({
        user: "juaalarconma@gmail.com",
        action: PortafolioAction.BUY,
        asset_quantity: 1,
        action_date: '2022-03-15',
        current_asset_price: 12,
        symbol: symbols[0],
        userPortafolioSymbolId: symbols[0].id
    }));

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  return (
    <button onClick={addPortafolioAction}>Create Portafolio</button>
  );
}

export default RegisterPortafolioAction;