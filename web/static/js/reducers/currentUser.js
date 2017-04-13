import * as types from '../constants'

const DEFAULT_STATE = {
  entity: {},
  errors: null,
  handshakeError: false
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.SIGN_IN_USER_SUCCESS:
    case types.HANDSHAKE_SUCCESS:
      return { ...state, entity: action.data.currentUser }
    case types.HANDSHAKE_FAILURE:
      return { ...state, handshakeError: true }
    case types.REGISTER_USER_FAILURE:
    case types.SIGN_IN_USER_FAILURE:
      return { ...state, errors: action.errors }
    case types.CLEAR_USER_ERRORS:
      return { ...state, errors: null, handshakeError: false }
    default:
      return { ...state }
  }
}