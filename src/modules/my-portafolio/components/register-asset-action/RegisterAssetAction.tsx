import styles from './RegisterAssetAction.module.scss';

import { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import RegisterAssetByQuantity from '../register-asset-by-quantity/RegisterAssetByQuantity';
import RegisterActionByDolarCost from '../register-asset-by-dolar-cost/RegisterActionByDolarCost';



const RegisterAssetAction = ({control, getValues, setValue}) => {
  const [modeAssetQuantity, setModeAssetQuantity] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModeAssetQuantity(event.target.checked);
    setValue("dollarAmount", 0);
    setValue("assetQuantity", 0);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="center"
      padding={1}>
      <FormControlLabel control={
        <Switch
          checked={modeAssetQuantity}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />} label="Mode: asset quantity / by dolar cost" />
      { modeAssetQuantity ? 
        <RegisterAssetByQuantity control={control} getValues={getValues}/>: <RegisterActionByDolarCost control={control} getValues={getValues}/>
      }
    </Stack>
  );
}

export default RegisterAssetAction;