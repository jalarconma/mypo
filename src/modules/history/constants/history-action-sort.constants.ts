import { PortafolioFieldType } from "../../../shared/enums/portafolio-field-type";
import { PortafolioSortType } from "../../../shared/enums/portafolio-sort-type";
import { PortafolioFormField } from "../../../shared/interfaces/portafolio-form-field";
import { ToggleSelectorOption } from "../../../shared/interfaces/ToggleSelectorOption";

export const HISTORY_ACTION_SORT_FIELD_NAME = {
  Symbol: 'symbol',
  Action: 'action',
  ActionDate: 'action_date',
  CreatedAt: 'createdAt',
  UpdatedAt: 'updatedAt'
};

export const PORTAFOLIO_SORT_TOGGLE_ACTIONS: ToggleSelectorOption[] = [
  { value: PortafolioSortType.ASC, label: PortafolioSortType.ASC, selectionColor: 'primary' },
  { value: PortafolioSortType.DESC, label: PortafolioSortType.DESC, selectionColor: 'primary' }
];

export const HISTORY_ACTION_SORT_FIELDS: PortafolioFormField[] = [
  {
    name: HISTORY_ACTION_SORT_FIELD_NAME.Symbol,
    label: 'Asset symbol',
    type: PortafolioFieldType.TOGGLE,
    options: PORTAFOLIO_SORT_TOGGLE_ACTIONS
  },
  {
    name: HISTORY_ACTION_SORT_FIELD_NAME.Action,
    label: 'Action',
    type: PortafolioFieldType.TOGGLE,
    options: PORTAFOLIO_SORT_TOGGLE_ACTIONS
  },
  {
    name: HISTORY_ACTION_SORT_FIELD_NAME.ActionDate,
    label: 'Action date',
    type: PortafolioFieldType.TOGGLE,
    options: PORTAFOLIO_SORT_TOGGLE_ACTIONS
  },
  {
    name: HISTORY_ACTION_SORT_FIELD_NAME.CreatedAt,
    label: 'Created at',
    type: PortafolioFieldType.TOGGLE,
    options: PORTAFOLIO_SORT_TOGGLE_ACTIONS
  },
  /*{
    name: HISTORY_ACTION_SORT_FIELD_NAME.UpdatedAt,
    label: 'Last Updated',
    type: PortafolioFieldType.TOGGLE,
    options: PORTAFOLIO_SORT_TOGGLE_ACTIONS
  },*/
];