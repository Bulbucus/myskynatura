import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {Provider as ReduxProvider} from 'react-redux';

// css
import './index.css';

import store from './redux/store';
import App from './App';


ReactDOM.render(
  <ReduxProvider store={store}>
  <CookiesProvider>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </CookiesProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
