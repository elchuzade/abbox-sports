import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, Row, Col, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import TextInput from '../../builtin/TextInput'
import { addExercise, updateExercise } from '../../../redux/actions/exerciseActions'
import germany from '../assets/img/germany.png'
import usa from '../assets/img/united-states.png'

interface Props {
  exercise: Exercise | null;
  opened: boolean;
  closeModal: () => void;
}

const ExerciseModal: React.FC<Props> = ({
  exercise,
  opened,
  closeModal
}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [id, setId] = useState<string>('')

  const responseRedux = useSelector((state: State) => state.response)

  useEffect(() => {
    if (exercise) {
      setId(exercise._id)
      setName(exercise.name)
    } else {
      setId('')
      setName('')
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

  const onAddNewExercise = () => {
    dispatch(addExercise({ name }))
  }

  const onEditExercise = () => {
    dispatch(updateExercise({ _id: id, name }))
  }

  const onCloseModal = () => {
    setErrors({})
    setName('')
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
        <p className='text-center'>Add New Exercise</p>
        <Row className='mb-2'>
          <Col>
            <TextInput
              name='name'
              placeholder='name'
              value={name}
              onChange={e => setName(e.target.value)}
              error={errors.name}
            />
          </Col>
        </Row>
        <div className='text-center pt-1'>
          {id ? (
            <Button
              onClick={loading ? undefined : onEditExercise}
              className={`border-radius-50 btn-block button-theme ${loading ? 'disabled' : ''}`}
            >
              {loading ? <div className='loaderButton' /> : 'Save'}
            </Button>
          ) : (
            <Button
              onClick={loading ? undefined : onAddNewExercise}
              className={`border-radius-50 btn-block button-theme ${loading ? 'disabled' : ''}`}
            >
              {loading ? <div className='loaderButton' /> : 'Add'}
            </Button>
          )}
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ExerciseModal
