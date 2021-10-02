import {
  GET_EXERCISE,
  GET_EXERCISES,
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE
} from '../dispatchTypes'

const initialState: ExerciseRedux = {
  exercise: null,
  exercises: [],
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises.filter((w: Exercise) => w._id !== action.payload._id)]
      }
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises.map((w: Exercise) => w._id === action.payload._id ? action.payload : w)]
      }
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload]
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