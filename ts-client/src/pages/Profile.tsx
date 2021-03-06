import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getProfile, updateProfile,
  // deleteProfile
} from '../redux/actions/profileActions'

import TextInput from '../components/builtin/TextInput'

interface Props { }

const Profile: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState<string>('Your Name')
  const [showNameInput, setShowNameInput] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const profileRedux = useSelector((state: State) => state.profile)

  useEffect(() => {
    dispatch(getProfile())
    console.log(showDeleteModal)
  }, [dispatch, showDeleteModal])

  useEffect(() => {
    if (profileRedux?.profile?.name) {
      setName(profileRedux.profile.name)
    }
  }, [profileRedux.profile])

  const onClickEditName = () => {
    setShowNameInput(true)
  }

  const onClickSaveName = () => {
    setShowNameInput(false)
    if (profileRedux?.profile?.name !== name) {
      dispatch(updateProfile({ name }))
    }
  }

  // const onClickDeleteName = () => {
  //   dispatch(deleteProfile())
  // }

  // const DeleteProfileComponent = () => (
  //   <div className='text-center'>
  //     <b>{name}</b>
  //   </div>
  // )

  return (
    <div>
      <div className='container pt-5'>
        {showNameInput ?
          <div className='row mb-5'>
            <div className='col-4'>
              <TextInput
                name='name'
                value={name}
                extraClass='form-control-sm'
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='col-2'>
              <button className='btn btn-sm btn-outline-success text-dark' onClick={onClickSaveName}>Save</button>
            </div>
          </div> :
          <div className='row mb-5'>
            <div className='col-4'>
              <span><b>{name}</b></span>
            </div>
            <div className='col-2'>
              <button className='btn btn-sm btn-outline-secondary mr-2' onClick={onClickEditName}><i className='fas fa-pencil-alt'></i></button>
              <button className='btn btn-sm btn-outline-danger' onClick={() => setShowDeleteModal(true)}><i className='fas fa-trash'></i></button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Profile
