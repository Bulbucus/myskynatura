import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {Provider as ReduxProvider} from 'react-redux';

// css
import './index.css';
//redux
import store from './redux/store';
//Componentes
import App from './App';
import ScrollToTop from "./util/ScrollToTop";


ReactDOM.render(
  <ReduxProvider store={store}>
  <CookiesProvider>
    <React.StrictMode>
      <Router>
        <ScrollToTop/>
        <App />
      </Router>
    </React.StrictMode>
  </CookiesProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
