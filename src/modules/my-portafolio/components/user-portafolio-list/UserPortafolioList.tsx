import styles from './UserPortafolioList.module.scss';

import React, { useEffect, useState } from "react";

import { Paper, Stack } from "@mui/material";

import { SymbolType } from "../../../../models";
import { useUserPortafolioListService } from "../../../../core/hooks/use-user-portafolio-list-service";
import UserPortafolioItem from "../user-portafolio-item/UserPortafolioItem";
import InfoContainer from '../../../../shared/components/info-container/InfoContainer';
import { UserPortafolioTotalItem } from '../../interfaces/user-portafolio-total-item';
import { useUserAuthService } from '../../../../authentication/hooks/use-user-auth-service';

const UserPortafolioList = () => {
  const [groupedPortafolioItems, setGroupedPortafolioItems] = useState<UserPortafolioTotalItem[]>([]);

  const userPortafolioListService = useUserPortafolioListService();
  const userAuthService = useUserAuthService()

  useEffect(() => {
    fetchTotalizedAssets();
  }, []);

  const fetchTotalizedAssets = async () => {

    const user = userAuthService.currentUser?.email

    if(!user) {
      return;
    }

    const totalizedAssets = await userPortafolioListService.getUserPortafolioTotalized(user);
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