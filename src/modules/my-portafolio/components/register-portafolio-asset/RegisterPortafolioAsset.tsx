import styles from './RegisterPortafolioAsset.module.scss';

import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { FormSelectorOption } from '../../../../core/models/form-selector-option.interface';
import { RegisterPortafolioForm } from '../../interfaces/register-portafolio-form';
import { EMPTY_SYMBOL_SELECTOR, REGISTER_PORTAFOLIO_ASSET_FIELD_NAME } from '../../constants/register-portafolio-asset..constant';
import { RegisterPortafolioService } from '../../../../core/interfaces/register-portafolio.service';
import { useRegisterPortafolioService } from '../../../../core/hooks/use-register-portafolio-service';
import FormFieldItem from '../form-field-item/FormFieldItem';
import { RegisterPortafolioFieldsFactory } from '../../factories/register-portafolio-fields.factory';
import { SymbolType } from '../../../../models';

interface Props {
  onSubmit: (data: RegisterPortafolioForm) => void;
  formOpened: boolean;
}

const RegisterPortafolioAsset = ({ onSubmit, formOpened }: Props) => {

  const [symbols, setSymbols] = useState<FormSelectorOption[]>([]);

  const { handleSubmit, reset, control, setValue } = useForm<RegisterPortafolioForm>({
    mode: 'onChange',
    defaultValues: {
      assetType: '',
      action: '',
      assetActionDate: null,
      assetSymbol: EMPTY_SYMBOL_SELECTOR,
      mode: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity,
      assetQuantity: 0,
      dollarAmount: 0,
      assetPrice: 0,
      estimatedAssetQuantity: 0,
      estimatedAssetPrice: 0
    }
  });

  const registerPortafolioService: RegisterPortafolioService = useRegisterPortafolioService();

  const [assetType, assetSymbol, mode, dollarAmount, assetPrice, assetQuantity, assetActionDate] = useWatch({
    name: ["assetType", "assetSymbol", "mode", "dollarAmount", "assetPrice", "assetQuantity", "assetActionDate"],
    control
  });

  useEffect(() => {
    getData();
    handleReset();
  }, []);

  useEffect(() => {
    if(!formOpened) {
      handleReset();
    }
  }, [formOpened]);

  useEffect(() => {
    setValue("dollarAmount", 0);
    setValue("assetQuantity", 0);
  }, [mode]);

  useEffect(() => {
    setValue("estimatedAssetPrice", calculateAssetPrice());
    setValue("estimatedAssetQuantity", calculateAssetQuantity());
  }, [assetQuantity, dollarAmount]);

  useEffect(() => {
    setValue('assetSymbol', EMPTY_SYMBOL_SELECTOR);
    fetchSymbols();
  }, [assetType]);

  useEffect(() => {
    fetchPrice();
  }, [assetActionDate, assetSymbol]);

  const fields = RegisterPortafolioFieldsFactory.getRegisterFields(mode, symbols);

  const fetchPrice = async () => {
    if (!assetType?.length || !assetActionDate || !assetSymbol?.id.length) {
      return;
    }

    const price = await registerPortafolioService.getPrice(SymbolType[assetType], assetActionDate, assetSymbol.id);

    setValue("assetPrice", price);
  }

  const fetchSymbols = async () => {

    if (!assetType?.length) {
      return;
    }

    const symbols = await registerPortafolioService.getSymbols(SymbolType[assetType]);
    const mappedSymbols = symbols.map(symbol => ({ id: symbol.id, label: symbol.displaySymbol}));
    mappedSymbols.unshift(EMPTY_SYMBOL_SELECTOR);
    setSymbols(mappedSymbols);
  }

  const getData = async () => {
    fetchSymbols();
  }

  const calculateAssetQuantity = (): number => {

    if(!dollarAmount || !assetPrice) {
      return 0;
    }

    return dollarAmount/assetPrice;
  }

  const calculateAssetPrice = (): number => {

    if (!assetQuantity || !assetPrice) {
      return 0;
    }

    return assetQuantity * assetPrice;
  }

  const handlePortafolioSubmit = (data: RegisterPortafolioForm) => {
    onSubmit(data);
  }

  const handleReset = (): void => {
    reset();
    setSymbols([]);
  }

  return (
    <div className={styles['register-portafolio-asset']}>
      <form >
        <Grid container spacing={4}>
          {fields.map((item, index) => (

            item.hidden ? null :
              <Grid item xs={12} sm={12} md={12} lg={4} key={index}>
                <FormFieldItem
                  type={item.type} control={control}
                  name={item.name} label={item.label} options={item.options}
                  format={item.format} rules={item.rules} inputProps={item.inputProps} />
              </Grid>

          ))}
        </Grid>
        <Stack
          direction={'row'}
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
          padding={1}>
          <Button onClick={handleSubmit(handlePortafolioSubmit)}>Submit</Button>
          <Button onClick={handleReset} variant={"outlined"}>Reset</Button>
        </Stack>
      </form>
    </div>
  );
}

export default RegisterPortafolioAsset;