import React, { useCallback, useEffect, useState } from "react";

import { PortafolioAction, UserPortafolio } from "../../API";
import { DateRange } from "../interfaces/portafolio-date-range";
import { PortafolioFilterForm } from "../interfaces/portafolio-filter-form";
import { DateUtils } from "../utils/date-utils";

interface UseFilterPortafolio {
  portafolio: UserPortafolio[];
  setAllPortafolio: React.Dispatch<React.SetStateAction<UserPortafolio[]>>;
  setFilter: React.Dispatch<React.SetStateAction<PortafolioFilterForm>>;
  processFilter: (filters: PortafolioFilterForm) => void;
}

const useFilterPortafolio = (initialFilter: PortafolioFilterForm): UseFilterPortafolio => {
  const [portafolio, setPortafolio] = useState<UserPortafolio[]>([]);
  const [allPortafolio, setAllPortafolio] = useState<UserPortafolio[]>([]);
  const [ filter, setFilter ] = useState<PortafolioFilterForm>(initialFilter);

  useEffect(() => {
    processFilter();
  }, [allPortafolio]);

  useEffect(() => {
    processFilter();
  }, [filter]);

  const getDateRangeFilterPredicate = (dateToFilter: Date | string, dateRange: DateRange): [boolean, boolean] => {

    let hasMinDate = true;
    let hasMaxDate = true;

    const itemDate = typeof dateToFilter === 'string' ? DateUtils.stringDateToUTCmilliseconds(dateToFilter) : 
    DateUtils.dateToUTCmilliseconds(dateToFilter);

    if (dateRange[0]) {
      const dateFrom = DateUtils.dateToUTCmilliseconds(dateRange[0]);
      hasMinDate = itemDate >= dateFrom;
    }

    if (dateRange[1]) {
      const createdAtTo = DateUtils.dateToUTCmilliseconds(dateRange[1]);
      hasMaxDate = itemDate <= createdAtTo;
    }

    return [hasMinDate, hasMaxDate];
  }

  const processFilter = useCallback((): void => {

    if(!filter) {
      setPortafolio(allPortafolio);
      return;
    }

    console.log('all portafolio: ', allPortafolio);
    
    const filteredPortafolio = allPortafolio.filter(item => {

      let hasSymbol = true;
      let hasAction = true;

      const [hasMinCreatedAtDate, hasMaxCreatedAtDate] = getDateRangeFilterPredicate(item.createdAt, filter.createdAt);

      const [hasMinUpdatedAtDate, hasMaxUpdatedAtDate] = getDateRangeFilterPredicate(item.updatedAt, filter.updatedAt);

      const [hasMinActionDate, hasMaxActionDate] = getDateRangeFilterPredicate(item.action_date, filter.action_date);

      if (filter.symbol.length > 0) {
        hasSymbol = filter.symbol.findIndex(symbol => symbol.id === item.symbol.id) !== -1
      }

      if (filter.action && filter.action.id) {
        hasAction = item.action === PortafolioAction[filter.action.id];
      }

      return hasSymbol && hasAction && hasMinCreatedAtDate && hasMaxCreatedAtDate
        && hasMinUpdatedAtDate && hasMaxUpdatedAtDate && hasMinActionDate && hasMaxActionDate;
    });

    setPortafolio(filteredPortafolio);
  }, [allPortafolio, filter]);

  return { portafolio, setAllPortafolio, setFilter, processFilter };
}

export default useFilterPortafolio;