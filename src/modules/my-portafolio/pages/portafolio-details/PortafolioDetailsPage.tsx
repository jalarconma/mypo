import styles from './PortafolioDetailsPage.module.scss';

import React from "react";

import Stack from "@mui/material/Stack";

import { useLocation } from "react-router-dom";
import { UserPortafolioTotalItem } from "../../interfaces/user-portafolio-total-item";
import PortafolioInvestmentDetails from '../../containers/portafolio-investment-details/PortafolioInvestmentDetails';

const PortafolioDetailsPage = () => {
  const location = useLocation();
  const currentTotalizedAsset: UserPortafolioTotalItem = location.state as UserPortafolioTotalItem;

  return (
    <Stack
      spacing={2}
      className={styles['portafolio-details-page']}
    >
      <span className={styles['title']}>{currentTotalizedAsset.symbol.displaySymbol}</span>
      <span className={styles['current-price']}>$ {currentTotalizedAsset.assetCurrentPrice}</span>
      <PortafolioInvestmentDetails asset={currentTotalizedAsset}/>
    </Stack>
  )
}

export default PortafolioDetailsPage;