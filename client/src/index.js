import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './index.css';
import App from './App';

ReactDOM.render(
  <CookiesProvider>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </CookiesProvider>,
  document.getElementById('root')
);
