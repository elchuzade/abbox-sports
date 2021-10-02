import axios from 'axios'
import {
  GET_EXERCISE_SET,
  GET_EXERCISE_SETS,
  ADD_EXERCISE_SET,
  UPDATE_EXERCISE_SET,
  DELETE_EXERCISE_SET
} from '../dispatchTypes'

import { getErrors, getToastErrors, resetResponse, getResponse, showToast } from './commonActions'

export const getExerciseSets = () => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.get('/api/v1/exercises/sets')

    dispatch({
      type: GET_EXERCISE_SETS,
      payload: res.data?.data
    })
    dispatch(getResponse(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getErrors(error.response.data))
  }
}

export const getExerciseSet = (exerciseSet: ExerciseSet) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.get(`/api/v1/exercises/sets/${exerciseSet}`)

    dispatch({
      type: GET_EXERCISE_SET,
      payload: res.data?.data
    })
    dispatch(getResponse(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getErrors(error.response.data))
  }
}

export const addExerciseSet = (exerciseSet: NewExerciseSet, exercise: Exercise) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.post(`/api/v1/exercises/sets/${exercise._id}`, exerciseSet)

    dispatch({
      type: ADD_EXERCISE_SET,
      payload: res.data?.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}

export const updateExerciseSet = (exerciseSet: ExerciseSet) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.put(`/api/v1/exercises/sets/${exerciseSet._id}`, exerciseSet)

    dispatch({
      type: UPDATE_EXERCISE_SET,
      payload: res.data?.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}

export const deleteExerciseSet = (exerciseSet: ExerciseSet) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.delete(`/api/v1/exercises/sets/${exerciseSet._id}`)

    dispatch({
      type: DELETE_EXERCISE_SET,
      payload: res.data?.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}