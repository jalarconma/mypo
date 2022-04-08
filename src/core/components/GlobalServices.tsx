import { FC } from "react";
import UserAuthServiceImpl from "../../authentication/store/user-auth.context";

const GlobalServices: FC = ({ children }) => {
  return (
    <UserAuthServiceImpl>
      { children }
    </UserAuthServiceImpl>
  );

}

export default GlobalServices;