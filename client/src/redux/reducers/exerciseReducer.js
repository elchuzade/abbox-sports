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
    case GET_EXERCISE:
    case ADD_EXERCISE:
    case UPDATE_EXERCISE:
    case DELETE_EXERCISE:
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
