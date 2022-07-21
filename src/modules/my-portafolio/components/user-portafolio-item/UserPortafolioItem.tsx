import styles from './UserPortafolioItem.module.scss';

import React from "react";

import { useNavigate } from 'react-router-dom';

import Grid from "@mui/material/Grid";
import { Stack } from '@mui/material';

import { UserPortafolioTotalItem } from "../../interfaces/user-portafolio-total-item";
import SpanNumbericRounded from '../../../../shared/components/span-numeric-rounded/SpanNumericRounded';
import { PortafolioInvestmentUtils } from '../../utils/portafolio-investment.utils';

interface Props {
  asset: UserPortafolioTotalItem,
}

const UserPortafolioItem = ({ asset }: Props) => {

  const navigate = useNavigate();

  const getMarketROIClases = (): string => {
    let classes = `${styles['portafolio-info_value']}`;

    if (PortafolioInvestmentUtils.getROIByPercentage(asset) < 0) {
      return `${classes} negative-roi`;

    } else if (PortafolioInvestmentUtils.getROIByPercentage(asset) > 0) {
      return `${classes} positive-roi`;
    }

    return `${classes} zero-roi`;
  }

  const clickHandler = (event) => {
    navigate(`/my-portafolio/${asset.symbol.id}/details`, {
        state: asset
    });
  }

  return (
    <Grid container spacing={2} className={styles['user-portafolio-item']} onClick={clickHandler}>
      <Grid item xs={6} className={styles['portafolio-info']}>
        <span className={styles['portafolio-info_asset-name']}>{asset.symbol.displaySymbol}</span>
        <SpanNumbericRounded value={asset.assetQuantity}/>
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
              <Grid item xs={6} className={styles['portafolio-info']}>
                <SpanNumbericRounded value={PortafolioInvestmentUtils.getAssetMarketValue(asset)} 
                  styles={`${getMarketROIClases()} ${styles['market-value']}`} startAdornment={'$'} />
                <br />
                <Stack spacing={2} direction="row">
                  <SpanNumbericRounded value={PortafolioInvestmentUtils.getROIByPercentage(asset)} 
                    styles={`${getMarketROIClases()} ${styles['roi-value']}`} startAdornment={'%'} />
                  <SpanNumbericRounded value={PortafolioInvestmentUtils.getROIByDollarAmout(asset)} 
                    styles={`${getMarketROIClases()} ${styles['roi-value']}`} startAdornment={'$'} />
                </Stack>
              </Grid>
            </>
          )
      }
    </Grid>
  )
}

export default UserPortafolioItem;