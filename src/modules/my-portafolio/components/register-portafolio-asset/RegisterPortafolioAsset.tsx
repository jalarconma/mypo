import styles from './RegisterPortafolioAsset.module.scss';

import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { FormSelectorOption } from '../../../../core/models/form-selector-option.interface';
import { PortafolioAction, Symbol, SymbolType, UserPortafolio } from '../../../../models';
import { RegisterPortafolioForm } from '../../interfaces/register-portafolio-form';
import { EMPTY_SYMBOL_SELECTOR } from '../../constants/register-portafolio-asset..constant';
import { RegisterPortafolioService } from '../../../../core/interfaces/register-portafolio.service';
import { useRegisterPortafolioService } from '../../../../core/hooks/use-register-portafolio-service';
import { UserAuthService } from '../../../../authentication/interfaces/user-auth.interface';
import { useUserAuthService } from '../../../../authentication/hooks/use-user-auth-service';
import FormFieldItem from '../form-field-item/FormFieldItem';
import { RegisterPortafolioFieldsFactory } from '../../factories/register-portafolio-fields.factory';
import { StringUtils } from '../../../../shared/utils/string-utils';
import React from 'react';
import { CreateUserPortafolioInput } from '../../../../API';

const RegisterPortafolioAsset = () => {

  const [symbols, setSymbols] = useState<FormSelectorOption[]>([]);

  const { handleSubmit, reset, control, getValues, setValue } = useForm<RegisterPortafolioForm>({
    mode: 'onChange',
    defaultValues: {
      assetType: '',
      action: '',
      assetActionDate: null,
      assetSymbol: EMPTY_SYMBOL_SELECTOR,
      mode: '',
      assetQuantity: 0,
      dollarAmount: 0,
      assetPrice: 0,
      estimatedAssetQuantity: 0,
      estimatedAssetPrice: 0
    }
  });

  const registerPortafolioService: RegisterPortafolioService = useRegisterPortafolioService();
  const userAuthService: UserAuthService = useUserAuthService();

  const [assetType, assetSymbol, mode, dollarAmount, assetPrice, assetQuantity, assetActionDate] = useWatch({
    name: ["assetType", "assetSymbol", "mode", "dollarAmount", "assetPrice", "assetQuantity", "assetActionDate"],
    control
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setValue("dollarAmount", 0);
    setValue("assetQuantity", 0);
  }, [mode])

  useEffect(() => {
    setValue("estimatedAssetPrice", calculateAssetPrice());
    setValue("estimatedAssetQuantity", calculateAssetQuantity());
  }, [assetQuantity, dollarAmount])

  useEffect(() => {
    setValue('assetSymbol', EMPTY_SYMBOL_SELECTOR);
    fetchSymbols();
  }, [assetType])

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

  const onSubmit = (data: RegisterPortafolioForm) => {
    console.log('to submit data: ', data);

    if(!userAuthService.currentUser) {
      return ;
    }

    const assetToAdd: CreateUserPortafolioInput = {
      user: userAuthService.currentUser.email,
      owner: userAuthService.currentUser.username,
      action: PortafolioAction[data.action],
      asset_quantity: RegisterPortafolioFieldsFactory.getAssetQuantity(data),
      action_date: StringUtils.dateToValidString(data.assetActionDate),
      current_asset_price: data.assetPrice,
      userPortafolioSymbolId: data.assetSymbol.id
    };

    registerPortafolioService.addAssetToPortafolio(assetToAdd);
  }

  return (
    <div className={styles['register-portafolio-asset']}>
      <h3>Register an action</h3>
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
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
        </Stack>
      </form>
    </div>
  );
}

export default RegisterPortafolioAsset;