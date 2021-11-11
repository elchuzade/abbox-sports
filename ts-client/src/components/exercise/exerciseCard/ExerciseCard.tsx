import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
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
      <img className='exercise-card-icon' src={'https://picsum.photos/200'} alt='exercise card icon' />
      <div className='d-flex my-auto'>
        <Link to={`/exercises/${exercise._id}`} className='exercise-card-left link-unstyled'>
          <p className='exercise-card-title'>{exercise.name}</p>
          <p className='exercise-card-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          <p className='exercise-card-tags'>
            {tags?.map((t, i) => <small key={i} className='exercise-card-tag'><i>{t}, </i></small>)}
          </p>
        </Link>
      </div>
      <Button onClick={() => setShowExerciseSetModal(true)} className='button-unstyled button-exercise-card-add'>
        <i className='fas fa-plus py-1' />
        <span className='text-lighter'>{exercise.exerciseSets?.length}</span>
      </Button>
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
