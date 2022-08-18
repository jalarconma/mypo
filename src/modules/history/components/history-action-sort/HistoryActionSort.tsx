import React from "react";

import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import CollapsibleLayout from "../../../../shared/components/collapsible-layout/CollapsibleLayout";
import FormFieldItem from "../../../../shared/components/form-field-item/FormFieldItem";
import { EmptyPortafolioSortForm, PortafolioSortForm } from "../../../../shared/interfaces/portafolio-sort-form";
import { HISTORY_ACTION_SORT_FIELDS } from "../../constants/history-action-sort.constants";

interface Props {
  onSort: (data: PortafolioSortForm) => void
}

const HistoryActionSort = ({ onSort }: Props) => {
  
  const { handleSubmit, reset, control } = useForm<PortafolioSortForm>({
    mode: 'onChange',
    defaultValues: EmptyPortafolioSortForm
  });

  const fields = HISTORY_ACTION_SORT_FIELDS;

  const applySortsHandler = (data: PortafolioSortForm): void => {
    onSort(data);
  }

  return (
    <CollapsibleLayout >
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
          <Button onClick={handleSubmit(applySortsHandler)}>Sort</Button>
          <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
        </Stack>
      </form>
    </CollapsibleLayout>
  );
}

export default HistoryActionSort;