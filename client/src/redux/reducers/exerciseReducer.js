import {
  GET_EXERCISE,
  GET_EXERCISES,
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE
} from '../types'

const initialState = {
  exercise: {},
  exercises: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises(e => e._id === action.payload._id ? action.payload : e)]
      }
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [action.payload, ...state.exercises]
      }
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises.filter(e => e._id !== action.payload._id)]
      }
    case GET_EXERCISE:
      return {
        ...state,
        exercise: action.payload
      }
    case GET_EXERCISES:
      return {
        ...state,
        exercises: action.payload
      }
    default:
      return state
  }
}
