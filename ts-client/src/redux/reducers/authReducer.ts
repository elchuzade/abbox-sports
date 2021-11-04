import isEmpty from '../../validation/is-empty'
import { LOADING_AUTH, STOP_LOADING_AUTH, SET_CURRENT_USER } from '../dispatchTypes'

const initialState: AuthRedux = {
  isAuthenticated: false,
  user: null,
  loadingAuth: true
}

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case LOADING_AUTH:
      return {
        ...state,
        loadingAuth: true
      }
    case STOP_LOADING_AUTH:
      return {
        ...state,
        loadingAuth: false
      }
    default:
      return state
  }
}

export default authReducer