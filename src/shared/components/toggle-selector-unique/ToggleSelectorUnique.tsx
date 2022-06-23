import { useState } from "react";

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { ToggleSelectorOption } from "../../interfaces/ToggleSelectorOption";

type ToggleColor = 'standard' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

const ToggleSelectorUnique = ({ options, onChange, value, label = '' }) => {
  const [color, setColor] = useState<ToggleColor>('primary');

  const changeHandler = (onChange, value): string => {
    const selectedOption = options.find(option => option.value === value);
    const selectedColor: ToggleColor = selectedOption ? selectedOption.selectionColor : 'primary';
    setColor(selectedColor);
    onChange(value);
    return value
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
      spacing={1}
      justifyContent="center"
      alignItems={{ xs: 'flex-start', sm: 'flex-start', md: 'flex-start', lg: 'center' }}>
      <Typography variant="button" display="block" gutterBottom>
        {label}
      </Typography>
      <ToggleButtonGroup
        fullWidth
        size="large"
        color={color}
        value={value}
        exclusive
        onChange={(event, value) => changeHandler(onChange, value)}>
        {
          options.map((option: ToggleSelectorOption) => {
            return <ToggleButton key={option.value} value={option.value}>{option.label}</ToggleButton>
          })
        }
      </ToggleButtonGroup>
    </Stack>
  );
}

export default ToggleSelectorUnique