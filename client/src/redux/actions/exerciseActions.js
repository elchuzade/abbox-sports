import axios from 'axios'
import {
  GET_EXERCISE,
  GET_EXERCISES,
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE
} from '../types'

import { getErrors, getToastErrors, resetResponse, getResponse, showToast } from './commonActions'

export const getExercise = id => async dispatch => {
  dispatch(resetResponse())
  try {
    const res = await axios.get(`/api/v1/exercises/${id}`)

    dispatch({
      type: GET_EXERCISE,
      payload: res.data.data
    })
    dispatch(getResponse(res.data))
  } catch (error) {
    console.log(error)
    dispatch(getErrors(error.response.data))
  }
}

export const getExercises = () => async dispatch => {
  dispatch(resetResponse())
  try {
    const res = await axios.get('/api/v1/exercises')

    dispatch({
      type: GET_EXERCISES,
      payload: res.data.data
    })
    dispatch(getResponse(res.data))
  } catch (error) {
    console.log(error)
    dispatch(getErrors(error.response.data))
  }
}

export const addExercise = exercise => async dispatch => {
  dispatch(resetResponse())
  try {
    const res = await axios.post('/api/v1/exercises', exercise)

    dispatch({
      type: ADD_EXERCISE,
      payload: res.data.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error) {
    console.log(error)
    dispatch(getErrors(error.response.data))
  }
}

export const updateExercise = exercise => async dispatch => {
  dispatch(resetResponse())
  try {
    const res = await axios.put(`/api/v1/exercises/${exercise.id}`, exercise)

    dispatch({
      type: UPDATE_EXERCISE,
      payload: res.data.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error) {
    console.log(error)
    dispatch(getErrors(error.response.data))
  }
}

export const deleteProfile = exercise => async dispatch => {
  dispatch(resetResponse())
  try {
    const res = await axios.delete(`/api/v1/exercises/${exercise.id}`)

    dispatch({
      type: DELETE_EXERCISE,
      payload: res.data.data
    })
    dispatch(getResponse(res.data))
    dispatch(showToast(res.data))
  } catch (error) {
    console.log(error)
    dispatch(getToastErrors(error.response.data))
  }
}