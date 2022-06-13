import styles from './RegisterPortafolioAction.module.scss';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { listSymbols } from '../../../graphql/queries';
import { API, Auth, DataStore, graphqlOperation, syncExpression } from 'aws-amplify'
import { UserPortafolio, PortafolioAction, Symbol } from '../../../models';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const RegisterPortafolioAction = () => {
  useEffect(() => {
    getData();
  }, []);

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
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          select
          label="Select"
          helperText="Please select your action"
        >
          {portafolioActions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="asset quantity" variant="outlined" />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <MobileDatePicker
              label="Date mobile"
              inputFormat="MM/dd/yyyy"
              value={new Date()}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <TextField
          select
          label="Select"
          helperText="Please select your symbol"
        >
          {symbols.map((option: Symbol) => (
            <MenuItem key={option.id} value={option.symbol}>
              {option.symbol}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <button onClick={addPortafolioAction}>Create Portafolio</button>
      <button onClick={addAlternativePortafolioAction}>Create Portafolio With other User</button>
    </div>
  );
}

export default RegisterPortafolioAction;