import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, Row, Col, Button, ModalHeader } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import TextInput from '../../builtin/TextInput'
import TextareaInput from '../../builtin/TextareaInput'
import { addExercise, updateExercise } from '../../../redux/actions/exerciseActions'

interface Props {
  exercise?: Exercise;
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
  const [description, setDescription] = useState<string>('')
  const [weightTick, setWeightTick] = useState<boolean>(false)
  const [durationTick, setDurationTick] = useState<boolean>(false)
  const [repetitionsTick, setRepetitionsTick] = useState<boolean>(false)

  const responseRedux = useSelector((state: State) => state.response)

  useEffect(() => {
    if (exercise) {
      console.log(exercise.tags)
      setName(exercise.name)
      exercise.tags?.includes('weight') && setWeightTick(true)
      exercise.tags?.includes('duration') && setDurationTick(true)
      exercise.tags?.includes('repetitions') && setRepetitionsTick(true)
    } else {
      setName('')
      setWeightTick(false)
      setDurationTick(false)
      setRepetitionsTick(false)
    }
  }, [exercise])

  useEffect(() => {
    // If there are any errors in redux set them to the input field
    responseRedux.errors && setErrors(responseRedux.errors)
    // Change status of loading to true when first submitted then to false when server has responded
    setLoading(responseRedux.loading)
    // If response status and message are positive, object is created successfully and modal is open, close the modal
    if ((responseRedux.status === 200 ||
      responseRedux.status === 201 ||
      responseRedux.status === 'success') &&
      responseRedux.message.length > 0 &&
      opened &&
      loading) {
      onCloseModal()
    }
  }, [responseRedux])

  const onCloseModal = () => {
    setErrors({})
    setName('')
    setWeightTick(false)
    setDurationTick(false)
    setRepetitionsTick(false)
    setLoading(false)
    closeModal()
  }

  const onAddNewExercise = () => {
    if (weightTick || durationTick || repetitionsTick) {
      const tags = []
      weightTick && tags.push('weight')
      durationTick && tags.push('duration')
      repetitionsTick && tags.push('repetitions')

      dispatch(addExercise({ name, tags }))
      setLoading(true)
    }
  }

  const onEditExercise = () => {
    if (exercise) {
      dispatch(updateExercise({ ...exercise, name }))
      setLoading(true)
    }
  }

  return (
    <Modal
      isOpen={opened}
      toggle={onCloseModal}
      size='md'
      className='modal-bottom text-center'
    >
      <ModalHeader className='modal-header'>
        Add New Exercise
      </ModalHeader>
      <ModalBody>
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
        <Row className='mb-1'>
          <Col>
            <TextareaInput
              rows={3}
              name='description'
              placeholder='description'
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              error={errors.description}
            />
          </Col>
        </Row>
        <Row className='px-2'>
          <Col className={`modal-tag ${exercise?.tags?.includes('weight') ? 'button-dark' : ''}`} onClick={() => setWeightTick(!weightTick)}>
            <span className='m-auto'>Weight (kg)</span>
          </Col>
          <Col className={`modal-tag ${exercise?.tags?.includes('duration') ? 'button-dark' : ''}`} onClick={() => setDurationTick(!durationTick)}>
            <span className='m-auto'>Duration (s)</span>
          </Col>
          <Col className={`modal-tag ${exercise?.tags?.includes('repetitions') ? 'button-dark' : ''}`} onClick={() => setRepetitionsTick(!repetitionsTick)}>
            <span className='m-auto'>Repetitions</span>
          </Col>
        </Row>
        <div className='text-center pt-1'>
          {exercise ? (
            <Button
              onClick={loading ? undefined : onEditExercise}
              className={`border-radius-50 btn-block button-theme-light ${loading ? 'disabled' : ''}`}
            >
              {loading ? <div className='loaderButton' /> : 'Save'}
            </Button>
          ) : (
            <Button
              onClick={loading ? undefined : onAddNewExercise}
              className={`border-radius-50 btn-block button-theme-light ${loading ? 'disabled' : ''}`}
            >
              {loading ? <div className='loaderButton' /> : 'ADD'}
            </Button>
          )}
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ExerciseModal