import {
  SET_NAVBAR_VALUES
} from '../dispatchTypes'

const initialState: CommonRedux = {
  navbarClick: () => { },
  navbarText: ''
}

const commonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_NAVBAR_VALUES:
      return {
        ...state,
        navbarClick: action.payload.navbarClick,
        navbarText: action.payload.navbarText
      }
    default:
      return state
  }
}

export default commonReducer