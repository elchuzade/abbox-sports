import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, Row, Col, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import TextInput from '../../builtin/TextInput'
import { addExerciseSet, updateExerciseSet } from '../../../redux/actions/exerciseSetActions'

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
  const [weight, setWeight] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [repetitions, setRepetitions] = useState<number>(0)
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
      opened) {
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
    }
  }

  const onEditExerciseSet = () => {
    if (weight !== 0 || duration !== 0 || repetitions !== 0) {
      dispatch(updateExerciseSet({
        _id: exercise._id,
        weight: weight !== 0 ? weight : undefined,
        duration: duration !== 0 ? duration : undefined,
        repetitions: repetitions !== 0 ? repetitions : undefined
      }))
    }
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
        {exerciseSet ?
          <p className='text-center'>Update Set to <b>{exercise.name}</b></p> :
          <p className='text-center'>Add Set to <b>{exercise.name}</b></p>
        }
        <Row className='mb-2'>
          {tags?.includes('weight') && <Col>
            <TextInput
              type='number'
              name='weight'
              placeholder='weight'
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
              error={errors.weight}
              prefix={<i className='fas fa-dumbbell' />}
            />
          </Col>}
          {tags?.includes('duration') && <Col>
            <TextInput
              type='number'
              name='duration'
              placeholder='duration'
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              error={errors.duration}
              prefix={<i className='fas fa-clock' />}
            />
          </Col>}
          {tags?.includes('repetitions') && <Col>
            <TextInput
              type='number'
              name='repetitions'
              placeholder='repetitions'
              value={repetitions}
              onChange={e => setRepetitions(Number(e.target.value))}
              error={errors.repetitions}
              prefix={<i className='fas fa-calculator' />}
            />
          </Col>}
        </Row>
        <div className='text-center pt-1'>
          {id ? (
            <Button
              onClick={loading ? undefined : onEditExerciseSet}
              className={`border-radius-50 btn-block button-theme ${loading ? 'disabled' : ''}`}
            >
              {loading ? <div className='loaderButton' /> : 'Save'}
            </Button>
          ) : (
            <Button
              onClick={loading ? undefined : onAddNewExerciseSet}
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

export default ExerciseSetModal
