import { combineReducers } from 'redux'

import currentUserReduser from './currentUser'

const DEFAULT_STATE = {
  messages: [],
  currentUser: {}
}

function defaultReducer(state = DEFAULT_STATE) {
  return { ...state }
}

export default combineReducers({currentUser: currentUserReduser})
