import styles from './UserPortafolioList.module.scss';

import React from "react";

import { Stack } from "@mui/material";

import UserPortafolioItem from "../user-portafolio-item/UserPortafolioItem";
import InfoContainer from '../../../../shared/components/info-container/InfoContainer';
import { UserPortafolioTotalItem } from '../../interfaces/user-portafolio-total-item';

interface Props {
  groupedPortafolioItems: UserPortafolioTotalItem[]
}

const UserPortafolioList = ({ groupedPortafolioItems }: Props) => {

  return (
    <Stack spacing={2} className={styles['user-portafolio-list']} >
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