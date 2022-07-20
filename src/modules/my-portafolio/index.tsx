import React from 'react';
import ProtectedRoute from '../../core/components/ProtectedRoute';
import { AppRouteProps } from '../../core/interfaces/app-route-props';
import PortafolioDetailsPage from './pages/portafolio-details/PortafolioDetailsPage';
import MyPortafolioPage from './pages/MyPortafolioPage';

const MyPortafolio = () => (
  <ProtectedRoute><MyPortafolioPage /></ProtectedRoute>
);

const PortafolioDetails = () => (
  <ProtectedRoute><PortafolioDetailsPage /></ProtectedRoute>
);

const module: AppRouteProps = {
  routeProps: {
    exact: true,
    path: '/my-portafolio',
    element: <MyPortafolio />
  },
  name: 'My Portafolio',
  pathChildren: [
    {
      routeProps: {
        path: '/my-portafolio/:symbolId/details',
        element: <PortafolioDetails />
      },
      name: 'My Portafolio details',
    }
  ]
};

export default module

