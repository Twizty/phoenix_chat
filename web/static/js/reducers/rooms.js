import * as types from '../constants'

const DEFAULT_STATE = {
  entity: {
    messages: [],
    isFetching: false,
    hasMore: true
  },
  entities: [],
  errors: {}
}

const MESSAGES_PER_PAGE = 30

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.CLEAR_ROOMS:
      return { ...state, entities: [] }
    case types.CLEAR_ROOM:
      return { ...state, entity: {} }
    case types.SCROLL_ROOM_REQUEST:
      return { ...state, entity: { ...state.entity, isFetching: true} }
    case types.SCROLL_ROOM_SUCCESS:
      return {
        ...state,
        entity: {
          ...state.entity,
          messages: action.data.messages.reverse().concat(state.entity.messages),
          hasMore: action.data.messages.length === MESSAGES_PER_PAGE,
          isFetching: false
        }
      }
    case types.SCROLL_ROOM_FAILURE:
      return { ...state, entity: { ...state.entity, isFetching: false}, errors: action.errors }
    case types.FETCH_ROOMS_SUCCESS:
      return { ...state, entities: action.data.rooms }
    case types.FETCH_ROOM_SUCCESS:
      return { ...state, entity: { ...state.entity, messages: action.data.messages.reverse(), token: action.data.token } }
    case types.ADD_MESSAGE_FROM_SOCKET:
      return { ...state, entity: { ...state.entity, messages: state.entity.messages.concat(action.message)} }
    case types.FETCH_ROOMS_FAILURE:
      return { ...state, errors: action.errors }
    default:
      return { ...state }
  }
}