import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reduxThunk from 'redux-thunk';

import { Router, Route, Switch } from "react-router-dom";

import history from './utils/history'


import {Signin, Signup, RequireAuth} from './components/auth'
import {MessageSection} from './components/message'

import App from './components/app';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  ,document.querySelector('.app'));
