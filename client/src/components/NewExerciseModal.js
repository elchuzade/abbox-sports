import React, { useState, useEffect } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import TextInput from '../components/builtin/TextInput'
import { addExercise } from '../redux/actions/exerciseActions'

const NewExerciseModal = ({
  opened,
  closeModal
}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  const responseRedux = useSelector(state => state.response) 

  const onAddNewExercise = () => {
    dispatch(addExercise({ name }))
  }

  useEffect(() => {
    // If there are any errors in redux set them to the input field
    responseRedux.errors && setErrors(responseRedux.errors)
    // Change status of loadin to true when first submitted then to false when server has responded
    setLoading(responseRedux.loading)
    // If response status and message are positive, object is created successfully and modal is open, close the modal
    if ((responseRedux.status === 200 || responseRedux.status === 201) &&
        responseRedux.message.length > 0 &&
        opened) {
      setErrors({})
    }
  }, [responseRedux])

  return (
    <Modal
      isOpen={opened}
      toggle={closeModal}
      size='md'
    >
      <ModalBody>
        <p className='text-center'>Add New Exercise</p>
        <div className='row'>
          <div className='col-12'>
            <TextInput
              name='name'
              placeholder='name'
              value={name}
              onChange={e => setName(e.target.value)}
              error={errors.name}
            />
          </div>
        </div>
        <div className='text-center pt-3'>
          {/* If there is a loading bool, disable the input field and the button
          Instead show only the loader icon */}
          <button
            onClick={loading ? null : onAddNewExercise}
            className={`btn btn-success button ${loading ? 'disabled' : ''}`}
          >
            {loading ? <div className='loaderButton' /> : 'Add'}
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default NewExerciseModal
