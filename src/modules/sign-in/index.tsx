import React from 'react';
import { AppRouteProps } from '../../core/interfaces/app-route-props';
import SignInPage from './pages/SignInPage';

const SignIn = () => (
  <SignInPage />
);

const module: AppRouteProps = {
  routeProps: {
    path: '/sign-in',
    element: <SignIn />
  },
  name: 'Sign In',
}; 

export default module

