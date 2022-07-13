import { API, DataStore } from "aws-amplify";
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useEffect, useState } from "react";
import { listUserPortafolios } from "../../../../graphql/queries";
import { UserPortafolio } from "../../../../models";
import { graphqlQueryWrapper } from "../../../../core/utils/graphql-query-wrapper";
import React from "react";

const UserPortafolioList = () => {
  const [portafolioItems, setPortafolioItems] = useState<UserPortafolio[]>([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    /*console.log('portafolio', await DataStore.query(UserPortafolio, (e) =>
    e.user('eq', user.attributes.email)));*/
    //const items = await DataStore.query(UserPortafolio)



    const query = await graphqlQueryWrapper<{
      listUserPortafolios: {
        items: UserPortafolio[]
      }
    }>({ query: listUserPortafolios });

    if (query.data) {
      setPortafolioItems(query.data.listUserPortafolios.items);
      console.log('portafolio items: ', query.data.listUserPortafolios.items);
    }
  }

  return (
    <ul>
      {
        portafolioItems.map(item => (
          <li key={item.id}>{item.symbol?.displaySymbol} - {item.asset_quantity} - {item.user}</li>
        ))
      }
    </ul>
  )
}

export default UserPortafolioList;