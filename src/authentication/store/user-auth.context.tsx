import { Auth, DataStore, Hub } from 'aws-amplify';
import { createContext, FC, useEffect, useState } from 'react';

import { from, Observable } from 'rxjs'
import { syncDataStore } from '../../amplify-config/datastore-config';
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
      return from(Auth.currentUserInfo());
    }
  }

  useEffect(() => {
    userService.getUser().subscribe(user => {
      console.log('current user session: ', user);

      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          console.log('user is logged in');
          await syncDataStore();
          setIsLoggedIn(true);
          break;
        case 'signOut':
          console.log('user is logged out');
          await syncDataStore();
          setIsLoggedIn(false);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          setIsLoggedIn(false);
          await syncDataStore();
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