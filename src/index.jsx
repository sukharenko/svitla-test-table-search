import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.css';

import * as reducers from './store/reducers';

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
    /* eslint no-underscore-dangle: 0 */
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
