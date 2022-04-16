import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from './auth/use-auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProvideAuth>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </ProvideAuth>
  </React.StrictMode >
);

reportWebVitals();
