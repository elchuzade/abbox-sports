import { combineReducers } from 'redux'
import authReducer from './authReducer'
import responseReducer from './responseReducer'
import profileReducer from './profileReducer'
import exerciseReducer from './exerciseReducer'

export default combineReducers({
  auth: authReducer,
  response: responseReducer,
  profile: profileReducer,
  exercise: exerciseReducer,
})
