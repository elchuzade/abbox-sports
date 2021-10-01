import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ExerciseModal from '../../components/exercise/exerciseModal/ExerciseModal'
import { getExercises } from '../../redux/actions/exerciseActions'
import ExerciseCard from '../../components/exercise/exerciseCard/ExerciseCard'

interface Props { }

const Exercises: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const [exerciseModal, setExerciseModal] = useState<boolean>(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [tappedExercise, setTappedExercise] = useState<Exercise | null>(null)

  const exerciseRedux = useSelector((state: State) => state.exercise)

  useEffect(() => {
    dispatch(getExercises())
  }, [])

  useEffect(() => {
    if (exerciseRedux.exercises?.length > 0) {
      let sortedExercises: Exercise[] = exerciseRedux.exercises
      setExercises(sortedExercises)
    }
  }, [exerciseRedux])


  const onClickNewExercise = () => {
    // Untap any tapped exercise and open modal for adding new exercise
    setTappedExercise(null)
    setExerciseModal(true)
  }

  const onCloseExerciseModal = () => {
    setTappedExercise(null)
    setExerciseModal(false)
  }

  return (
    <>
      <div className='container pb-5 mb-5'>
        <h5>My Exercises</h5>
        {exercises.map((e, i) => (
          <div key={i} className='exercise'>
            <ExerciseCard name={e.name} />
          </div>
        ))}
      </div>
      <ExerciseModal
        opened={exerciseModal}
        exercise={tappedExercise}
        closeModal={onCloseExerciseModal}
      />
    </>
  )
}

export default Exercises
