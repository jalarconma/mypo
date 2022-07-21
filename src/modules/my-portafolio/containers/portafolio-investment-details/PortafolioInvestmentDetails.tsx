import styles from './PortafolioInvestmentDetails.module.scss';

import React from "react";

import Grid from '@mui/material/Grid';

import InfoContainer from "../../../../shared/components/info-container/InfoContainer";
import SpanNumbericRounded from "../../../../shared/components/span-numeric-rounded/SpanNumericRounded";
import { UserPortafolioTotalItem } from "../../interfaces/user-portafolio-total-item";
import { PortafolioInvestmentUtils } from "../../utils/portafolio-investment.utils";


interface Props {
  asset: UserPortafolioTotalItem
}

const PortafolioInvestmentDetails = ({ asset }: Props) => {

  const getROIClassName = (): string => {
    let classes = `${styles['info-value']}`;

    return `${classes} ${PortafolioInvestmentUtils.getROIClassName(asset)}`
  }

  return (
    <InfoContainer title={'My investment'}>
      <Grid
        container
        spacing={2}
        className={styles['portafolio-investment-details']}
      >
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <span className={styles['info-title']}>Assets</span>
          <SpanNumbericRounded value={asset.assetQuantity} styles={styles['info-value']} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <span className={styles['info-title']}>Invested amount</span>
          <SpanNumbericRounded value={PortafolioInvestmentUtils.getInvestedAmount(asset)} startAdornment={'$'} styles={styles['info-value']} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <span className={styles['info-title']}>Average purchase price</span>
          <SpanNumbericRounded value={asset.assetMidPrice} startAdornment={'$'} styles={styles['info-value']} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <span className={styles['info-title']}>Market value</span>
          <SpanNumbericRounded value={PortafolioInvestmentUtils.getAssetMarketValue(asset)} startAdornment={'$'} styles={getROIClassName()} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <span className={styles['info-title']}>Total ROI</span>
          <SpanNumbericRounded value={PortafolioInvestmentUtils.getROIByDollarAmout(asset)} startAdornment={'$'} styles={getROIClassName()} />
          <span className={getROIClassName()}>   (</span>
          <SpanNumbericRounded value={PortafolioInvestmentUtils.getROIByPercentage(asset)} startAdornment={'%'} styles={getROIClassName()} />
          <span className={getROIClassName()}>)</span>
        </Grid>
      </Grid>
    </InfoContainer>
  )
}

export default PortafolioInvestmentDetails;