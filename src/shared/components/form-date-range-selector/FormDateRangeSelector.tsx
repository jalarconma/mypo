import React from "react";

import { Controller } from "react-hook-form";

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { DateRange } from "../../interfaces/portafolio-date-range";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

enum DateRangeValue {
  FROM = 'FROM',
  TO = 'TO'
}

const FormDateRangeSelector = ({ control, name, label = "", rules = {}, format = "dd/MM/yyyy" }) => {

  const changeHandler = (dateChanged: Date, rangeValue: DateRangeValue, prevRange: DateRange, onControlerChange): DateRange => {
    let dateRange: DateRange = [null, null];

    if (!prevRange) {
      onControlerChange(dateRange)
      return dateRange;
    }

    dateRange = [...prevRange];

    switch (rangeValue) {
      case DateRangeValue.FROM:
        dateRange[0] = dateChanged;
        break;
      case DateRangeValue.TO:
        dateRange[1] = dateChanged;
        break;
      default: break;
    }

    onControlerChange(dateRange);
    return dateRange;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        // <Stack spacing={1}>
        //   <DatePicker
        //     selected={value[0]}
        //     onChange={(date) => changeHandler(date, DateRangeValue.FROM, value, onChange)}
        //     selectsStart
        //     startDate={value[0]}
        //     endDate={value[1]}
        //     maxDate={value[1]}
        //   />
        //   <DatePicker
        //     selected={value[1]}
        //     onChange={(date) => changeHandler(date, DateRangeValue.TO, value, onChange)}
        //     selectsEnd
        //     startDate={value[0]}
        //     endDate={value[1]}
        //     minDate={value[0]}
        //   />
        //   <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        // </Stack>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={1}>
            <Typography variant="button" display="block" gutterBottom>
              {label}
            </Typography>
            <MobileDatePicker
              label={'FROM'}
              inputFormat={format}
              value={value[0]}
              maxDate={value[1]}
              onChange={(data) => changeHandler(data, DateRangeValue.FROM, value, onChange)}
              renderInput={(params) => <TextField error={!!error} fullWidth {...params} />}
            />
            <MobileDatePicker
              label={'TO'}
              inputFormat={format}
              value={value[1]}
              minDate={value[0]}
              onChange={(data) => changeHandler(data, DateRangeValue.TO, value, onChange)}
              renderInput={(params) => <TextField error={!!error} fullWidth {...params} />}
            />
            <FormHelperText error={!!error}>{error?.message}</FormHelperText>
          </Stack>
        </LocalizationProvider>
      )}
    />
  );
}

export default FormDateRangeSelector;