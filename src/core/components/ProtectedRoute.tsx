import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = '/', children }) => {
  useEffect(() => {
    getData();
  }, []);

  const [ user, setUser ] = useState(null);

  const getData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;