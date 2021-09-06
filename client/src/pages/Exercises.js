import React, { useState, useEffect } from 'react'
import ExerciseRow from '../components/ExerciseRow'
import { useSelector, useDispatch } from 'react-redux'
import { getExercises } from '../redux/actions/exerciseActions'
import NewExerciseModal from '../components/NewExerciseModal'

const Exercises = () => {
  const dispatch = useDispatch()
  const [exercises, setExercises] = useState([])
  const [showNewExerciseModal, setShowNewExerciseModal] = useState(false)

  const exerciseRedux = useSelector(state => state.exercise)

  useEffect(() => {
    dispatch(getExercises())
  }, [])

  useEffect(() => {
    if (exerciseRedux.exercises?.length > 0) {
      console.log(exerciseRedux.exercises)
      setExercises(exerciseRedux.exercises)
    }
  }, [exerciseRedux])

  return (
    <div>
      <div className='container'>
        <div className='my-3'>
          <h5 className='mt-5'>Exercises
            <button 
              className='btn btn-primary btn-sm ml-2'
              onClick={() => setShowNewExerciseModal(true)}
            >
              <i className='fas fa-plus' />
            </button>
          </h5>
          {exercises?.map((exercise, index) => (
            <ExerciseRow key={index} exercise={exercise} />
          ))}
        </div>
        <NewExerciseModal opened={showNewExerciseModal} closeModal={() => setShowNewExerciseModal(false)}/>
      </div>
    </div>
  )
}

export default Exercises
