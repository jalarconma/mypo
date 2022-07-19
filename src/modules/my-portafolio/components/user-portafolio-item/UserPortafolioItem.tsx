import styles from './UserPortafolioItem.module.scss';

import React from "react";

import Grid from "@mui/material/Grid";

import { UserPortafolioTotalItem } from "../../interfaces/user-portafolio-total-item";
import SpanNumbericRounded from '../../../../shared/components/span-numeric-rounded/SpanNumericRounded';
import { Stack } from '@mui/material';

interface Props {
  asset: UserPortafolioTotalItem,
}

const UserPortafolioItem = ({ asset }: Props) => {

  const getInvestedAmount = (): number => {
    return asset.assetQuantity * asset.assetMidPrice;
  }

  const getROIByDollarAmout = (): number => {
    return getAssetMarketValue() - getInvestedAmount();
  }

  const getROIByPercentage = (): number => {
    const investedAmount = getInvestedAmount();

    if (investedAmount === 0) {
      return 0
    }

    return (getROIByDollarAmout() / investedAmount) * 100
  }

  const getAssetMarketValue = (): number => {
    return asset.assetCurrentPrice * asset.assetQuantity;
  }

  const getMarketROIClases = (): string => {
    let classes = `${styles['portafolio-info_value']}`;

    if (getROIByPercentage() < 0) {
      classes = `${classes} ${styles['negative-roi']}`;

    } else if (getROIByPercentage() > 0) {
      classes = `${classes} ${styles['positive-roi']}`;
    }

    return classes
  }

  return (
    <Grid container spacing={2} className={styles['user-portafolio-item']}>
      <Grid item xs={3} className={styles['portafolio-info']}>
        <span className={styles['portafolio-info_asset-name']}>{asset.symbol.displaySymbol}</span>
        <span>{asset.assetQuantity}</span>
      </Grid>
      {
        asset.assetQuantity === 0 ?
          (
            <Grid item xs={9} className={styles['portafolio-info']}>
              <span className={styles['portafolio-info_value']}>The total assets by actions (Purchases and sales) are equal to zero or lower</span>
            </Grid>
          ) :
          (
            <>
              <Grid item xs={4} className={styles['portafolio-info']}>
                <span>Invested Amount</span>
                <SpanNumbericRounded value={getInvestedAmount()} styles={styles['portafolio-info_value']} startAdornment={'$'} />
                <br />
                <span>Average purchase price</span>
                <SpanNumbericRounded value={asset.assetMidPrice} styles={styles['portafolio-info_value']} startAdornment={'$'} />
              </Grid>
              <Grid item xs={5} className={styles['portafolio-info']}>
                <SpanNumbericRounded value={getAssetMarketValue()} styles={`${getMarketROIClases()} ${styles['market-value']}`} startAdornment={'$'} />
                <br />
                <Stack spacing={2} direction="row">
                  <SpanNumbericRounded value={getROIByPercentage()} styles={`${getMarketROIClases()} ${styles['roi-value']}`} startAdornment={'%'} />
                  <SpanNumbericRounded value={getROIByDollarAmout()} styles={`${getMarketROIClases()} ${styles['roi-value']}`} startAdornment={'$'} />
                </Stack>
              </Grid>
            </>
          )
      }
    </Grid>
  )
}

export default UserPortafolioItem;