import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ExerciseSetModal from './ExerciseSetModal'

interface Props {
  exercise: Exercise,
  tags?: string[]
}

const ExerciseCard: React.FC<Props> = ({ exercise, tags }) => {
  const [showExerciseSetModal, setShowExerciseSetModal] = useState(false)

  const onHideExerciseSetModal = () => {
    setShowExerciseSetModal(false)
  }

  return (
    <div className='exercise-card d-flex'>
      <div className='exercise-card-left pt-1 pl-1'>
        <span className='ml-2 d-block'>{exercise.name}</span>
        <p className='text-left mb-0 ml-3'>
          {tags?.map((t, i) => <small key={i} className='exercise-card-tag'><i>{t}, </i></small>)}
        </p>
      </div>
      <div className='exercise-card-right d-flex'>
        <button onClick={() => setShowExerciseSetModal(true)} className='button-theme button-unstyled ml-auto my-auto mr-2 border-radius-1'><i className='fas fa-plus text-white mx-2 my-2 py-1' /></button>
      </div>
      <ExerciseSetModal
        exercise={exercise}
        opened={showExerciseSetModal}
        closeModal={onHideExerciseSetModal}
      />
    </div>
  )
}

export default ExerciseCard
