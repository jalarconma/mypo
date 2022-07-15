import Grid from "@mui/material/Grid";
import React from "react";
import { UserPortafolioTotalItem } from "../../interfaces/user-portafolio-total-item";

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
    return (getROIByDollarAmout()/getInvestedAmount()) * 100
  }

  const getAssetMarketValue = (): number => {
    return asset.assetCurrentPrice * asset.assetQuantity;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}><h4>{asset.symbol.displaySymbol}</h4></Grid>
      <Grid item xs={4}><h5>Invested amount: $</h5><span>{getInvestedAmount()}</span></Grid>
      <Grid item xs={4}><h5>Asset quantity: </h5><span>{asset.assetQuantity}</span></Grid>
      <Grid item xs={4}><h5>Asset mid price: $</h5><span>{asset.assetMidPrice}</span></Grid>
      <Grid item xs={4}><h5>Market value: $</h5><span>{getAssetMarketValue()}</span></Grid>
      <Grid item xs={4}><h5>ROI: %</h5><span>{getROIByPercentage()}</span></Grid>
      <Grid item xs={4}><h5>ROI: $</h5><span>{getROIByDollarAmout()}</span></Grid>
    </Grid>
  )
}

export default UserPortafolioItem;