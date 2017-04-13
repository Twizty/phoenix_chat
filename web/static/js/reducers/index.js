import { combineReducers } from 'redux'

import currentUserReduser from './currentUser'
import roomsReducer from './rooms'

export default combineReducers({currentUser: currentUserReduser, rooms: roomsReducer})
