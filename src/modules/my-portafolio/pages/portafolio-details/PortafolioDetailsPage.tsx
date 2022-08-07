import styles from './PortafolioDetailsPage.module.scss';

import React, { useState } from "react";

import { Navigate, useLocation } from "react-router-dom";

import Stack from "@mui/material/Stack";

import { UserPortafolioTotalItem } from "../../interfaces/user-portafolio-total-item";
import PortafolioInvestmentDetails from '../../containers/portafolio-investment-details/PortafolioInvestmentDetails';
import PortafolioActionsHistory from '../../containers/portafolio-actions-history/PortafolioActionsHistory';
import { useUserPortafolioListService } from '../../../../core/hooks/use-user-portafolio-list-service';
import { useUserAuthService } from '../../../../authentication/hooks/use-user-auth-service';
import LoadingSpinner from '../../../../shared/components/loading-spinner/LoadingSpinner';
import { homeModule } from '../../..';

const PortafolioDetailsPage = () => {
  console.log('PortafolioDetailsPage re-rendered')
  const location = useLocation();

  const [currentTotalizedAsset, setCurrentTotalizedAsset] = useState<UserPortafolioTotalItem | null>(location.state as UserPortafolioTotalItem);

  const userPortafolioService = useUserPortafolioListService();
  const userAuthService = useUserAuthService();

  const isLoading = (): boolean => {
    return userPortafolioService.getLoading() || userAuthService.getLoading();
  }

  const editedPortafolioHandler = () => {
    fetchCurrentTotalizedAsset();
  }

  const fetchCurrentTotalizedAsset = async () => {

    const user = userAuthService.currentUser?.email

    if (!user || !currentTotalizedAsset) {
      return;
    }

    const totalizedAsset = await userPortafolioService.getUserPortafolioTotalizedBySymbol(user, currentTotalizedAsset.symbol.id);
    setCurrentTotalizedAsset(totalizedAsset);
  }

  return (
    !currentTotalizedAsset ? <Navigate to={homeModule.routeProps.path} replace/> : 
    (
      <>
      {isLoading() && <LoadingSpinner />}
      <Stack
        spacing={2}
        className={styles['portafolio-details-page']}
      >
        <span className={styles['title']}>{currentTotalizedAsset.symbol.displaySymbol}</span>
        <span className={styles['current-price']}>$ {currentTotalizedAsset.assetCurrentPrice}</span>
        <PortafolioInvestmentDetails asset={currentTotalizedAsset} />
        <PortafolioActionsHistory symbolId={currentTotalizedAsset.symbol.id} onEditedPortafolio={editedPortafolioHandler} />
      </Stack>
    </>
    )
  )
}

export default PortafolioDetailsPage;