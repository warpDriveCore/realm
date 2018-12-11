/* global document  */
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/main.scss';
import './utils/icons';
import App from './containers/App';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './utils/reducer';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  responseType: 'json'
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(axiosMiddleware(apiClient)))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app-root')
);
