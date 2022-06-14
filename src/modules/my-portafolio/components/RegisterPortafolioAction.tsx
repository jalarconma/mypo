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

const RegisterPortafolioAction = () => {
  useEffect(() => {
    getData();
  }, []);

  const { handleSubmit, reset, control } = useForm();
  const [symbols, setSymbols] = useState([]);
  const [user, setUser] = useState(null);

  const portafolioActions: PortafolioAction[] = [PortafolioAction.BUY, PortafolioAction.SELL];

  const getData = async () => {
    const models = await DataStore.query(Symbol);
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
    console.log(models);
    setSymbols(models);
    setUser(user);

    /*console.log('portafolio', await DataStore.query(UserPortafolio, (e) =>
    e.user('eq', user.attributes.email)));*/

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  const onSubmit = (data: any) => console.log('submitted data: ', data);

  const addPortafolioAction = async () => {
    const data = await DataStore.save(
      new UserPortafolio({
        user: user.attributes.email,
        action: PortafolioAction.BUY,
        asset_quantity: 1,
        action_date: '2022-03-15',
        current_asset_price: 12,
        symbol: symbols[0],
        userPortafolioSymbolId: symbols[0].id
      }));

    //await DataStore.clear();

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  const addAlternativePortafolioAction = async () => {
    const data = await DataStore.save(
      new UserPortafolio({
        user: 'test@test.com',
        action: PortafolioAction.BUY,
        asset_quantity: 1,
        action_date: '2022-03-15',
        current_asset_price: 12,
        symbol: symbols[0],
        userPortafolioSymbolId: symbols[0].id
      }));

    //await DataStore.clear();

    console.log('portafolio', await DataStore.query(UserPortafolio));
  }

  return (
    <div className={styles['register-portafolio-action']}>
      <form >
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}>
          <Controller
            name={"action"}
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                label="Select"
                value={value}
                onChange={onChange}
                helperText="Please select your action"
              >
                {portafolioActions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name={"assetQuantity"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField label="asset quantity" variant="outlined" defaultValue={value} />
            )}
          />
          <Controller
            name={"assetActionDate"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <MobileDatePicker
                    label="Date mobile"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            )}
          />
          <Controller
            name={"assetPrice"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Price"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                defaultValue={value}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            )}
          />
          <Controller
            name={"assetSymbol"}
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                label="Select"
                value={value}
                onChange={onChange}
                helperText="Please select your symbol"
              >
                {symbols.map((option: Symbol) => (
                  <MenuItem key={option.id} value={option.symbol}>
                    {option.symbol}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="center"
          alignItems="center">
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
        </Stack>
      </form>
    </div>
  );
}

export default RegisterPortafolioAction;