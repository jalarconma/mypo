import { PortafolioSortType } from "../enums/portafolio-sort-type";

export interface PortafolioSortForm {
  action: PortafolioSortType | '',
  action_date: PortafolioSortType | '',
  symbol: PortafolioSortType | '',
  createdAt: PortafolioSortType | '',
  updatedAt: PortafolioSortType | '',
}

export const EmptyPortafolioSortForm: PortafolioSortForm = {
  action: '',
  action_date: '',
  symbol: '',
  createdAt: '',
  updatedAt: ''
}

