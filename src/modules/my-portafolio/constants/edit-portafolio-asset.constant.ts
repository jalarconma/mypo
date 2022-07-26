import React from "react";

import InputAdornment from "@mui/material/InputAdornment";

import { RegisterPortafolioFieldType } from "../enums/register-portafolio-field-type";
import { RegisterPortafolioAssetField } from "../interfaces/register-portafolio-asset-field";
import { PORTAFOLIO_TOGGLE_ACTIONS, REGISTER_PORTAFOLIO_MODES } from "./register-portafolio-asset..constant";

export const EDIT_PORTAFOLIO_ASSET_FIELD_NAME = {
  Action: 'action',
  AssetActionDate : 'assetActionDate',
  AssetPrice: 'assetPrice',
  Mode: 'mode',
  AssetQuantity: 'assetQuantity',
  EstimatedAssetPrice: 'estimatedAssetPrice',
  DollarAmount: 'dollarAmount',
  EstimatedAssetQuantity: 'estimatedAssetQuantity'
};

export const EDIT_PORTAFOLIO_ASSET_FIELDS: RegisterPortafolioAssetField[] = [
  {
    name: EDIT_PORTAFOLIO_ASSET_FIELD_NAME.Action,
    label: 'Action',
    type: RegisterPortafolioFieldType.TOGGLE,
    rules:{ validate: (action: string) => action !== '' ? true : 'the action is required' },
    options: PORTAFOLIO_TOGGLE_ACTIONS
  },
  {
    name: EDIT_PORTAFOLIO_ASSET_FIELD_NAME.AssetActionDate,
    label: 'Select action date',
    type: RegisterPortafolioFieldType.DATE,
    rules:{ required: 'The action date is required' }
  },
  {
    name: EDIT_PORTAFOLIO_ASSET_FIELD_NAME.AssetPrice,
    label: 'Asset price in USD',
    type: RegisterPortafolioFieldType.NUMERIC,
    rules: { validate: (price: number) => !isNaN(price) && price > 0 ? true : 'the price is required' },
    inputProps: {startAdornment: React.createElement(InputAdornment, { position: 'start'}, '$')}
  },
  {
    name: EDIT_PORTAFOLIO_ASSET_FIELD_NAME.Mode,
    label: 'Mode',
    type: RegisterPortafolioFieldType.TOGGLE,
    options: REGISTER_PORTAFOLIO_MODES
  },
  {
    name: EDIT_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity,
    label: 'Asset quantity',
    type: RegisterPortafolioFieldType.NUMERIC,
    rules: {validate: (price: number) => !isNaN(price) && price > 0 ? true : 'the price is required'}
  },
  {
    name: EDIT_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetPrice, 
    label: 'Estimated asset price in USD',
    type: RegisterPortafolioFieldType.NUMERIC,
    inputProps: {
      readOnly: true,
      startAdornment: React.createElement(InputAdornment, { position: 'start'}, '$')
    }
  },
  {
    name: EDIT_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount,
    label: 'Dollar amount',
    type: RegisterPortafolioFieldType.NUMERIC,
    rules: {validate: (price: number) => !isNaN(price) && price > 0 ? true : 'the price is required'},
    inputProps: {
      startAdornment: React.createElement(InputAdornment, { position: 'start'}, '$')
    }
  },
  {
    name: EDIT_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetQuantity,
    label: 'Estimated asset quantity',
    type: RegisterPortafolioFieldType.NUMERIC,
    inputProps: {
      readOnly: true
    }
  }
];