import styles from './RegisterPortafolioAsset.module.scss';

import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { API, Auth, DataStore, graphqlOperation, syncExpression } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { listSymbols } from '../../../../graphql/queries';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormInputNumber from '../../../../shared/components/form-input-number/FormInputNumber';
import FormSelectorUnique from '../../../../shared/components/form-selector-unique/FormSelectorUnique';
import FormDateSelector from '../../../../shared/components/form-date-selector/FormDateSelector';
import { FormSelectorOption } from '../../../../core/models/form-selector-option.interface';
import { UserPortafolio, PortafolioAction, Symbol, SymbolType } from '../../../../models';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormAutocompleteSelector from '../../../../shared/components/form-autocomplete-selector/FormAutocompleteSelector';
import RegisterAssetAction from '../register-asset-action/RegisterAssetAction';
import FormToggleSelectorUnique from '../../../../shared/components/form-toggle-selector-unique/FormToggleSelectorUnique';
import { ToggleSelectorOption } from '../../../../shared/interfaces/ToggleSelectorOption';
import { StringUtils } from '../../../../shared/utils/string-utils';

const RegisterPortafolioAsset = () => {

  const [symbols, setSymbols] = useState<FormSelectorOption[]>([]);
  const [user, setUser] = useState(null);
  const [assetType, setAssetType] = useState<SymbolType | ''>('');

  const portafolioToggleActions: ToggleSelectorOption[] = [
    { value: PortafolioAction.BUY, label: PortafolioAction.BUY, selectionColor: 'success' },
    { value: PortafolioAction.SELL, label: PortafolioAction.SELL, selectionColor: 'error' }
  ];

  const assetTypes: FormSelectorOption[] = [
    { id: SymbolType.CRYPTO, label: SymbolType.CRYPTO },
    { id: SymbolType.STOCK, label: SymbolType.STOCK }
  ];

  const { handleSubmit, reset, control, getValues, setValue } = useForm({
    defaultValues: {
      action: '',
      assetActionDate: null,
      assetSymbol: { id: '', label: '' },
      assetQuantity: 0,
      dollarAmount: 0,
      assetPrice: 0,
    }
  });

  const [ assetSymbol, dollarAmount, assetPrice, assetQuantity, assetActionDate] = useWatch({
    name: ["assetSymbol", "dollarAmount", "assetPrice", "assetQuantity", "assetActionDate"],
    control
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    fetchSymbols();
  }, [assetType])

  useEffect(() => {
    fetchPrice();
  }, [assetActionDate]);

  const fetchPrice = async () => {

    if(!assetType.length || !assetActionDate || !assetSymbol.id.length) {
      return;
    }

    const price = await API.get('myporest', '/prices/by-date', {
      'queryStringParameters': {
        "assetType": assetType,
        "date": StringUtils.dateToString(assetActionDate),
        "symbol": assetSymbol.id
      }
    });

    setValue("assetPrice", price);
  }

  const fetchSymbols = async () => {

    if (!assetType) {
      return;
    }

    const symbols = await DataStore.query(Symbol, (sym) => sym.type('eq', SymbolType[assetType]));
    setSymbols(symbols.map(symbol => ({ id: symbol.id, label: symbol.symbol })));
  }

  const getData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);

    fetchSymbols();

    /*console.log('portafolio', await DataStore.query(UserPortafolio, (e) =>
    e.user('eq', user.attributes.email)));*/

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  const handleAssetTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case SymbolType.CRYPTO:
        setAssetType(SymbolType.CRYPTO);
        break;
      case SymbolType.STOCK:
        setAssetType(SymbolType.STOCK);
        break;
      default:
        setAssetType('');
        break;
    }
  };

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
    <div className={styles['register-portafolio-asset']}>
      <h3>Register an action</h3>
      <form >
        <Stack
          spacing={4}
          justifyContent="center"
          padding={1}>
          <Stack
            direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
            justifyContent="space-between"
            spacing={2}
          >
            <Box
              sx={{
                minWidth: '20%',
              }}>
              <TextField
                select
                fullWidth
                label='Select asset type'
                value={assetType}
                onChange={handleAssetTypeChange}
              >
                {assetTypes.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box
              sx={{
                minWidth: '20%',
              }}
            >
              <FormAutocompleteSelector
                name="assetSymbol"
                control={control}
                options={symbols}
                label="Select symbol"
                rules={{ required: true }}
              />
            </Box>
            <Box
              sx={{
                minWidth: '20%',
              }}
            >
              <FormToggleSelectorUnique
                control={control}
                name="action"
                label='Action'
                rules={{ required: true }}
                options={portafolioToggleActions}
              />
            </Box>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
            justifyContent="space-between"
            spacing={2}
          >
            <Box
              sx={{
                minWidth: '20%',
              }}
            >
              <FormDateSelector
                control={control}
                name="assetActionDate"
                label="Select action date"
                rules={{ required: true }}
              />
            </Box>
            <Box
              sx={{
                minWidth: '20%',
              }}
            >
              <FormInputNumber
                control={control}
                name="assetPrice"
                label="Asset price in USD"
                rules={{ required: true }}
                inputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Box>
          </Stack>
          <RegisterAssetAction control={control} getValues={getValues} setValue={setValue} />
        </Stack>
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