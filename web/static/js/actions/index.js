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
      .catch(errors => dispatch({type: types.REGISTER_USER_FAILURE, errors}))
  }
}

export function makeHandshake() {
  return (dispatch) => {
    dispatch({type: types.HANDSHAKE_REQUEST})
    axios({
      method: 'get',
      url: '/api/handshake'
    }).then(response => dispatch({type: types.HANDSHAKE_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.HANDSHAKE_FAILURE, errors}))
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
      .catch(errors => dispatch({type: types.SIGN_IN_USER_FAILURE, errors}))
  }
}

export function signOutUser(data) {
  return (dispatch, getState) => {
    dispatch({type: types.SIGN_OUT_USER_REQUEST})
    axios({
      method: 'delete',
      url: '/api/sign_out',
      data
    }).then(response => dispatch({type: types.SIGN_OUT_USER_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.SIGN_OUT_USER_FAILURE, errors}))
  }
}

export function fetchMessages(conversationName) {
  return (dispatch, getState) => {
    dispatch({type: types.MESSAGES_REQUEST})
    axios({
      method: 'get',
      url: `/api/${conversationName}/messages`,
    }).then(response => dispatch({type: types.MESSAGES_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.MESSAGES_FAILURE, errors}))
  }
}

export function addMessage(conversationName, data) {
  return (dispatch, getState) => {
    dispatch({type: types.MESSAGES_REQUEST})
    axios({
      method: 'post',
      url: `/api/${conversationName}/messages`,
      data
    }).then(response => dispatch({type: types.MESSAGES_SUCCESS, data: response.data}))
      .catch(errors => dispatch({type: types.MESSAGES_FAILURE, errors}))
  }
}