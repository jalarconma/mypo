import React from 'react';
import OverviewPage from './pages/OverviewPage';

const Overview = () => (
  <OverviewPage />
);

const module = {
  routeProps: {
      path: '/overview',
      element: <Overview />
  },
  name: 'Overview',
}

export default module;

