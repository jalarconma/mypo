import styles from './PortafolioInvestmentDetails.module.scss';

import React from "react";

import Stack from "@mui/material/Stack";

import InfoContainer from "../../../../shared/components/info-container/InfoContainer";
import SpanNumbericRounded from "../../../../shared/components/span-numeric-rounded/SpanNumericRounded";
import { UserPortafolioTotalItem } from "../../interfaces/user-portafolio-total-item";
import { PortafolioInvestmentUtils } from "../../utils/portafolio-investment.utils";

interface Props {
  asset: UserPortafolioTotalItem
}

const PortafolioInvestmentDetails = ({ asset }: Props) => {

  const getROIClassName = (): string => {
    let classes = 'info-value';
  
    return `${classes} ${PortafolioInvestmentUtils.getROIClassName(asset)}`
  }

  return (
    <InfoContainer title={'My investment'}>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
        className={styles['portafolio-investment-details']}
      >
        <span className={styles['info-title']}>Assets</span>
        <SpanNumbericRounded value={asset.assetQuantity} styles={styles['info-value']}/>
        <br />
        <span className={styles['info-title']}>Invested amount</span>
        <SpanNumbericRounded value={PortafolioInvestmentUtils.getInvestedAmount(asset)} startAdornment={'$'} styles={styles['info-value']}/>
        <br />
        <span className={styles['info-title']}>Average purchase price</span>
        <SpanNumbericRounded value={asset.assetMidPrice} startAdornment={'$'} styles={styles['info-value']}/>
        <br />
        <span className={styles['info-title']}>Market value</span>
        <SpanNumbericRounded value={PortafolioInvestmentUtils.getAssetMarketValue(asset)} startAdornment={'$'} styles={getROIClassName()}/>
        <br />
        <span className={styles['info-title']}>Total ROI</span>
        <Stack spacing={2} direction="row">
          <SpanNumbericRounded value={PortafolioInvestmentUtils.getROIByDollarAmout(asset)} startAdornment={'$'} styles={getROIClassName()}/>
          <Stack direction="row">
            <span className={getROIClassName()}>(</span>
            <SpanNumbericRounded value={PortafolioInvestmentUtils.getROIByPercentage(asset)} startAdornment={'%'} styles={getROIClassName()}/>
            <span className={getROIClassName()}>)</span>
          </Stack>
        </Stack>
      </Stack>
    </InfoContainer>
  )
}

export default PortafolioInvestmentDetails;