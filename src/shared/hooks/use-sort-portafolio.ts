import { useCallback, useEffect, useState } from "react";

import { UserPortafolio } from "../../API";
import { PortafolioSortType } from "../enums/portafolio-sort-type";
import { PortafolioSortForm } from "../interfaces/portafolio-sort-form";

interface UseSortPortafolio {
  portafolio: UserPortafolio[];
  setAllPortafolio: React.Dispatch<React.SetStateAction<UserPortafolio[]>>;
  setSort: React.Dispatch<React.SetStateAction<PortafolioSortForm>>;
  processSort: (sort: PortafolioSortForm) => void;
}

const useSortPortafolio = (initialSort: PortafolioSortForm): UseSortPortafolio => {
  const [portafolio, setPortafolio] = useState<UserPortafolio[]>([]);
  const [allPortafolio, setAllPortafolio] = useState<UserPortafolio[]>([]);
  const [ sort, setSort ] = useState<PortafolioSortForm>(initialSort);

  useEffect(() => {
    processSort();
  }, [allPortafolio]);

  useEffect(() => {
    processSort();
  }, [sort]);

  const compareBySortType = ( sortType: PortafolioSortType, compareFn: () => number) => {

    switch(sortType) {
      case PortafolioSortType.ASC:
        return compareFn();
      case PortafolioSortType.DESC:
        return -1 * compareFn();
      default:
        return compareFn();
    }
  }

  const compareDates = (sortType: PortafolioSortType, dateA: Date, dateB: Date): number => {
    const compareFn = () => dateA.getTime() - dateB.getTime();
    return compareBySortType(sortType, compareFn);
  }

  const processSort = useCallback((): void => {
    const sortedPortafolio = [...allPortafolio];

    sortedPortafolio.sort( (portafolioA, portafolioB) => {

      let symbolComparison = 0;
      let actionComparison = 0;
      let actionDateComparison = 0;
      let createdAtComparison = 0;
      let updatedAtComparison = 0;
      
      if(sort.symbol) {
        const compareFn = () => portafolioA.symbol.displaySymbol.localeCompare(portafolioB.symbol.displaySymbol);
        symbolComparison = compareBySortType(sort.symbol, compareFn)
      }

      if(sort.action) {
        const compareFn = () => portafolioA.action.localeCompare(portafolioB.action);
        actionComparison = compareBySortType(sort.action, compareFn)
      }

      if(sort.action_date) {
        actionDateComparison = compareDates(sort.action_date, new Date(portafolioA.action_date), new Date(portafolioB.action_date));
      }

      if(sort.createdAt) {
        createdAtComparison = compareDates(sort.createdAt, new Date(portafolioA.createdAt), new Date(portafolioB.createdAt));
      }

      if(sort.updatedAt) {
        updatedAtComparison = compareDates(sort.updatedAt, new Date(portafolioA.updatedAt), new Date(portafolioB.updatedAt));
      }

      return createdAtComparison || updatedAtComparison || actionDateComparison || symbolComparison || actionComparison;
    });

    setPortafolio(sortedPortafolio);
  }, [allPortafolio, sort]);

  return { portafolio, setAllPortafolio, setSort, processSort };
}

export default useSortPortafolio;