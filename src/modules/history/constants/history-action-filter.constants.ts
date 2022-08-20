import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { PortafolioAction } from "../../../models";
import { PortafolioFieldType } from "../../../shared/enums/portafolio-field-type";
import { PortafolioFormField } from "../../../shared/interfaces/portafolio-form-field";

export const HISTORY_ACTION_FILTER_FIELD_NAME = {
  Symbol: 'symbol',
  Action: 'action',
  ActionDate: 'action_date',
  CreatedAt: 'createdAt',
  UpdatedAt: 'updatedAt'
};

export const PORTAFOLIO_ACTIONS: FormSelectorOption[] = [
  { id: '', label: 'Select an action'},
  { id: PortafolioAction.BUY, label: PortafolioAction.BUY },
  { id: PortafolioAction.SELL, label: PortafolioAction.SELL }
];

export const HISTORY_ACTION_FILTER_FIELDS: PortafolioFormField[] = [
  {
    name: HISTORY_ACTION_FILTER_FIELD_NAME.Symbol,
    label: 'Asset symbol',
    type: PortafolioFieldType.AUTOCOMPLETE_SELECTOR,
    multiple: true
  },
  {
    name: HISTORY_ACTION_FILTER_FIELD_NAME.Action,
    label: 'Action',
    type: PortafolioFieldType.AUTOCOMPLETE_SELECTOR,
    options: PORTAFOLIO_ACTIONS
  },
  {
    name: HISTORY_ACTION_FILTER_FIELD_NAME.ActionDate,
    label: 'Action date',
    type: PortafolioFieldType.DATE_RANGE,
  },
  {
    name: HISTORY_ACTION_FILTER_FIELD_NAME.CreatedAt,
    label: 'Created at',
    type: PortafolioFieldType.DATE_RANGE,
  },
  /*{
    name: HISTORY_ACTION_FILTER_FIELD_NAME.UpdatedAt,
    label: 'Updated at',
    type: PortafolioFieldType.DATE_RANGE,
  },*/
];