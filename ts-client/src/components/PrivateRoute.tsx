import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute: any = (props: any) => {
  const auth = useSelector((state: State) => state.auth)

  if (auth.isAuthenticated && !auth.loadingAuth) {
    return <Route path={props.path} exact={props.exact} component={props.component} />
  } else if (!auth.isAuthenticated && !auth.loadingAuth) {
    return <Redirect to='/login' />
  }
  return false
}

export default PrivateRoute