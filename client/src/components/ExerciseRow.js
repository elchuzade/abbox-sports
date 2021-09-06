import React from 'react'

const ExerciseRow = ({ exercise }) => {
  return (
    <div className='card exercise-card'>
      <div className='row'>
        <div className='col-2'>
          <img className='img-fluid exercise-icon p-2' src={exercise.icon ? exercise.icon.location : 'https://picsum.photos/200'} alt='icon' />
        </div>
        <div className='col-8 d-flex'>
          <h4 className='my-auto'>{exercise.name}</h4>
        </div>
        <div className='col-2 d-flex'>
          <div className='d-flex ml-auto mr-3'>
            <button className='btn btn-danger exercise-button my-auto'>Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseRow
