import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, Row, Col, Button, ModalHeader } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import TextInput from '../../builtin/TextInput'
import { addExerciseSet, updateExerciseSet } from '../../../redux/actions/exerciseSetActions'
import removeLeadingZero from '../../../utils/removeLeadingZero'

interface Props {
  exercise: Exercise;
  exerciseSet?: ExerciseSet,
  tags?: string[],
  opened: boolean;
  closeModal: () => void;
}

const ExerciseSetModal: React.FC<Props> = ({
  exercise,
  exerciseSet,
  tags,
  opened,
  closeModal
}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [weight, setWeight] = useState<number>()
  const [duration, setDuration] = useState<number>()
  const [repetitions, setRepetitions] = useState<number>()
  const [id, setId] = useState<string>('')

  const responseRedux = useSelector((state: State) => state.response)

  useEffect(() => {
    if (exerciseSet) {
      setId(exerciseSet._id)
      setWeight(exerciseSet.weight || 0)
      setDuration(exerciseSet.weight || 0)
      setRepetitions(exerciseSet.weight || 0)
    } else {
      setId('')
    }
  }, [exerciseSet])

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
      opened &&
      loading) {
      onCloseModal()
    }
  }, [responseRedux])

  const onAddNewExerciseSet = () => {
    if (weight !== 0 || duration !== 0 || repetitions !== 0) {
      dispatch(addExerciseSet({
        weight: weight !== 0 ? weight : undefined,
        duration: duration !== 0 ? duration : undefined,
        repetitions: repetitions !== 0 ? repetitions : undefined
      }, exercise))
      setLoading(true)
    }
  }

  const onEditExerciseSet = () => {
    if (weight !== 0 || duration !== 0 || repetitions !== 0) {
      dispatch(updateExerciseSet({
        createdAt: exerciseSet?.createdAt,
        updatedAt: exerciseSet?.updatedAt,
        deleted: exerciseSet?.deleted || false,
        _id: exercise._id,
        weight: weight !== 0 ? weight : undefined,
        duration: duration !== 0 ? duration : undefined,
        repetitions: repetitions !== 0 ? repetitions : undefined
      }))
      setLoading(true)
    }
  }

  const onCloseModal = () => {
    setErrors({})
    setId('')
    setWeight(undefined)
    setDuration(undefined)
    setRepetitions(undefined)
    setLoading(false)
    closeModal()
  }

  return (
    <Modal
      isOpen={opened}
      toggle={onCloseModal}
      size='md'
      className='modal-bottom text-center'
    >
      <ModalHeader className='modal-header'>
        {exercise.name}
      </ModalHeader>
      <ModalBody>
        <Row className='mb-2'>
          {tags?.includes('weight') && <Col>
            <TextInput
              type='number'
              name='weight'
              placeholder='weight'
              value={weight || ''}
              onChange={e => setWeight(removeLeadingZero(e.target.value))}
              error={errors.weight}
              prefix={<i className='fas fa-dumbbell' />}
            />
          </Col>}
          {tags?.includes('duration') && <Col>
            <TextInput
              type='number'
              name='duration'
              placeholder='duration'
              value={duration || ''}
              onChange={e => setDuration(removeLeadingZero(e.target.value))}
              error={errors.duration}
              prefix={<i className='fas fa-clock' />}
            />
          </Col>}
          {tags?.includes('repetitions') && <Col>
            <TextInput
              type='number'
              name='repetitions'
              placeholder='repetitions'
              value={repetitions || ''}
              onChange={e => setRepetitions(removeLeadingZero(e.target.value))}
              error={errors.repetitions}
              prefix={<i className='fas fa-calculator' />}
            />
          </Col>}
        </Row>
        <div className='text-center pt-1'>
          {id ? (
            <Button
              onClick={loading ? undefined : onEditExerciseSet}
              className={`border-radius-50 btn-block button-theme-light ${loading ? 'disabled' : ''}`}
            >
              {loading ? <div className='loaderButton' /> : 'Save'}
            </Button>
          ) : (
            <Button
              onClick={loading ? undefined : onAddNewExerciseSet}
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

export default ExerciseSetModal
