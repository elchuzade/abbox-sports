import axios from 'axios'
import {
  GET_EXERCISE,
  GET_EXERCISES,
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE
} from '../dispatchTypes'

import { getErrors, getToastErrors, resetResponse, getResponse, showToast } from './commonActions'

export const getExercises = () => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.get('/api/v1/exercises')

    dispatch({
      type: GET_EXERCISES,
      payload: res.data?.data
    })
    dispatch(getResponse(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getErrors(error.response.data))
  }
}

export const getExercise = (_id: string) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.get(`/api/v1/exercises/${_id}`)

    dispatch({
      type: GET_EXERCISE,
      payload: res.data?.data
    })
    dispatch(getResponse(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getErrors(error.response.data))
  }
}

export const addExercise = (exercise: NewExercise) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.post('/api/v1/exercises', exercise)

    dispatch({
      type: ADD_EXERCISE,
      payload: res.data?.data?.exercise
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}

export const updateExercise = (exercise: Exercise) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.put(`/api/v1/exercises/${exercise._id}`, exercise)

    dispatch({
      type: UPDATE_EXERCISE,
      payload: res.data?.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}

export const deleteExercise = (exercise: Exercise) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.delete(`/api/v1/exercises/${exercise._id}`)

    dispatch({
      type: DELETE_EXERCISE,
      payload: res.data?.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}