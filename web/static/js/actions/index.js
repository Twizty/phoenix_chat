import axios from 'axios'
import * as types from '../constants'

export function registerUser(data) {
  return (dispatch) => {
    dispatch({type: types.REGISTER_USER_REQUEST})
    axios({
      method: 'post',
      url: '/api/register',
      data
    }).then(response => dispatch({type: types.REGISTER_USER_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.REGISTER_USER_FAILURE, errors: errors.response.data}))
  }
}

export function clearRooms() {
  return {
    type: types.CLEAR_ROOMS
  }
}

export function scrollMessages(conversationName, lastMessageId) {
  return (dispatch) => {
    dispatch({type: types.SCROLL_ROOM_REQUEST})
    axios({
      method: 'get',
      url: `/api/rooms/${conversationName}?last_message_id=${lastMessageId}`,
    }).then(response => dispatch({type: types.SCROLL_ROOM_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.SCROLL_ROOM_FAILURE, errors: errors.response.data}))
  }
}

export function makeHandshake() {
  return (dispatch) => {
    dispatch({type: types.HANDSHAKE_REQUEST})
    axios({
      method: 'get',
      url: '/api/handshake'
    }).then(response => dispatch({type: types.HANDSHAKE_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.HANDSHAKE_FAILURE, errors: errors.response.data}))
  }
}

export function signInUser(data) {
  return (dispatch) => {
    dispatch({type: types.SIGN_IN_USER_REQUEST})
    axios({
      method: 'post',
      url: '/api/sign_in',
      data
    }).then(response => dispatch({type: types.SIGN_IN_USER_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.SIGN_IN_USER_FAILURE, errors: errors.response.data}))
  }
}

export function signOutUser(data) {
  return (dispatch) => {
    dispatch({type: types.SIGN_OUT_USER_REQUEST})
    axios({
      method: 'delete',
      url: '/api/sign_out',
      data
    }).then(response => dispatch({type: types.SIGN_OUT_USER_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.SIGN_OUT_USER_FAILURE, errors: errors.response.data}))
  }
}

export function fetchRoom(conversationName) {
  return (dispatch) => {
    dispatch({type: types.FETCH_ROOM_REQUEST})
    axios({
      method: 'get',
      url: `/api/rooms/${conversationName}`,
    }).then(response => dispatch({type: types.FETCH_ROOM_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.FETCH_ROOM_FAILURE, errors: errors.response.data}))
  }
}

export function fetchRooms(filter) {
  return (dispatch) => {
    dispatch({type: types.FETCH_ROOMS_REQUEST})
    axios({
      method: 'get',
      url: `/api/rooms/?name=${filter}`,
    }).then(response => dispatch({type: types.FETCH_ROOMS_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.FETCH_ROOMS_FAILURE, errors: errors.response.data}))
  }
}

export function addMessage(conversationName, data) {
  return (dispatch) => {
    dispatch({type: types.ADD_MESSAGE_REQUEST})
    axios({
      method: 'post',
      url: `/api/${conversationName}/messages`,
      data: {
        body: data
      }
    }).then(response => dispatch({type: types.ADD_MESSAGE_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.ADD_MESSAGE_FAILURE, errors: errors.response.data}))
  }
}

export function clearUserErrors() {
  return { type: types.CLEAR_USER_ERRORS }
}

export function addMessageFromSocket(message) {
  return {
    type: types.ADD_MESSAGE_FROM_SOCKET,
    message
  }
}

export function clearRoom() {
  return {
    type: types.CLEAR_ROOM
  }
}
