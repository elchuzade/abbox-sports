import React, { useEffect } from 'react'
import { setNavbarValues } from '../redux/actions/commonActions'
import { useDispatch } from 'react-redux'

interface Props { }

const Messages: React.FC<Props> = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setNavbarValues({
      navbarClick: () => { },
      navbarText: ''
    }))
  }, [dispatch])

  return (
    <div>
      <div className='container'>
        Abbox Sports Landing
      </div>
    </div>
  )
}

export default Messages
