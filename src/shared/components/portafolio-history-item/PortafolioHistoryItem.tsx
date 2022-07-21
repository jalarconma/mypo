import styles from './PortafolioHistoryItem.module.scss';

import React from 'react';

import Grid from '@mui/material/Grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { PortafolioAction, UserPortafolio } from "../../../models";
import SpanNumbericRounded from '../span-numeric-rounded/SpanNumericRounded';
import IconButton from '@mui/material/IconButton';

interface Props {
  asset: UserPortafolio
}

const PortafolioHistoryItem = ({ asset }: Props) => {

  const getActionClassName = (): string => {

    if (asset.action === PortafolioAction.BUY) {
      return 'positive-roi';

    } else if (asset.action === PortafolioAction.SELL) {
      return 'negative-roi';
    }

    return '';
  }

  return (
    <div className={styles['portafolio-history-item']}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <span className={styles['item-title']}>{asset.action_date}</span>
        </Grid>
        <Grid item xs={6}>
          <SpanNumbericRounded value={asset.asset_quantity} styles={styles['item-value']} />
        </Grid>
        <Grid item xs={6}>
          <span className={`${styles['item-value']} ${getActionClassName()}`}>{asset.action}</span>
        </Grid>
        <Grid item xs={6} >
          <SpanNumbericRounded value={asset.current_asset_price} styles={styles['item-title']} startAdornment={'$'} />
        </Grid>
      </Grid>
      <IconButton aria-label="edit" size="small" color="primary" className={styles['item-action']}>
        <ModeEditIcon />
      </IconButton>
    </div>
  )
}

export default PortafolioHistoryItem;