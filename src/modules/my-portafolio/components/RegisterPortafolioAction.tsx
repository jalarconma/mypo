import styles from './RegisterPortafolioAction.module.scss';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { API, Auth, DataStore, graphqlOperation, syncExpression } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { listSymbols } from '../../../graphql/queries';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormInputNumber from '../../../shared/components/form-input-number/FormInputNumber';
import FormSelectorUnique from '../../../shared/components/form-selector-unique/FormSelectorUnique';
import FormDateSelector from '../../../shared/components/form-date-selector/FormDateSelector';
import { FormSelectorOption } from '../../../core/models/form-selector-option.interface';
import { UserPortafolio, PortafolioAction, Symbol } from '../../../models';

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
          direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="center"
          padding={1}>
          <Box
            sx={{
              minWidth: 200,
            }}
          >
            <FormSelectorUnique
              control={control}
              name="action"
              label="Select action"
              rules={{ required: true }}
              options={portafolioActions}

            />
          </Box>
          <Box
            sx={{
              minWidth: 200,
            }}
          >
            <FormInputNumber
              control={control}
              name="assetQuantity"
              label="Asset quantity"
              rules={{ required: true }}
            />
          </Box>
          <Box
            sx={{
              minWidth: 100,
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
              minWidth: 200,
            }}
          >
            <FormInputNumber
              control={control}
              name="assetPrice"
              label="Asset price"
              rules={{ required: true }}
              inputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Box>
          <Box
            sx={{
              minWidth: 200,
            }}
          >
            <FormSelectorUnique
              name="assetSymbol"
              control={control}
              options={symbols}
              label="Select symbol"
              rules={{ required: true }}
            />
          </Box>
        </Stack>
        <Stack
          direction={'row'}
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
          padding={1}>
          <Button onClick={handleSubmit(onSubmit)} disabled={!formState.isValid}>Submit</Button>
          <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
        </Stack>
      </form>
    </div>
  );
}

export default RegisterPortafolioAction;