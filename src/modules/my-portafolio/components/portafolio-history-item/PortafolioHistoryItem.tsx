import styles from './PortafolioHistoryItem.module.scss';

import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import { PortafolioAction, UserPortafolio } from "../../../../models";
import { useUserPortafolioListService } from '../../../../core/hooks/use-user-portafolio-list-service';
import SpanNumbericRounded from '../../../../shared/components/span-numeric-rounded/SpanNumericRounded';
import Collapse from '@mui/material/Collapse';
import EditPortafolioAsset from '../edit-portafolio-asset/EditPortafolioAsset';

interface Props {
  asset: UserPortafolio
}

const PortafolioHistoryItem = ({ asset }: Props) => {

  const [fullAsset, setFullAsset] = useState<UserPortafolio>(asset);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  useEffect(() => {
    fetchFullSymbol();
  }, []);

  const userPortafolioListService = useUserPortafolioListService();

  const getActionClassName = (): string => {

    if (fullAsset.action === PortafolioAction.BUY) {
      return 'positive-roi';

    } else if (fullAsset.action === PortafolioAction.SELL) {
      return 'negative-roi';
    }

    return '';
  }

  const fetchFullSymbol = async () => {
    const fullSymbol = await userPortafolioListService.getSymbolById(fullAsset.userPortafolioSymbolId);

    if (!fullSymbol) {
      return;
    }

    setFullAsset({ ...asset, symbol: fullSymbol });
  }

  const toggleEditPortafolio = (): void => {
    setShowEditForm(prev => !prev);
  }

  const submitPortafolioHandler = () => {

  }

  return (
    <>
      <div className={styles['portafolio-history-item']}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <span className={styles['item-title']}>{fullAsset.action_date}</span>
          </Grid>
          <Grid item xs={6}>
            <SpanNumbericRounded value={fullAsset.asset_quantity} styles={styles['item-value']} />
          </Grid>
          <Grid item xs={6}>
            <span className={`${styles['item-value']} ${getActionClassName()}`}>{fullAsset.action}</span>
          </Grid>
          <Grid item xs={6} >
            <SpanNumbericRounded value={fullAsset.current_asset_price} styles={styles['item-title']} startAdornment={'$'} />
          </Grid>
        </Grid>
        {showEditForm ?
          (
            <IconButton aria-label="edit" size="small" color="primary" className={styles['item-action']} onClick={toggleEditPortafolio}>
              <CancelIcon />
            </IconButton>
          ) :
          (
            <IconButton aria-label="edit" size="small" color="primary" className={styles['item-action']} 
              onClick={toggleEditPortafolio} disabled={!fullAsset || !fullAsset.symbol}>
              <ModeEditIcon />
            </IconButton>
          )}
      </div>
      <Collapse in={showEditForm}><EditPortafolioAsset onSubmit={submitPortafolioHandler} asset={fullAsset} formOpened={showEditForm}/></Collapse>
    </>
  )
}

export default PortafolioHistoryItem;