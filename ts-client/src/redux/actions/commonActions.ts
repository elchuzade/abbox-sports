import {
  GET_LOADING,
  GET_RESPONSE,
  RESET_RESPONSE,
  LOADING_AUTH,
  STOP_LOADING_AUTH,
  SET_CURRENT_USER,
  GET_ERRORS,
  REFRESH_ERRORS,
  SET_NAVBAR_VALUES
} from '../dispatchTypes'
import { toast } from 'react-toastify'

export const uploadExerciseIcon = () => async (dispatch: any) => {
  console.log('upload')
}

export const setNavbarValues = (data: CommonRedux) => async (dispatch: any) => {
  dispatch({
    type: SET_NAVBAR_VALUES,
    payload: {
      navbarClick: data.navbarClick,
      navbarText: data.navbarText
    }
  })
}

export const showToast = (response: any) => async (dispatch: any) => {
  if (response.status === 'success') {
    toast.success(response.message)
  } else if (response.status === 'error') {
    toast.error(response.message)
  }
}

export const loadingAuth = () => {
  return {
    type: LOADING_AUTH
  }
}

export const stopLoadingAuth = () => {
  return {
    type: STOP_LOADING_AUTH
  }
}

// Set logged in user
export const setCurrentUser = (decoded: unknown) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const refreshErrors = () => {
  return {
    type: REFRESH_ERRORS
  }
}

export const getToastErrors = (data: any) => (dispatch: any) => {
  if (typeof data !== 'string' && typeof data !== 'number') {
    const keys = Object.keys(data)

    keys.forEach(k => dispatch(showToast({ status: 'error', message: data[k] })))
    dispatch(getErrors(data))
  }
}

export const getErrors = (data: object) => (dispatch: any) => {
  dispatch({
    type: GET_ERRORS,
    payload: data
  })
}

export const getLoading = (status: boolean) => {
  return {
    type: GET_LOADING,
    payload: status
  }
}

export const getResponse = (response: any) => {
  return {
    type: GET_RESPONSE,
    payload: {
      status: response.status,
      message: response.message
    }
  }
}

export const resetResponse = () => {
  return {
    type: RESET_RESPONSE
  }
}
