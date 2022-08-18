import styles from './AllPortafolioHistoryPage.module.scss';

import React, { useEffect } from "react";

import { useUserAuthService } from '../../../../authentication/hooks/use-user-auth-service';
import LoadingSpinner from '../../../../shared/components/loading-spinner/LoadingSpinner';
import { usePortafolioHistoryService } from '../../../../core/hooks/use-portafolio-history-service';
import { Symbol, UserPortafolio } from '../../../../API';
import Stack from '@mui/material/Stack';
import InfoContainer from '../../../../shared/components/info-container/InfoContainer';
import PortafolioHistoryItem from '../../../my-portafolio/components/portafolio-history-item/PortafolioHistoryItem';
import HistoryActions from '../../components/history-actions/HistoryActions';
import useManagePortafolio from '../../../../shared/hooks/use-manage-portafolio';

const AllPortafolioHistoryPage = () => {
  const userAuthService = useUserAuthService();
  const portafolioHistoryService = usePortafolioHistoryService();

  const { processedPortafolio, allPortafolio, onFilter, onSort, 
    onEditedPortafolio, onDeletedPortafolioItem, fetchPortafolio} = useManagePortafolio(undefined);

  const isLoading = (): boolean => {
    return userAuthService.getLoading() || portafolioHistoryService.getLoading();
  }

  useEffect(() => {
    fetchPortafolio()
  }, []);

  const editPortafolioItemHandler = (editedAsset: UserPortafolio | undefined): void => {
    onEditedPortafolio(editedAsset);
  }

  const deletePortafolioItemHandler = (deletedAsset: UserPortafolio | undefined): void => {
    onDeletedPortafolioItem(deletedAsset);
  }

  const getAssetSymbols = (): Symbol[] => {

    if(!allPortafolio.length) {
      return [];
    }

    const hashSymbols = allPortafolio.reduce((acc, item) => {
      acc[`${item.symbol.id}`] = item.symbol;
      return acc;
    }, {});

    return Object.values(hashSymbols);
  }

  return (
    <>
      {isLoading() ? <LoadingSpinner /> : null}
      <div className={styles['history-page']}>
        <h2>History</h2>
        <HistoryActions symbols={getAssetSymbols()} onFilter={(filter) => onFilter(filter)} onSort={(sort) => onSort(sort)}/>
        <Stack spacing={2}>
          {
            processedPortafolio.map((asset: UserPortafolio) => (
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