import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { homeModule } from "../../modules";
import { ProtectedRouteState } from "../../shared/interfaces/protected-route-state";
import { useUserAuthService } from "./use-user-auth-service";

const intendUrlPropertyName = 'mypo-intended-url';

const useRedirectIntendedUrl = (): void => {
  const userAuthService = useUserAuthService();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const routeState = location.state as ProtectedRouteState;
    const homePath = homeModule.routeProps.path;

    if(routeState && !localStorage.getItem(intendUrlPropertyName) && routeState.prevRoute.pathname !== homePath) {
      localStorage.setItem(intendUrlPropertyName, routeState.prevRoute.pathname);
    }

    userAuthService.getUser().subscribe(user => {

      if(!user) {
        return;
      }

      const intendedURL = localStorage.getItem(intendUrlPropertyName);

      if(intendedURL) {
        navigate(intendedURL);
        localStorage.removeItem(intendUrlPropertyName);
      } else {
        navigate(homeModule.routeProps.path);
      }

    });
  }, []);
}

export default useRedirectIntendedUrl;