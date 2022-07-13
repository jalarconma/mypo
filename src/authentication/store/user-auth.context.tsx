import { Auth, Hub } from 'aws-amplify';
import React, { FC, useEffect, useState } from 'react';

import { firstValueFrom, from, map, Observable } from 'rxjs'
import { syncDataStore } from '../../amplify-config/datastore-config';
import ServicesContextualizer from '../../core/contextualizers/services.contextualizer';
import ProvidedServices from '../../core/enums/provided-services.enum';
import { UserAuthService } from '../interfaces/user-auth.interface';
import { User } from '../models/user.model';

export const UserAuthContext = ServicesContextualizer.createContext(ProvidedServices.UserAuthServiceImpl);

const UserAuthServiceImpl: FC = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const userService: UserAuthService = {
    isLoggedIn,
    currentUser,
    getUser(): Observable<User> {
      return from(Auth.currentUserInfo()).pipe(
        map(user => user ? {...user.attributes, username: user.username} : null)
      );
    }
  }

  useEffect(() => {
    userService.getUser().subscribe(user => {
      console.log('current user session: ', user);

      if(user) {
        setIsLoggedIn(true);
        setCurrentUser(user)
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });

    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          console.log('user is logged in');
          await syncDataStore();
          const user = await firstValueFrom(userService.getUser());
          setIsLoggedIn(true);
          setCurrentUser(user);
          break;
        case 'signOut':
          console.log('user is logged out');
          //await syncDataStore();
          setIsLoggedIn(false);
          setCurrentUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          setIsLoggedIn(false);
          setCurrentUser(null);
          //await syncDataStore();
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