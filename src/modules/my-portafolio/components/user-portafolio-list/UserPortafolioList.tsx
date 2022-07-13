import React, { useEffect, useState } from "react";
import { UserPortafolio } from "../../../../models";
import { useUserPortafolioListService } from "../../../../core/hooks/use-user-portafolio-list-service";

const UserPortafolioList = () => {
  const [portafolioItems, setPortafolioItems] = useState<UserPortafolio[]>([]);

  const userPortafolioListService = useUserPortafolioListService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    const query = await userPortafolioListService.getUserPortafolio();

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