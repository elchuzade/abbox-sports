import React from 'react'

const ExerciseRow = ({ exercise }) => {
  return (
    <div className='card exercise-card mb-1'>
      <div className="container">
        <div className='row'>
          <div className='col-3 px-0'>
            <img className='img-fluid exercise-icon p-1' src={exercise.icon ? exercise.icon.location : 'https://picsum.photos/200'} alt='icon' />
          </div>
          <div className='col-7 px-0 d-flex'>
            <h6 className='my-auto'>{exercise.name}</h6>
          </div>
          <div className='col-2 px-0 d-flex'>
            <button className='btn btn-sm btn-danger exercise-button m-auto'><i className='fas fa-trash' /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseRow
