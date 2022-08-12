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
import useFilterPortafolio from '../../../../shared/hooks/use-filter-portafolio';

const AllPortafolioHistoryPage = () => {
  const userAuthService = useUserAuthService();
  const portafolioHistoryService = usePortafolioHistoryService();
  const { portafolio, setAllPortafolio, setFilter } = useFilterPortafolio({
    action: {id: '', label: ''},
    action_date: [null, null],
    symbol: [],
    createdAt: [null, null],
    updatedAt: [null, null],
  });

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

    setAllPortafolio(result.data.listUserPortafolios.items);
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
    setAllPortafolio(editedPortafolio);
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
    setAllPortafolio(editedPortafolio);
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

  return (
    <>
      {isLoading() ? <LoadingSpinner /> : null}
      <div className={styles['history-page']}>
        <h2>History</h2>
        <HistoryActions symbols={getAssetSymbols()} onFilter={(filter) => setFilter(filter)}/>
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