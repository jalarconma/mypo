import { useEffect, useState } from "react";
import { UserPortafolio } from "../../API";
import { usePortafolioHistoryService } from "../../core/hooks/use-portafolio-history-service";
import { PortafolioAdapter } from "../adapters/portafolio-adapter";
import { EmptyPortafolioFilterForm, PortafolioFilterForm } from "../interfaces/portafolio-filter-form";
import { EmptyPortafolioSortForm, PortafolioSortForm } from "../interfaces/portafolio-sort-form";
import useFilterPortafolio from "./use-filter-portafolio";
import useSortPortafolio from "./use-sort-portafolio";

const useManagePortafolio = (symbolId: string | undefined) => {
  const [processedPortafolio, setProcessedPortafolio] = useState<UserPortafolio[]>([]);
  const [allPortafolio, setAllPortafolio] = useState<UserPortafolio[]>([]);

  const { portafolio: filteredPortafolio, setAllPortafolio: setFilterPortafolio, setFilter } = useFilterPortafolio(EmptyPortafolioFilterForm);

  const { portafolio: sortedPortafolio, setAllPortafolio: setSortPortafolio, setSort } = useSortPortafolio(EmptyPortafolioSortForm)

  const portafolioHistoryService = usePortafolioHistoryService();

  useEffect(() => {
    setSortPortafolio(filteredPortafolio);
  }, [filteredPortafolio]);

  useEffect(() => {
    setProcessedPortafolio(sortedPortafolio);
  }, [sortedPortafolio]);

  const onFilter = (filter: PortafolioFilterForm): void => {
    setFilter(filter);
  }

  const onSort = (sort: PortafolioSortForm): void => {
    setSort(sort);
  }

  const fetchPortafolio = async () => {
    let result;

    if(symbolId) {
      result = await portafolioHistoryService.getUserPortafolioBySymbolId(symbolId);
    } else {
      result = await portafolioHistoryService.getUserPortafolio();
    }
    
    if (!result.data) {
      return;
    }

    const portafolio = PortafolioAdapter.portafolioActionDateAdapter(result.data.listUserPortafolios.items);
    onAllPortafolioChange(portafolio);
  }

  const onEditedPortafolio = (editedAsset: UserPortafolio | undefined): void  => {
    if(!editedAsset) {
      fetchPortafolio();
      return;
    }

    const index = allPortafolio.findIndex(asset => asset.id === editedAsset.id);

    if(index === -1) {
      fetchPortafolio();
      return;
    }

    const editedPortafolio = [...allPortafolio];
    editedPortafolio[index] = editedAsset;
    onAllPortafolioChange(editedPortafolio);
  }

  const onDeletedPortafolioItem = (deletedAsset: UserPortafolio | undefined): void => {
    
    if(!deletedAsset) {
      fetchPortafolio();
      return;
    }

    const index = allPortafolio.findIndex(asset => asset.id === deletedAsset.id);

    if(index === -1) {
      fetchPortafolio();
      return;
    }

    const editedPortafolio = [...allPortafolio];
    editedPortafolio.splice(index, 1);
    onAllPortafolioChange(editedPortafolio);
  }

  const onAllPortafolioChange = (portafolio: UserPortafolio[]): void => {
    setAllPortafolio(portafolio);
    setFilterPortafolio(portafolio);
  }

  return { processedPortafolio, allPortafolio, onFilter, onSort, onEditedPortafolio, onDeletedPortafolioItem, fetchPortafolio };
}

export default useManagePortafolio;