import React from 'react'

interface Props {
  name: String,
  tags?: String[]
}

const ExerciseCard: React.FC<Props> = ({ name, tags }) => {
  return (
    <div className='exercise-card d-flex'>
      <span className='m-auto'>{name}</span>
    </div>
  )
}

export default ExerciseCard
