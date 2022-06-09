import React from 'react';
import ProtectedRoute from '../../core/components/ProtectedRoute';
import ContactUsPage from './pages/ContactUsPage';

const ContactUs = () => (
  <ProtectedRoute><ContactUsPage /></ProtectedRoute>
);

const module = {
  routeProps: {
    path: '/contact-us',
    element: <ContactUs />
  },
  name: 'Contact Us',
}; 

export default module

