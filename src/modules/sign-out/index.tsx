import React from 'react';
import ProtectedRoute from '../../core/components/ProtectedRoute';
import SignOutPage from './pages/SignOutPage';

const SignOut = () => (
  <ProtectedRoute><SignOutPage /></ProtectedRoute>
);

const module = {
  routeProps: {
    path: '/sign-out',
    element: <SignOut />
  },
  name: 'Sign Out',
}; 

export default module

