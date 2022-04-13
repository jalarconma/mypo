import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Amplify, DataStore } from 'aws-amplify';
import updatedAwsConfig from './amplify-config/amplify-config';
import GlobalServices from './core/components/GlobalServices';
import dataStoreConfigs from './amplify-config/datastore-config';

Amplify.configure(updatedAwsConfig);
DataStore.configure(dataStoreConfigs);

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalServices>
        <App />
      </GlobalServices>
    </React.StrictMode>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
