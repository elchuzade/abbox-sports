import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ExerciseModal from '../../components/exercise/exerciseModal/ExerciseModal'
import { getExercises } from '../../redux/actions/exerciseActions'
import ExerciseCard from '../../components/exercise/exerciseCard/ExerciseCard'
import { setNavbarValues } from '../../redux/actions/commonActions'

interface Props { }

const Exercises: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const [exerciseModal, setExerciseModal] = useState<boolean>(false)
  const [exercises, setExercises] = useState<Exercise[]>([])

  const exerciseRedux = useSelector((state: State) => state.exercise)

  useEffect(() => {
    dispatch(setNavbarValues({
      navbarClick: onClickNewExercise,
      navbarText: 'EXERCISES +'
    }))
    dispatch(getExercises())
  }, [dispatch])

  useEffect(() => {
    if (exerciseRedux.exercises?.length > 0) {
      let sortedExercises: Exercise[] = exerciseRedux.exercises
      setExercises(sortedExercises)
    }
  }, [exerciseRedux])

  const onClickNewExercise = () => {
    // Untap any tapped exercise and open modal for adding new exercise
    setExerciseModal(true)
  }

  const onCloseExerciseModal = () => {
    setExerciseModal(false)
  }

  return (
    <>
      <div className='container pb-5 mb-5'>
        {exercises.map((e, i) => (
          <div key={i} className='exercise'>
            <ExerciseCard exercise={e} tags={e.tags} />
          </div>
        ))}
      </div>
      {exerciseModal && <ExerciseModal
        opened={exerciseModal}
        closeModal={onCloseExerciseModal}
      />}
    </>
  )
}

export default Exercises
