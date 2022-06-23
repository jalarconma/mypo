import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import FormInputNumber from "../../../../shared/components/form-input-number/FormInputNumber";

const RegisterAssetByQuantity = ({ control, getValues }) => {

  const calculateAssetPrice = (): number => {
    const assetQuantity = getValues('assetQuantity');
    const assetPrice = getValues('assetPrice');

    if (!assetQuantity || !assetPrice) {
      return 0;
    }

    return assetQuantity * assetPrice;
  }

  return (
    <>
      <Box
        sx={{
          minWidth: '20%',
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
          minWidth: '20%',
        }}
      >
        <TextField fullWidth type="number" variant="outlined"
          name="estimatedAssetPrice" label="Estimated asset price in USD" value={calculateAssetPrice()}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} />
      </Box>
    </>
  );
}

export default RegisterAssetByQuantity;