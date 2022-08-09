import styles from './HistoryActionFilter.module.scss';

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import FormFieldItem from '../../../../shared/components/form-field-item/FormFieldItem';
import { EMPTY_SYMBOL_SELECTOR } from '../../../my-portafolio/constants/register-portafolio-asset..constant';
import { HistoryActionFilterFactory } from '../../factories/history-action-filter.factory';
import { FormSelectorOption } from '../../../../core/models/form-selector-option.interface';
import { HistoryActionFilterForm } from '../../interfaces/history-action-filter-form';
import { Symbol } from '../../../../API';

interface Props {
  symbols: FormSelectorOption[];
  onFilter: (data: HistoryActionFilterForm) => void
}

const HistoryActionFilter = ({ symbols, onFilter }: Props) => {

  const { handleSubmit, reset, control, setValue } = useForm<HistoryActionFilterForm>({
    mode: 'onChange',
    defaultValues: {
      action: {  id: '', label: 'select an action'},
      action_date: [null, null],
      symbol: [],
      createdAt: [null, null],
      updatedAt: [null, null]
    }
  });

  const fields = HistoryActionFilterFactory.getFields(symbols);

  const applyFiltersHandler = (data: HistoryActionFilterForm): void => {
    onFilter(data);
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
                  name={item.name} label={item.label} options={item.options} multiple={item.multiple}
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