import axios from 'axios'
import {
  GET_EXERCISE_SET,
  GET_EXERCISE_SETS,
  ADD_EXERCISE_SET,
  UPDATE_EXERCISE_SET,
  DELETE_EXERCISE_SET
} from '../dispatchTypes'

import { getErrors, getToastErrors, resetResponse, getResponse, showToast } from './commonActions'

// export const getExercise = (_id: string) => async (dispatch: any) => {
//   dispatch(resetResponse())
//   try {
//     const res = await axios.get(`/api/v1/exercises/${_id}`)

//     dispatch({
//       type: GET_EXERCISE,
//       payload: res.data.data
//     })
//     dispatch(getResponse(res.data))
//   } catch (error: any) {
//     console.log(error)
//     dispatch(getErrors(error.response.data))
//   }
// }

export const getExerciseSets = () => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.get('/api/v1/exercises')

    dispatch({
      type: GET_EXERCISE_SETS,
      payload: res.data.data
    })
    dispatch(getResponse(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getErrors(error.response.data))
  }
}

export const addExerciseSet = (exercise: NewExerciseSet) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.post('/api/v1/exercises', exercise)

    dispatch({
      type: ADD_EXERCISE_SET,
      payload: res.data.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}

export const updateExerciseSet = (exercise: ExerciseSet) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.put(`/api/v1/exercises/${exercise._id}`, exercise)

    dispatch({
      type: UPDATE_EXERCISE_SET,
      payload: res.data.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}

export const deleteExerciseSet = (_id: string) => async (dispatch: any) => {
  dispatch(resetResponse())
  try {
    const res = await axios.delete(`/api/v1/exercises/${_id}`)

    dispatch({
      type: DELETE_EXERCISE_SET,
      payload: res.data.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}