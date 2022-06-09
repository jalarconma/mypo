import React from 'react';
import ProtectedRoute from '../../core/components/ProtectedRoute';
import MyPortafolioPage from './pages/MyPortafolioPage';

const MyPortafolio = () => (
  <ProtectedRoute><MyPortafolioPage /></ProtectedRoute>
);

const module = {
  routeProps: {
    path: '/my-portafolio',
    element: <MyPortafolio />
  },
  name: 'My Portafolio',
};

export default module

