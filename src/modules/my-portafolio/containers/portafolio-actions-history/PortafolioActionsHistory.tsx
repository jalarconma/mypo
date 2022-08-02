import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";

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

  const [userPortafolio, setUserPortafolio] = useState<UserPortafolio[]>([]);

  useEffect(() => {
    fetchPortafolioHistory();
  }, []);

  const fetchPortafolioHistory = async () => {
    const userPortafolio = await portafolioHistoryService.getUserPortafolioBySymbolId(symbolId);

    if (!userPortafolio.data) {
      return;
    }

    setUserPortafolio(userPortafolio.data.listUserPortafolios.items);
  }

  const editPortafolioItemHandler = (): void => {
    fetchPortafolioHistory();
    onEditedPortafolio();
  }

  const deletePortafolioItemHandler = (): void => {
    fetchPortafolioHistory();
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