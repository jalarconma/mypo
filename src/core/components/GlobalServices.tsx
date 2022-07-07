import { FC } from "react";
import UserAuthServiceImpl from "../../authentication/store/user-auth.context";
import RegisterPortafolioServiceImpl from "../api/register-portafolio.api";

const GlobalServices: FC = ({ children }) => {
  return (
    <UserAuthServiceImpl>
      <RegisterPortafolioServiceImpl>
        { children }
      </RegisterPortafolioServiceImpl>
    </UserAuthServiceImpl>
  );

}

export default GlobalServices;