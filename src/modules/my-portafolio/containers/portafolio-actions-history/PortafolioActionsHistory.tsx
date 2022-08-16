import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";

import { UserPortafolio } from "../../../../API";
import InfoContainer from "../../../../shared/components/info-container/InfoContainer";
import PortafolioHistoryItem from "../../components/portafolio-history-item/PortafolioHistoryItem";

import useManagePortafolio from '../../../../shared/hooks/use-manage-portafolio';

interface Props {
  symbolId: string;
  onEditedPortafolio: () => void;
}

const PortafolioActionsHistory = ({ symbolId, onEditedPortafolio }: Props) => {

  const { 
    processedPortafolio,
    allPortafolio, 
    onEditedPortafolio: editedPortafolioHandler, 
    onDeletedPortafolioItem, fetchPortafolio } = useManagePortafolio(symbolId);

  const navigate = useNavigate();

  const firstUpdate = useRef<boolean>(true);

  useEffect(() => {
    fetchPortafolioHistory();
  }, []);

  useEffect(() => {

    if(firstUpdate.current) {
      return;
    }

    if(allPortafolio.length === 0) {
      navigate(`/my-portafolio`);
    }

  }, [allPortafolio]);

  const fetchPortafolioHistory = async () => {
    await fetchPortafolio();

    if(firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }

  const editPortafolioItemHandler = (editedAsset: UserPortafolio | undefined): void => {
    editedPortafolioHandler(editedAsset);
    onEditedPortafolio();
  }

  const deletePortafolioItemHandler = (deletedAsset: UserPortafolio | undefined): void => {
    onDeletedPortafolioItem(deletedAsset);
    onEditedPortafolio();
  }

  return (
    <Stack spacing={2}>
      {
        processedPortafolio.map((asset: UserPortafolio) => (
          <InfoContainer key={asset.id}>
            <PortafolioHistoryItem asset={asset} onEdit={editPortafolioItemHandler} onDelete={deletePortafolioItemHandler}/>
          </InfoContainer>
        ))
      }
    </Stack>
  )
}

export default PortafolioActionsHistory;