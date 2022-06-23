import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormInputNumber from "../../../../shared/components/form-input-number/FormInputNumber";

const RegisterActionByDolarCost = ({ control, getValues }) => {

  const calculateAssetQuantity = (): number => {
    const dolarAmount = getValues('dollarAmount');
    const assetPrice = getValues('assetPrice');

    if(!dolarAmount || !assetPrice) {
      return 0;
    }

    return dolarAmount/assetPrice;
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
          name="dollarAmount"
          label="Dollar amount"
          rules={{ required: true }}
          inputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>
      <Box
        sx={{
          minWidth: '20%',
        }}
      >
        <TextField fullWidth type="number" variant="outlined"
          name="estimatedAssetQuantity" label="Estimated asset quantity" value={calculateAssetQuantity()} />
      </Box>
    </>
  );
}

export default RegisterActionByDolarCost