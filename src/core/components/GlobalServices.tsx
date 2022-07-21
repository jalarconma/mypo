import React, { FC } from "react";
import UserAuthServiceImpl from "../../authentication/store/user-auth.context";
import PortafolioHistoryServiceImpl from "../api/portafolio-history.api";
import RegisterPortafolioServiceImpl from "../api/register-portafolio.api";
import UserPortafolioListServiceImpl from "../api/user-portafolio-list.api";

const GlobalServices: FC = ({ children }) => {
  return (
    <UserAuthServiceImpl>
      <RegisterPortafolioServiceImpl>
        <UserPortafolioListServiceImpl>
          <PortafolioHistoryServiceImpl>
            {children}
          </PortafolioHistoryServiceImpl>
        </UserPortafolioListServiceImpl>
      </RegisterPortafolioServiceImpl>
    </UserAuthServiceImpl>
  );

}

export default GlobalServices;