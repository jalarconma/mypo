import React from 'react';
import ContactUsPage from './pages/ContactUsPage';

const ContactUs = () => (
  <ContactUsPage />
);

const module = {
  routeProps: {
    path: '/contact-us',
    element: <ContactUs />
  },
  name: 'Contact Us',
}; 

export default module

