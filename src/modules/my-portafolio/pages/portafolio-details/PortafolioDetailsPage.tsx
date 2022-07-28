import styles from './PortafolioDetailsPage.module.scss';

import React, { useState } from "react";

import Stack from "@mui/material/Stack";

import { useLocation } from "react-router-dom";
import { UserPortafolioTotalItem } from "../../interfaces/user-portafolio-total-item";
import PortafolioInvestmentDetails from '../../containers/portafolio-investment-details/PortafolioInvestmentDetails';
import PortafolioActionsHistory from '../../containers/portafolio-actions-history/PortafolioActionsHistory';

const PortafolioDetailsPage = () => {
  console.log('PortafolioDetailsPage re-rendered')
  const location = useLocation();

  const [currentTotalizedAsset, setCurrentTotalizedAsset] = useState<UserPortafolioTotalItem>(location.state as UserPortafolioTotalItem);

  const editedPortafolioHandler = () => {
    console.log('PortafolioDetailsPage edited')
    setCurrentTotalizedAsset((prev) => ({...prev}))
  }

  return (
    <Stack
      spacing={2}
      className={styles['portafolio-details-page']}
    >
      <span className={styles['title']}>{currentTotalizedAsset.symbol.displaySymbol}</span>
      <span className={styles['current-price']}>$ {currentTotalizedAsset.assetCurrentPrice}</span>
      <PortafolioInvestmentDetails asset={currentTotalizedAsset}/>
      <PortafolioActionsHistory symbolId={currentTotalizedAsset.symbol.id} onEditedPortafolio={editedPortafolioHandler} />
    </Stack>
  )
}

export default PortafolioDetailsPage;