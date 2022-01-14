import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './components/App';

import { UserProvider } from './hooks/useUser';

import reportWebVitals from './reportWebVitals';

import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
