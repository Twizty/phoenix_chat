
import React from 'react';
import Home from '../components/Home';
import Handshake from '../components/Handshake';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import Chat from '../components/Chat';
import Chats from '../components/Chats.jsx';
import { connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import appReducer from '../reducers'
import thunk from 'redux-thunk'

import { makeHandshake, signOutUser } from './actions'

export const store = createStore(combineReducers({app: appReducer, routing: routerReducer}), applyMiddleware(thunk))
const history = syncHistoryWithStore(browserHistory, store)

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(makeHandshake())
  }

  handleSignOut = () => {
    this.props.dispatch(signOutUser())
  }

  renderHeader() {
    if (this.props.currentUser && this.props.currentUser.name) {
      return (
        <div className="app-header">
          <span>Hello, {this.props.currentUser.name}</span>
          <button onClick={this.handleSignOut} className="btn">Sign out</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="app-wrapper">
        {this.renderHeader()}
        <Router history={history}>
          <Route path="/" component={Handshake} />
          <Route path="/home" component={Home} />
          <Route path="/sign_in" component={SignIn} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:name" component={Chat}/>
          <Route path="/chat" component={Chats}/>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.app.currentUser.entity
  }
}

export default connect(mapStateToProps)(App)
