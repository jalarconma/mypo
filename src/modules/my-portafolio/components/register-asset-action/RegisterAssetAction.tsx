import styles from './RegisterAssetAction.module.scss';

import { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import RegisterAssetByQuantity from '../register-asset-by-quantity/RegisterAssetByQuantity';
import RegisterActionByDolarCost from '../register-asset-by-dolar-cost/RegisterActionByDolarCost';
import ToggleSelectorUnique from '../../../../shared/components/toggle-selector-unique/ToggleSelectorUnique';
import { ToggleSelectorOption } from '../../../../shared/interfaces/ToggleSelectorOption';
import Box from '@mui/material/Box';

const RegisterAssetAction = ({ control, getValues, setValue }) => {

  const modes: ToggleSelectorOption[] = [
    { label: 'Asset quantity', value: 'assetQuantity', selectionColor: 'primary' },
    { label: 'Dollar amout', value: 'dollarAmount', selectionColor: 'primary' }
  ];

  const [mode, setMode] = useState<ToggleSelectorOption>(modes[0]);

  const getModeForm = () => {
    switch (mode.value) {
      case modes[0].value:
        return <RegisterAssetByQuantity control={control} getValues={getValues} />
      case modes[1].value:
        return <RegisterActionByDolarCost control={control} getValues={getValues} />
      default:
        return null;
    }
  }

  const handleChange = (value: string) => {
    console.log('value in mode: ', value);
    const selectedMode = modes.find(mode => mode.value === value);

    if (selectedMode) {
      setMode(selectedMode);
    }

    setValue("dollarAmount", 0);
    setValue("assetQuantity", 0);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
      justifyContent="space-between"
      spacing={2}>
      <Box
        sx={{
          minWidth: '40%',
        }}
      >
        <ToggleSelectorUnique options={modes} onChange={handleChange} value={mode.value} label='Mode' />
      </Box>
      {getModeForm()}
    </Stack>
  );
}

export default RegisterAssetAction;