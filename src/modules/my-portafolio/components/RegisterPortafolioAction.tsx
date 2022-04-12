import { useEffect } from 'react';
import gql from 'graphql-tag';

import { listSymbols } from '../../../graphql/queries';

import client from '../../../amplify-config/amplify-aws-appsync.config';


import { API, Auth, graphqlOperation } from 'aws-amplify'

const RegisterPortafolioAction = () => {
  useEffect(() => {
    /*client.query({
      query: gql(listSymbols)
    }).then((data) => {
      console.log(data);
    });*/
    getData();
    
  }, []);

  const getData = async () => {
    const result = await API.graphql(graphqlOperation(listSymbols, {}, (await Auth.currentSession()).getAccessToken().getJwtToken()));
    console.log(result); 
  }

  return (
    <form>
      <div className="form-control">
        <label htmlFor="user">User</label>
        <input type="text" id="user"/>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
}

export default RegisterPortafolioAction;