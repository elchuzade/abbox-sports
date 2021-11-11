import React from 'react'
import { useSelector } from 'react-redux'

const NavbarCenterButton = () => {
  const commonRedux = useSelector((state: State) => state.common)

  return (
    <div className='ml-auto'>
      <h5 className='my-0 text-dark' onClick={commonRedux.navbarClick}>
        {commonRedux.navbarText}
      </h5>
    </div>
  )
}

export default NavbarCenterButton