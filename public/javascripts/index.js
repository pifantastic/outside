import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {Provider} from 'react-redux';
import App from './containers/app';

const middleware = [thunk, createLogger()];

const store = createStore(reducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
