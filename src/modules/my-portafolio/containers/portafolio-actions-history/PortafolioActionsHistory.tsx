import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";

import { usePortafolioHistoryService } from '../../../../core/hooks/use-portafolio-history-service';
import { UserPortafolio } from "../../../../models";
import AlertDialog from "../../../../shared/components/alert-dialog/AlertDialog";
import InfoContainer from "../../../../shared/components/info-container/InfoContainer";
import PortafolioHistoryItem from "../../components/portafolio-history-item/PortafolioHistoryItem";

interface Props {
  symbolId: string
}

const PortafolioActionsHistory = ({ symbolId }: Props) => {

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

  const handleEditPortafolioItem = (): void => {
    fetchPortafolioHistory();
  }

  return (
    <Stack spacing={2}>
      {
        userPortafolio.map((asset: UserPortafolio) => (
          <InfoContainer key={asset.id}>
            <PortafolioHistoryItem asset={asset} onEdit={handleEditPortafolioItem}/>
          </InfoContainer>
        ))
      }
    </Stack>
  )
}

export default PortafolioActionsHistory;