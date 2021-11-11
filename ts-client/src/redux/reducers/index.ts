import { combineReducers } from 'redux'
import authReducer from './authReducer'
import responseReducer from './responseReducer'
import profileReducer from './profileReducer'
import exerciseReducer from './exerciseReducer'
import commonReducer from './commonReducer'

export default combineReducers({
  auth: authReducer,
  response: responseReducer,
  profile: profileReducer,
  exercise: exerciseReducer,
  common: commonReducer
})
