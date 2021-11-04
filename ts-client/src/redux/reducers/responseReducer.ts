import { GET_LOADING, GET_RESPONSE, RESET_RESPONSE, GET_ERRORS, REFRESH_ERRORS } from '../dispatchTypes'

const initialState: ResponseRedux = {
  loading: false,
  status: '',
  message: '',
  errors: null
}

const responseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_LOADING:
      return {
        ...state,
        errors: {},
        loading: action.payload,
        status: '',
        message: ''
      }
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        status: {},
        message: {},
        loading: false
      }
    case REFRESH_ERRORS:
      return {
        ...state,
        errors: {}
      }
    case GET_RESPONSE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false
      }
    case RESET_RESPONSE:
      return {
        ...state,
        errors: {},
        loading: true,
        status: '',
        message: ''
      }
    default:
      return state
  }
}

export default responseReducer