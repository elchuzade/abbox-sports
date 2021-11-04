import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, Row, Col, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import TextInput from '../../builtin/TextInput'
import { addExercise, updateExercise } from '../../../redux/actions/exerciseActions'
import classNames from 'classnames'

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
  const [weightTick, setWeightTick] = useState<boolean>(false)
  const [durationTick, setDurationTick] = useState<boolean>(false)
  const [repetitionsTick, setRepetitionsTick] = useState<boolean>(false)

  const responseRedux = useSelector((state: State) => state.response)

  useEffect(() => {
    if (exercise) {
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
      className='modal-bottom'
    >
      <ModalBody>
        <p className='text-center'>Add New Exercise</p>
        <Row className='mb-4'>
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
        <Row className='mb-4 px-2'>
          <Col className='border mx-2 px-0 border-radius-50'>
            <Button onClick={() => setWeightTick(!weightTick)} className={classNames('mr-3 btn-sm border-radius-50', { 'button-theme': weightTick })}>
              {weightTick ? <i className='fas fa-check' /> : <i className='fas fa-square' />}
            </Button>
            Weight (kg)
          </Col>
          <Col className='border mx-2 px-0 border-radius-50'>
            <Button onClick={() => setDurationTick(!durationTick)} className={classNames('mr-3 btn-sm border-radius-50', { 'button-theme': durationTick })}>
              {durationTick ? <i className='fas fa-check' /> : <i className='fas fa-square' />}
            </Button>
            Duration (s)
          </Col>
          <Col className='border mx-2 px-0 border-radius-50'>
            <Button onClick={() => setRepetitionsTick(!repetitionsTick)} className={classNames('mr-3 btn-sm border-radius-50', { 'button-theme': repetitionsTick })}>
              {repetitionsTick ? <i className='fas fa-check' /> : <i className='fas fa-square' />}
            </Button>
            Repetitions
          </Col>
        </Row>
        <div className='text-center pt-1'>
          {exercise ? (
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
