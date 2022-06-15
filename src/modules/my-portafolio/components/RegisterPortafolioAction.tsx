import styles from './RegisterPortafolioAction.module.scss';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import { listSymbols } from '../../../graphql/queries';
import { API, Auth, DataStore, graphqlOperation, syncExpression } from 'aws-amplify'
import { UserPortafolio, PortafolioAction, Symbol } from '../../../models';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Button from '@mui/material/Button';
import FormInputNumber from '../../../shared/components/form-input-number/FormInputNumber';
import FormSelectorUnique from '../../../shared/components/form-selector-unique/FormSelectorUnique';
import FormDateSelector from '../../../shared/components/form-date-selector/FormDateSelector';
import { FormSelectorOption } from '../../../core/models/form-selector-option.interface';

const RegisterPortafolioAction = () => {
  useEffect(() => {
    getData();
  }, []);

  const { handleSubmit, reset, control, formState } = useForm({
    defaultValues: {
      action: '',
      assetQuantity: 0,
      assetActionDate: new Date(),
      assetPrice: 0,
      assetSymbol: ''
    }
  });
  const [symbols, setSymbols] = useState<FormSelectorOption[]>([]);
  const [user, setUser] = useState(null);

  const portafolioActions: FormSelectorOption[] = [
    { id: PortafolioAction.BUY, label: PortafolioAction.BUY },
    { id: PortafolioAction.SELL, label: PortafolioAction.SELL }
  ];

  const getData = async () => {
    const symbols = await DataStore.query(Symbol);
    const user = await Auth.currentAuthenticatedUser();
    setSymbols(symbols.map(symbol => ({ id: symbol.id, label: symbol.symbol })));
    setUser(user);

    /*console.log('portafolio', await DataStore.query(UserPortafolio, (e) =>
    e.user('eq', user.attributes.email)));*/

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  const onSubmit = (data: any) => console.log('submitted data: ', data);

  const addPortafolioAction = async () => {
    /*const data = await DataStore.save(
      new UserPortafolio({
        user: user.attributes.email,
        action: PortafolioAction.BUY,
        asset_quantity: 1,
        action_date: '2022-03-15',
        current_asset_price: 12,
        symbol: symbols[0],
        userPortafolioSymbolId: symbols[0].id
      }));*/

    //await DataStore.clear();

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  const addAlternativePortafolioAction = async () => {
    /*const data = await DataStore.save(
      new UserPortafolio({
        user: 'test@test.com',
        action: PortafolioAction.BUY,
        asset_quantity: 1,
        action_date: '2022-03-15',
        current_asset_price: 12,
        symbol: symbols[0],
        userPortafolioSymbolId: symbols[0].id
      }));*/

    //await DataStore.clear();

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  return (
    <div className={styles['register-portafolio-action']}>
      <h3>Register an action</h3>
      <form >
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}>
          <FormSelectorUnique
            control={control}
            name="action"
            label="Select action"
            rules={{ required: true }}
            options={portafolioActions}

          />
          <FormInputNumber
            control={control}
            name="assetQuantity"
            label="asset quantity"
            rules={{ required: true }}
          />
          <FormDateSelector
            control={control}
            name="assetActionDate"
            label="Select action date"
            rules={{ required: true }}
          />
          <FormInputNumber
            control={control}
            name="assetPrice"
            label="Asset price"
            rules={{ required: true }}
            inputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <FormSelectorUnique
            name="assetSymbol"
            control={control}
            options={symbols}
            label="Select symbol"
            rules={{ required: true }}
          />
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="center"
          alignItems="center">
          <Button onClick={handleSubmit(onSubmit)} disabled={!formState.isValid}>Submit</Button>
          <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
          <span>{formState.errors.action?.message}</span>
          <span>{formState.errors.assetActionDate?.message}</span>
          <span>{formState.errors.assetPrice?.message}</span>
          <span>{formState.errors.assetQuantity?.message}</span>
          <span>{formState.errors.assetSymbol?.message}</span>
        </Stack>
      </form>
    </div>
  );
}

export default RegisterPortafolioAction;