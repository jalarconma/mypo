import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { UserPortafolio } from "../../../../models";

const UserPortafolioList = () => {
  const [portafolioItems, setPortafolioItems] = useState<UserPortafolio[]>([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    /*console.log('portafolio', await DataStore.query(UserPortafolio, (e) =>
    e.user('eq', user.attributes.email)));*/
    const items = await DataStore.query(UserPortafolio)
    setPortafolioItems(items);
    console.log('portafolio items: ', items);
  }

  return (
    <ul>
      {
        portafolioItems.map(item => (
          <li key={item.id}>{item.symbol.displaySymbol} - {item.asset_quantity} - {item.user}</li>
        ))
      }
    </ul>
  )
}

export default UserPortafolioList;