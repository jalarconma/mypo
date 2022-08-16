import { useEffect, useState } from "react";
import { UserPortafolio } from "../../API";
import { usePortafolioHistoryService } from "../../core/hooks/use-portafolio-history-service";
import { PortafolioFilterForm } from "../interfaces/portafolio-filter-form";
import useFilterPortafolio from "./use-filter-portafolio";

const useManagePortafolio = (symbolId: string | undefined) => {
  const [processedPortafolio, setProcessedPortafolio] = useState<UserPortafolio[]>([]);
  const [allPortafolio, setAllPortafolio] = useState<UserPortafolio[]>([]);

  const { portafolio: filteredPortafolio, setAllPortafolio: setFilterPortafolio, setFilter } = useFilterPortafolio({
    action: {id: '', label: ''},
    action_date: [null, null],
    symbol: [],
    createdAt: [null, null],
    updatedAt: [null, null],
  });

  const portafolioHistoryService = usePortafolioHistoryService();

  useEffect(() => {
    setProcessedPortafolio(filteredPortafolio);
  }, [filteredPortafolio])

  const onFilter = (filter: PortafolioFilterForm): void => {
    setFilter(filter);
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

    onAllPortafolioChange(result.data.listUserPortafolios.items);
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

  return { processedPortafolio, allPortafolio, onFilter, onEditedPortafolio, onDeletedPortafolioItem, fetchPortafolio };
}

export default useManagePortafolio;