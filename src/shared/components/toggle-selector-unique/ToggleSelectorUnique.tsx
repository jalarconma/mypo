import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import { ToggleSelectorOption } from "../../interfaces/ToggleSelectorOption";

type ToggleColor = 'standard' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

interface Props {
  options: any;
  onChange: (value: any) => void;
  value: any;
  label?: string;
  buttonColor?: ToggleColor;
}

const ToggleSelectorUnique = ({ options, onChange, value, label = '', buttonColor = 'primary' }: Props) => {
  const [color, setColor] = useState<ToggleColor>(buttonColor);

  const changeHandler = (onChange, value): string => {
    setButtonColor();
    onChange(value);
    return value
  };

  useEffect(() => {
    setButtonColor();
  }, [value]);

  const setButtonColor= () => {
    const selectedOption = options.find(option => option.value === value);
    const selectedColor: ToggleColor = selectedOption ? selectedOption.selectionColor : buttonColor;
    setColor(selectedColor);
  }

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