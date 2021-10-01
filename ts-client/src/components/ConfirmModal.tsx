import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deleteExercise } from '../redux/actions/exerciseActions'

interface Props {
  exercise: Exercise | null;
  opened: boolean;
  closeModal: () => void;
}

const ConfirmModal: React.FC<Props> = ({
  exercise,
  opened,
  closeModal
}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [id, setId] = useState<string>('')

  const responseRedux = useSelector((state: State) => state.response)

  useEffect(() => {
    if (exercise) {
      setId(exercise._id)
    }
  }, [exercise])

  useEffect(() => {
    // If there are any errors in redux set them to the input field
    responseRedux.errors && setErrors(responseRedux.errors)
    // Change status of loadin to true when first submitted then to false when server has responded
    setLoading(responseRedux.loading)
    // If response status and message are positive, object is created successfully and modal is open, close the modal
    if ((responseRedux.status === 200 ||
      responseRedux.status === 201 ||
      responseRedux.status === 'success') &&
      responseRedux.message.length > 0 &&
      opened) {
      onCloseModal()
    }
  }, [responseRedux])

  const onDeleteExercise = () => {
    dispatch(deleteExercise(id))
  }

  const onCloseModal = () => {
    setErrors({})
    closeModal()
  }

  return (
    <Modal
      isOpen={opened}
      toggle={onCloseModal}
      size='md'
      className='modal-bottom'
    >
      <ModalBody>
        <p className='text-center' > Are you sure you want to delete </p>
        <p className='text-center' > {exercise?.name}</p>
        {
          errors.exercise && <small>{errors.exercise} </small>}
        < div className='text-center pt-1' >
          <Button
            onClick={loading ? undefined : onDeleteExercise}
            className={`border-radius-50 btn-block button-theme ${loading ? 'disabled' : ''}`
            }
          >
            {loading ? <div className='loaderButton' /> : 'Delete'
            }
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ConfirmModal