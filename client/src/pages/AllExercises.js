import React, { useState, useEffect } from 'react'
import ExerciseRow from '../components/ExerciseRow'
import { useSelector, useDispatch } from 'react-redux'

const AllExercises = () => {
  const dispatch = useDispatch()
  const [myExercises, setMyExercises] = useState([])
  const [otherExercises, setOtherExercises] = useState([])

  return (
    <div>
      <div className='container'>
        <div className='my-3'>
          <h5 className='mt-5'>My Exercises</h5>
          {myExercises.map((exercise, index) => (
            <ExerciseRow key={index} exercise={exercise} />
          ))}
        </div>
        <div className='my-3'>
          <h5 className='mt-5'>Other Exercises</h5>
          {otherExercises.map((exercise, index) => (
            <ExerciseRow key={index} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllExercises
