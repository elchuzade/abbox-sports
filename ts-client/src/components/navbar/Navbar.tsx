import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/actions/authActions'
import className from 'classnames'

const Navbar = () => {
  const dispatch = useDispatch()
  const [showNavbarPop, setShowNavbarPop] = useState<boolean>(false)

  const auth = useSelector((state: State) => state.auth)

  const onLogout = () => {
    dispatch(logoutUser())
    onHideNavbarPop()
  }

  const onHideNavbarPop = () => {
    setShowNavbarPop(false)
  }

  return (
    <div data-test='navbar' className='navbar'>
      <div className='navbar-logo'>
        aSports
      </div>
      <div className='navbar-menu ml-auto'>
        {auth.isAuthenticated && <span className='navbar-menu-item'>
          <Link to='/exercises' className='link-unstyled'>
            <i className='fas fa-dumbbell' />
          </Link>
        </span>}
        {auth.isAuthenticated && <span className='navbar-menu-item'>
          <button className='button-unstyled navbar-button' onClick={() => setShowNavbarPop(true)}>
            <i className='fas fa-user-circle' />
          </button>
        </span>}
        {!auth.isAuthenticated && <span className='navbar-menu-item'>
          <Link to='/login' className='link-unstyled'>Login</Link>
        </span>}
        {!auth.isAuthenticated && <span className='navbar-menu-item'>
          <Link to='/signup' className='link-unstyled'>Signup</Link>
        </span>}
      </div>
      <div className={className('navbar-pop', { 'd-none': !showNavbarPop })}>
        <button
          className='button-unstyled navbar-button navbar-button-close'
          onClick={onHideNavbarPop}
        >
          <i className='fas fa-times' />
        </button>
        <div className='my-auto w-100'>
          <div className='navbar-menu-item-opened'><h4><Link to='/profile' onClick={onHideNavbarPop} className='link-unstyled'><i className='fas fa-user-circle mr-2' /> Profile</Link></h4></div>
          <div className='navbar-menu-item-opened'><h4><Link to='/' onClick={onLogout} className='link-unstyled'><i className='fas fa-sign-out-alt mr-2' />Logout</Link></h4></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
