import React from 'react';
import MyPortafolioPage from './pages/MyPortafolioPage';

const MyPortafolio = () => (
  <MyPortafolioPage />
);

const module = {
  routeProps: {
    path: '/my-portafolio',
    element: <MyPortafolio />
  },
  name: 'My Portafolio',
};

export default module

