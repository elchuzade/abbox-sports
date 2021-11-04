import {
  GET_EXERCISE,
  GET_EXERCISES,
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
  ADD_EXERCISE_SET,
} from '../dispatchTypes'

const initialState: ExerciseRedux = {
  exercise: null,
  exercises: [],
}

const exerciseReducer = (state = initialState, action: any) => {
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
    case ADD_EXERCISE_SET:
      return {
        ...state,
        exercises: [...state.exercises.map(e => e._id === action.payload.exercise._id ? action.payload.exercise : e)]
      }
    default:
      return state
  }
}

export default exerciseReducer