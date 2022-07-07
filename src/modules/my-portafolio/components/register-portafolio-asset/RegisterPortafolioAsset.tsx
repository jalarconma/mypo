import styles from './RegisterPortafolioAsset.module.scss';

import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormInputNumber from '../../../../shared/components/form-input-number/FormInputNumber';
import FormDateSelector from '../../../../shared/components/form-date-selector/FormDateSelector';
import { FormSelectorOption } from '../../../../core/models/form-selector-option.interface';
import { UserPortafolio, SymbolType } from '../../../../models';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormAutocompleteSelector from '../../../../shared/components/form-autocomplete-selector/FormAutocompleteSelector';
import RegisterAssetAction from '../register-asset-action/RegisterAssetAction';
import FormToggleSelectorUnique from '../../../../shared/components/form-toggle-selector-unique/FormToggleSelectorUnique';
import { ToggleSelectorOption } from '../../../../shared/interfaces/ToggleSelectorOption';
import { RegisterPortafolioForm } from '../../interfaces/register-portafolio-form';
import { ASSET_TYPES, PORTAFOLIO_TOGGLE_ACTIONS, REGISTER_PORTAFOLIO_ASSET_FIELDS, REGISTER_PORTAFOLIO_ASSET_FIELD_NAME } from '../../constants/register-portafolio-asset..constant';
import { RegisterPortafolioService } from '../../../../core/interfaces/register-portafolio.service';
import { useRegisterPortafolioService } from '../../../../core/hooks/use-register-portafolio-service';
import { UserAuthService } from '../../../../authentication/interfaces/user-auth.interface';
import { useUserAuthService } from '../../../../authentication/hooks/use-user-auth-service';
import { User } from '../../../../authentication/models/user.model';
import Grid from '@mui/material/Grid';
import FormFiedlItem from '../form-field-item/FormFieldItem';

const RegisterPortafolioAsset = () => {

  const [symbols, setSymbols] = useState<FormSelectorOption[]>([]);

  const { handleSubmit, reset, control, getValues, setValue } = useForm<RegisterPortafolioForm>({
    mode: 'onChange',
    defaultValues: {
      assetType: { id: '', label: '' },
      action: { value: '', label: '', selectionColor: '' },
      assetActionDate: null,
      assetSymbol: { id: '', label: '' },
      mode: { value: '', label: '', selectionColor: '' },
      assetQuantity: 0,
      dollarAmount: 0,
      assetPrice: 0,
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
    console.log('value in mode: ', mode);
    setValue("dollarAmount", 0);
    setValue("assetQuantity", 0);

  }, [mode])

  useEffect(() => {
    setValue('assetSymbol', { id: '', label: '' })
    fetchSymbols();
  }, [assetType])

  useEffect(() => {
    fetchPrice();
  }, [assetActionDate, assetSymbol]);

  const fields = REGISTER_PORTAFOLIO_ASSET_FIELDS.map(field => {
    const modeValue = ((mode as unknown) as string);
    if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetSymbol) {
      field.options = symbols;
    }

    if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity) {
      field.hidden = modeValue !== REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity;
    }

    if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetPrice) {
      field.hidden = modeValue !== REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity;
    }

    if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount) {
      field.hidden = modeValue !== REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount;
    }

    if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetQuantity) {
      field.hidden = modeValue !== REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount;
    }

    return field;
  });

  const fetchPrice = async () => {
    const assetTypeValue = (assetType as unknown as string);

    if (!assetTypeValue?.length || !assetActionDate || !assetSymbol?.id.length) {
      return;
    }

    const price = await registerPortafolioService.getPrice(SymbolType[assetTypeValue], assetActionDate, assetSymbol.id);

    setValue("assetPrice", price);
  }

  const fetchSymbols = async () => {
    const assetTypeValue = (assetType as unknown as string);

    if (!assetTypeValue?.length) {
      return;
    }

    const symbols = await registerPortafolioService.getSymbols(SymbolType[assetTypeValue]);
    setSymbols(symbols.map(symbol => ({ id: symbol.id, label: symbol.displaySymbol })));
  }

  const getData = async () => {
    fetchSymbols();
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
  }

  return (
    <div className={styles['register-portafolio-asset']}>
      <h3>Register an action</h3>
      <form >
        <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
          {fields.map((item, index) => (

            item.hidden ? null :
              <Grid item xs={2} sm={4} md={4} key={index}>
                <FormFiedlItem
                  type={item.type} control={control}
                  name={item.name} label={item.label} options={item.options}
                  format={item.format} rules={item.rules} inputProps={item.inputProps} />
              </Grid>

          ))}
        </Grid>
        {/* <Stack
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
                error={assetType === undefined ? true : false}
                helperText={assetType === undefined ? 'The asset type is required' : ''}
              >
                {ASSET_TYPES.map((option) => (
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
                rules={{ validate: (symbol: FormSelectorOption) => symbol.id !== '' ? true : 'the symbol is required' }}
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
                rules={{ validate: (symbol: ToggleSelectorOption) => symbol.value !== '' ? true : 'the action is required' }}
                options={PORTAFOLIO_TOGGLE_ACTIONS}
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
                rules={{ required: 'The action date is required' }}
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
                rules={{ validate: (price: number) => !isNaN(price) && price > 0 ? true : 'the price is required' }}
                inputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Box>
          </Stack>
          <RegisterAssetAction control={control} getValues={getValues} setValue={setValue} />
        </Stack> */}
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