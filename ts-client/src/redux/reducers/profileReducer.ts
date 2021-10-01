import {
  GET_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE
} from '../dispatchTypes'

const initialState: ProfileRedux = {
  profile: null
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case DELETE_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
    default:
      return state
  }
}
