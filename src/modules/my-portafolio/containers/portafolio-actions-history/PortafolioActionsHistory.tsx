import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";

import { usePortafolioHistoryService } from '../../../../core/hooks/use-portafolio-history-service';
import { UserPortafolio } from "../../../../models";
import InfoContainer from "../../../../shared/components/info-container/InfoContainer";
import PortafolioHistoryItem from "../../../../shared/components/portafolio-history-item/PortafolioHistoryItem";

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

  return (
    <Stack spacing={2}>
      {
        userPortafolio.map((asset: UserPortafolio) => (
          <InfoContainer key={asset.id}>
            <PortafolioHistoryItem asset={asset} />
          </InfoContainer>
        ))
      }
    </Stack>
  )
}

export default PortafolioActionsHistory;