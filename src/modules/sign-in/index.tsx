import React from 'react';
import SignInPage from './pages/SignInPage';

const SignIn = () => (
  <SignInPage />
);

const module = {
  routeProps: {
    path: '/sign-in',
    element: <SignIn />
  },
  name: 'Sign In',
}; 

export default module

