import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ExerciseSetModal from '../exerciseModal/ExerciseSetModal'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

interface Props {
  exercise: Exercise,
  tags?: string[]
}

const ExerciseCard: React.FC<Props> = ({ exercise, tags }) => {
  const [showExerciseSetModal, setShowExerciseSetModal] = useState<boolean>(false)

  const onHideExerciseSetModal = () => {
    setShowExerciseSetModal(false)
  }

  return (
    <div className='exercise-card d-flex'>
      <Link to={`/exercises/${exercise._id}`} className='exercise-card-left pt-1 pl-1 link-unstyled'>
        <span className='ml-2 d-block'>{exercise.name} ({exercise.exerciseSets?.length})</span>
        <p className='text-left mb-0 ml-3'>
          {tags?.map((t, i) => <small key={i} className='exercise-card-tag'><i>{t}, </i></small>)}
        </p>
      </Link>
      <div className='exercise-card-right d-flex'>
        <Button onClick={() => setShowExerciseSetModal(true)} className='button-theme button-unstyled button-exercise-card-add'><i className='fas fa-plus text-white py-1' /></Button>
      </div>
      <ExerciseSetModal
        tags={tags}
        exercise={exercise}
        opened={showExerciseSetModal}
        closeModal={onHideExerciseSetModal}
      />
    </div>
  )
}

export default ExerciseCard
