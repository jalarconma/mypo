import React from 'react';

import ProtectedRoute from '../../core/components/ProtectedRoute';
import { AppRouteProps } from '../../core/interfaces/app-route-props';
import AllPortafolioHistoryPage from './pages/all-portafolio-history/AllPortafolioHistoryPage';

const History = () => (
  <ProtectedRoute><AllPortafolioHistoryPage /></ProtectedRoute>
);

const module: AppRouteProps = {
  routeProps: {
    exact: true,
    path: '/history',
    element: <History />
  },
  name: 'History',
};

export default module

