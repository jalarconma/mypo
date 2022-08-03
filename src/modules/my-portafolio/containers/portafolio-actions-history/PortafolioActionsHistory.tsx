import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";

import { UserPortafolio } from "../../../../API";
import { usePortafolioHistoryService } from '../../../../core/hooks/use-portafolio-history-service';
import InfoContainer from "../../../../shared/components/info-container/InfoContainer";
import PortafolioHistoryItem from "../../components/portafolio-history-item/PortafolioHistoryItem";

interface Props {
  symbolId: string;
  onEditedPortafolio: () => void;
}

const PortafolioActionsHistory = ({ symbolId, onEditedPortafolio }: Props) => {

  const portafolioHistoryService = usePortafolioHistoryService();

  const navigate = useNavigate();

  const [userPortafolio, setUserPortafolio] = useState<UserPortafolio[]>([]);
  const firstUpdate = useRef<boolean>(true);

  useEffect(() => {
    fetchPortafolioHistory();
  }, []);

  useEffect(() => {

    if(firstUpdate.current) {
      return;
    }

    if(userPortafolio.length === 0) {
      navigate(`/my-portafolio`);
    }

  }, [userPortafolio]);

  const fetchPortafolioHistory = async () => {
    const userPortafolio = await portafolioHistoryService.getUserPortafolioBySymbolId(symbolId);

    if (!userPortafolio.data) {
      return;
    }

    setUserPortafolio(userPortafolio.data.listUserPortafolios.items);

    if(firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }

  const editPortafolioItemHandler = (editedAsset: UserPortafolio | undefined): void => {

    if(!editedAsset) {
      fetchPortafolioHistory();
      onEditedPortafolio();
      return;
    }

    const index = userPortafolio.findIndex(asset => asset.id === editedAsset.id);

    if(index === -1) {
      fetchPortafolioHistory();
      return;
    }

    const editedPortafolio = [...userPortafolio];
    editedPortafolio[index] = editedAsset;
    setUserPortafolio(editedPortafolio);
    onEditedPortafolio();
  }

  const deletePortafolioItemHandler = (deletedAsset: UserPortafolio | undefined): void => {
    
    if(!deletedAsset) {
      fetchPortafolioHistory();
      onEditedPortafolio();
      return;
    }

    const index = userPortafolio.findIndex(asset => asset.id === deletedAsset.id);

    if(index === -1) {
      fetchPortafolioHistory();
      onEditedPortafolio();
      return;
    }

    const editedPortafolio = [...userPortafolio];
    editedPortafolio.splice(index, 1);
    setUserPortafolio(editedPortafolio);
    onEditedPortafolio();
  }

  return (
    <Stack spacing={2}>
      {
        userPortafolio.map((asset: UserPortafolio) => (
          <InfoContainer key={asset.id}>
            <PortafolioHistoryItem asset={asset} onEdit={editPortafolioItemHandler} onDelete={deletePortafolioItemHandler}/>
          </InfoContainer>
        ))
      }
    </Stack>
  )
}

export default PortafolioActionsHistory;