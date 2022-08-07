import React, { FC, useEffect, useState } from 'react';

import { Auth, Hub } from 'aws-amplify';
import { ICredentials } from '@aws-amplify/core/lib/types';

import { catchError, firstValueFrom, from, map, Observable, throwError } from 'rxjs'

import ServicesContextualizer from '../../core/contextualizers/services.contextualizer';
import ProvidedServices from '../../core/enums/provided-services.enum';
import { UserAuthService } from '../interfaces/user-auth.interface';
import { User } from '../models/user.model';

export const UserAuthContext = ServicesContextualizer.createContext(ProvidedServices.UserAuthServiceImpl);

const UserAuthServiceImpl: FC = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userService: UserAuthService = {
    isLoggedIn,
    currentUser,
    getUser(): Observable<User> {
      setLoading(true);
      const result = from(Auth.currentUserInfo()).pipe(
        map(user => user ? {...user.attributes, username: user.username} : null)
      );
      result.pipe(
        catchError((err) => {
          setLoading(false);
          return throwError(() => new Error(err));
        })
      );
      result.subscribe(() => setLoading(false));
      return result
    },
    getLoading(): boolean {
      return loading;
    },
    login(): Promise<ICredentials> {
      setLoading(true);
      const result = Auth.federatedSignIn();

      result.then(() => setLoading(false)).catch((err) => {
        setLoading(false)
        throw new Error(err);
      });

      return result;
    },
    logout(): Promise<any> {
      setLoading(true);
      const result =  Auth.signOut();
      result.then(() => setLoading(false)).catch((err) => {
        setLoading(false)
        throw new Error(err);
      });
      return result;
    },
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

      setLoading(false);
    });

    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          console.log('user is logged in');
          const user = await firstValueFrom(userService.getUser());
          setIsLoggedIn(true);
          setCurrentUser(user);
          break;
        case 'signOut':
          console.log('user is logged out');
          setIsLoggedIn(false);
          setCurrentUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          setIsLoggedIn(false);
          setCurrentUser(null);
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