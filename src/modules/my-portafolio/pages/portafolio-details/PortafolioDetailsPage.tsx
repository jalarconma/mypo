import styles from './PortafolioDetailsPage.module.scss';

import React from "react";

import Stack from "@mui/material/Stack";

import { useLocation } from "react-router-dom";
import { UserPortafolioTotalItem } from "../../interfaces/user-portafolio-total-item";
import PortafolioInvestmentDetails from '../../containers/portafolio-investment-details/PortafolioInvestmentDetails';
import PortafolioActionsHistory from '../../containers/portafolio-actions-history/PortafolioActionsHistory';

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
      <PortafolioActionsHistory symbolId={currentTotalizedAsset.symbol.id}/>
    </Stack>
  )
}

export default PortafolioDetailsPage;