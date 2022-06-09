import React from 'react';
import ProtectedRoute from '../../core/components/ProtectedRoute';
import OverviewPage from './pages/OverviewPage';

const Overview = () => (
  <ProtectedRoute><OverviewPage /></ProtectedRoute>
);

const module = {
  routeProps: {
      path: '/overview',
      element: <Overview />
  },
  name: 'Overview',
}

export default module;

