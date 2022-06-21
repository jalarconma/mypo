import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormInputNumber from "../../../../shared/components/form-input-number/FormInputNumber";

const RegisterAssetByQuantity = ({ control, getValues }) => {
  
  const calculateAssetPrice = (): number => {
    const assetQuantity = getValues('assetQuantity');
    const assetPrice = getValues('assetPrice');

    if(!assetQuantity || !assetPrice) {
      return 0;
    }

    return assetQuantity * assetPrice;
  }

  return (
    <Stack
      direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="center"
      padding={1}>
      <Box
        sx={{
          minWidth: '5%',
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
          minWidth: '10%',
        }}
      >
        <TextField fullWidth type="number" variant="outlined"
          name="estimatedAssetPrice" label="Estimated asset price in USD" value={calculateAssetPrice()}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} />
      </Box>
    </Stack>
  );
}

export default RegisterAssetByQuantity;