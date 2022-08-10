import styles from './AllPortafolioHistoryPage.module.scss';

import React, { useCallback, useEffect, useState } from "react";

import { useUserAuthService } from '../../../../authentication/hooks/use-user-auth-service';
import LoadingSpinner from '../../../../shared/components/loading-spinner/LoadingSpinner';
import { usePortafolioHistoryService } from '../../../../core/hooks/use-portafolio-history-service';
import { Symbol, UserPortafolio } from '../../../../API';
import Stack from '@mui/material/Stack';
import InfoContainer from '../../../../shared/components/info-container/InfoContainer';
import PortafolioHistoryItem from '../../../my-portafolio/components/portafolio-history-item/PortafolioHistoryItem';
import HistoryActions from '../../components/history-actions/HistoryActions';
import { HistoryActionFilterForm } from '../../interfaces/history-action-filter-form';
import { PortafolioAction } from '../../../../models';

const AllPortafolioHistoryPage = () => {
  const userAuthService = useUserAuthService();
  const portafolioHistoryService = usePortafolioHistoryService();

  const [portafolio, setPortafolio] = useState<UserPortafolio[]>([]);
  const [originalPortafolio, setOriginalPortafolio] = useState<UserPortafolio[]>([]);

  const isLoading = (): boolean => {
    return userAuthService.getLoading() || portafolioHistoryService.getLoading();
  }

  useEffect(() => {
    fetchPortafolioHistory();
  }, []);

  const fetchPortafolioHistory = async () => {
    const result = await portafolioHistoryService.getUserPortafolio();

    if (!result.data) {
      return;
    }

    setOriginalPortafolio(result.data.listUserPortafolios.items);
    setPortafolio(result.data.listUserPortafolios.items);
  }

  const editPortafolioItemHandler = (editedAsset: UserPortafolio | undefined): void => {
    if(!editedAsset) {
      fetchPortafolioHistory();
      return;
    }

    const index = portafolio.findIndex(asset => asset.id === editedAsset.id);

    if(index === -1) {
      fetchPortafolioHistory();
      return;
    }

    const editedPortafolio = [...portafolio];
    editedPortafolio[index] = editedAsset;
    setPortafolio(editedPortafolio);
    setOriginalPortafolio(editedPortafolio);
  }

  const deletePortafolioItemHandler = (deletedAsset: UserPortafolio | undefined): void => {

    if(!deletedAsset) {
      fetchPortafolioHistory();
      return;
    }

    const index = portafolio.findIndex(asset => asset.id === deletedAsset.id);

    if(index === -1) {
      fetchPortafolioHistory();
      return;
    }

    const editedPortafolio = [...portafolio];
    editedPortafolio.splice(index, 1);
    setPortafolio(editedPortafolio);
    setOriginalPortafolio(editedPortafolio);
  }

  const getAssetSymbols = (): Symbol[] => {

    if(!portafolio.length) {
      return [];
    }

    const hashSymbols = portafolio.reduce((acc, item) => {
      acc[`${item.symbol.id}`] = item.symbol;
      return acc;
    }, {});

    return Object.values(hashSymbols);
  }

  const filterHandler = useCallback((filters: HistoryActionFilterForm): void => {
    const filteredPortafolio = originalPortafolio.filter(item => {

      let hasSymbol = true;
      let hasAction = true;
      let hasMinCreatedAtDate = true;
      let hasMaxCreatedAtDate = true;

      if(filters.symbol.length > 0) {
        hasSymbol = filters.symbol.findIndex(symbol => symbol.id === item.symbol.id) !== -1
      }

      if(filters.action && filters.action.id) {
        hasAction = item.action ===  PortafolioAction[filters.action.id];
      }

      if(filters.createdAt[0]) {
        const createdAtFrom = new Date(filters.createdAt[0]);
        createdAtFrom.setHours(0, 0, 0, 0);
        const itemCreatedAt = new Date(item.createdAt);
        itemCreatedAt.setHours(0, 0, 0, 0)
        hasMinCreatedAtDate = itemCreatedAt.getTime() >= createdAtFrom.getTime()
      }

      if(filters.createdAt[1]) {
        const createdAtTo = new Date(filters.createdAt[1]);
        createdAtTo.setHours(0, 0, 0, 0);
        const itemCreatedAt = new Date(item.createdAt);
        itemCreatedAt.setHours(0, 0, 0, 0)
        hasMaxCreatedAtDate = itemCreatedAt.getTime() <= createdAtTo.getTime()
      }

      return hasSymbol && hasAction && hasMinCreatedAtDate && hasMaxCreatedAtDate;
    });

    setPortafolio(filteredPortafolio);
  }, [originalPortafolio]);

  return (
    <>
      {isLoading() ? <LoadingSpinner /> : null}
      <div className={styles['history-page']}>
        <h2>History</h2>
        <HistoryActions symbols={getAssetSymbols()} onFilter={filterHandler}/>
        <Stack spacing={2}>
          {
            portafolio.map((asset: UserPortafolio) => (
              <InfoContainer key={asset.id}>
                <h4>{asset.symbol.displaySymbol}</h4>
                <PortafolioHistoryItem asset={asset} onEdit={editPortafolioItemHandler} onDelete={deletePortafolioItemHandler} />
              </InfoContainer>
            ))
          }
        </Stack>
      </div>
    </>
  )
}

export default AllPortafolioHistoryPage;