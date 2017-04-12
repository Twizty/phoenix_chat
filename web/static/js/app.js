// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import ReactDOM from 'react-dom';
import React from 'react';
import Home from './components/Home';
import Handshake from './components/Handshake';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Chat from './components/Chat';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import appReducer from './reducers'
import thunk from 'redux-thunk'

let store = createStore(combineReducers({app: appReducer, routing: routerReducer}), applyMiddleware(thunk))
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Handshake} />
      <Route path="/home" component={Home} />
      <Route path="/sign_in" component={SignIn} />
      <Route path="/register" component={Register} />
      <Route path="/chat/:name" component={Chat}/>
      <Route path="/chat" component={Chat}/>
    </Router>
  </Provider>,
  document.querySelector('#app')
);
// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
