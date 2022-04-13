import React from 'react';
import SignOutPage from './pages/SignOutPage';

const SignOut = () => (
  <SignOutPage />
);

const module = {
  routeProps: {
    path: '/sign-out',
    element: <SignOut />
  },
  name: 'Sign Out',
}; 

export default module

