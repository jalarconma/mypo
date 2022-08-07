import styles from './EditPortafolioAsset.module.scss';

import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { PortafolioAction, UserPortafolio } from '../../../../models';
import FormFieldItem from '../form-field-item/FormFieldItem';
import { EditPortafolioFieldsFactory } from '../../factories/edit-portafolio-fields.factory';
import { REGISTER_PORTAFOLIO_ASSET_FIELD_NAME } from '../../constants/register-portafolio-asset..constant';
import { EditPortafolioForm } from '../../interfaces/edit-portafolio-form';

interface Props {
  onSubmit: (data: EditPortafolioForm) => void;
  asset: UserPortafolio;
  formOpened: boolean
}

const EditPortafolioAsset = ({ onSubmit, asset, formOpened }: Props) => {

  console.log('re rendering EditPortafolioAsset');

  const [initialRendering, setInitialRendering] = useState<boolean>(true);
  const [resetting, setResetting] = useState<boolean>(false);

  const { handleSubmit, reset, control, setValue } = useForm<EditPortafolioForm>({
    mode: 'onChange',
    defaultValues: {
      action: PortafolioAction[asset.action],
      assetActionDate: new Date(asset.action_date),
      mode: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity,
      assetQuantity: asset.asset_quantity,
      dollarAmount: 0,
      assetPrice: asset.current_asset_price,
      estimatedAssetQuantity: 0,
      estimatedAssetPrice: asset.asset_quantity * asset.current_asset_price
    }
  });

  const [mode, dollarAmount, assetPrice, assetQuantity] = useWatch({
    name: ["mode", "dollarAmount", "assetPrice", "assetQuantity"],
    control
  });

  useEffect(() => {
    if (!formOpened) {
      reset();
    }
  }, [formOpened])

  useEffect(() => {
    handleReset({
      action: PortafolioAction[asset.action],
      assetActionDate: new Date(asset.action_date),
      mode: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity,
      assetQuantity: asset.asset_quantity,
      dollarAmount: 0,
      assetPrice: asset.current_asset_price,
      estimatedAssetQuantity: 0,
      estimatedAssetPrice: asset.asset_quantity * asset.current_asset_price
    });
  }, [asset])

  useEffect(() => {

    if (initialRendering || !formOpened) {
      setInitialRendering(false);
      return;
    }

    if (resetting) {
      setValue("dollarAmount", 0);
      setValue("assetQuantity", asset.asset_quantity);
      setResetting(false);
      return;
    }

    setValue("dollarAmount", 0);
    setValue("assetQuantity", 0);
  }, [mode])

  useEffect(() => {
    setValue("estimatedAssetPrice", calculateAssetPrice());
    setValue("estimatedAssetQuantity", calculateAssetQuantity());
  }, [assetQuantity, dollarAmount]);

  const fields = EditPortafolioFieldsFactory.getEditFields(mode);

  const calculateAssetQuantity = (): number => {

    if (!dollarAmount || !assetPrice) {
      return 0;
    }

    return dollarAmount / assetPrice;
  }

  const calculateAssetPrice = (): number => {

    if (!assetQuantity || !assetPrice) {
      return 0;
    }

    return assetQuantity * assetPrice;
  }

  const handleReset = (value: EditPortafolioForm | undefined = undefined): void => {
    setResetting(true);
    reset(value);
  }

  const handlePortafolioSubmit = (data: EditPortafolioForm): void => {
    onSubmit(data);
  }

  return (
    <div className={styles['edit-portafolio-asset']}>
      <form >
        <Grid container spacing={4}>
          {fields.map((item, index) => (

            item.hidden ? null :
              <Grid item xs={12} sm={12} md={12} lg={4} key={index}>
                <FormFieldItem
                  type={item.type} control={control}
                  name={item.name} label={item.label} options={item.options}
                  format={item.format} rules={item.rules} inputProps={item.inputProps} />
              </Grid>

          ))}
        </Grid>
        <Stack
          direction={'row'}
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
          padding={1}>
          <Button onClick={handleSubmit(handlePortafolioSubmit)}>Submit</Button>
          <Button onClick={() => handleReset()} variant={"outlined"}>Reset</Button>
        </Stack>
      </form>
    </div>
  );
}

export default EditPortafolioAsset;