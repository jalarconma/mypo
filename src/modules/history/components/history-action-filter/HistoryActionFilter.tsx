import styles from './HistoryActionFilter.module.scss';

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import FormFieldItem from '../../../my-portafolio/components/form-field-item/FormFieldItem';
import { EMPTY_SYMBOL_SELECTOR } from '../../../my-portafolio/constants/register-portafolio-asset..constant';
import { HistoryActionFilterFactory } from '../../factories/history-action-filter.factory';
import { FormSelectorOption } from '../../../../core/models/form-selector-option.interface';
import { HistoryActionFilterForm } from '../../interfaces/history-action-filter-form';

const HistoryActionFilter = () => {

  const [symbols, setSymbols] = useState<FormSelectorOption[]>([]);

  const { handleSubmit, reset, control, setValue } = useForm<HistoryActionFilterForm>({
    mode: 'onChange',
    defaultValues: {
      assetType: '',
      assetSymbol: EMPTY_SYMBOL_SELECTOR,
    }
  });

  const fields = HistoryActionFilterFactory.getFields(symbols);

  const applyFiltersHandler = (): void => {

  }
  
  return (
    <div className={styles['filter-form']}>
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
          <Button onClick={handleSubmit(applyFiltersHandler)}>Submit</Button>
          <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
        </Stack>
      </form>
    </div>
  )
}

export default HistoryActionFilter;