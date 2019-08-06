import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// https://phrase.com/blog/posts/react-i18n-best-libraries/
// npm install i18next react-i18next i18next-browser-languagedetector --save
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';

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
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
  document.getElementById('app'),
);
