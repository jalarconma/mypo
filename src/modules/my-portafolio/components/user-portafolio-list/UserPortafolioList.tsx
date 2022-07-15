import styles from './UserPortafolioList.module.scss';

import React, { useEffect, useState } from "react";

import { Paper, Stack } from "@mui/material";

import { SymbolType, UserPortafolio } from "../../../../models";
import { useUserPortafolioListService } from "../../../../core/hooks/use-user-portafolio-list-service";
import UserPortafolioItem from "../user-portafolio-item/UserPortafolioItem";
import InfoContainer from '../../../../shared/components/info-container/InfoContainer';
import { UserPortafolioTotalItem } from '../../interfaces/user-portafolio-total-item';
import { UserPortafolioListFactory } from '../../factories/user-portafolio-list.factory';
import { useRegisterPortafolioService } from '../../../../core/hooks/use-register-portafolio-service';
import { StringUtils } from '../../../../shared/utils/string-utils';

const UserPortafolioList = () => {
  const [groupedPortafolioItems, setGroupedPortafolioItems] = useState<UserPortafolioTotalItem[]>([]);

  const userPortafolioListService = useUserPortafolioListService();
  const registerPortafolioService = useRegisterPortafolioService();

  useEffect(() => {
    factoryTotalizedAssets();
  }, []);

  const factoryTotalizedAssets = async () => {

    const query = await userPortafolioListService.getUserPortafolio();

    if (!query.data) {
      return;
    }

    const groupedAssets = UserPortafolioListFactory.groupAssetsBySymbol(query.data.listUserPortafolios.items)
    const totalizedAssets: UserPortafolioTotalItem[] = [];

    const symbolIds = Object.keys(groupedAssets);

    for(let symbolId of symbolIds) {
      const fullSymbol = await userPortafolioListService.getSymbolById(symbolId);

      if(fullSymbol) {
        const price = await registerPortafolioService.getPrice(SymbolType[fullSymbol.type], new Date(), fullSymbol.id);
        totalizedAssets.push(UserPortafolioListFactory.calculateTotalizedAsset(fullSymbol, price, groupedAssets[symbolId]));
      }
    }

    setGroupedPortafolioItems(totalizedAssets)
  }

  return (
    <Stack spacing={4} className={styles['user-portafolio-list']} >
      {
        groupedPortafolioItems.map((item: UserPortafolioTotalItem) => (
          <InfoContainer key={item.symbol.id}>
            <UserPortafolioItem asset={item}/>
          </InfoContainer>
        ))
      }
    </Stack>
  )
}

export default UserPortafolioList;