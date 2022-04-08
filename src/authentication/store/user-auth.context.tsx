import { Auth, Hub } from 'aws-amplify';
import { createContext, FC, useEffect, useState } from 'react';

import { from, Observable } from 'rxjs'
import ServicesContextualizer from '../../core/contextualizers/services.contextualizer';
import ProvidedServices from '../../core/enums/provided-services.enum';
import { UserAuthService } from '../interfaces/user-auth.interface';
import { User } from '../models/user.model';

export const UserAuthContext = ServicesContextualizer.createContext(ProvidedServices.UserAuthServiceImpl);

const UserAuthServiceImpl: FC = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userService: UserAuthService = {
    isLoggedIn,
    getUser(): Observable<User> {
      return from(Auth.currentAuthenticatedUser());
    }
  }

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          console.log('user is logged in');
          setIsLoggedIn(true);
          break;
        case 'signOut':
          console.log('user is logged out');
          setIsLoggedIn(false);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          setIsLoggedIn(false);
          console.log('Sign in failure', data);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <UserAuthContext.Provider value={userService}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthServiceImpl;