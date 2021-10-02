import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getExercise } from '../../redux/actions/exerciseActions'
import { Button } from 'reactstrap'

interface Props { }

const Exercises: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const [exercise, setExercise] = useState<Exercise | null>(null)

  const exerciseRedux = useSelector((state: State) => state.exercise)

  useEffect(() => {
    let id = window.location.pathname.split('/exercises/')[1]
    id = id.replace('/', '')
    dispatch(getExercise(id))
  }, [])

  useEffect(() => {
    if (exerciseRedux.exercise) {
      setExercise(exerciseRedux.exercise)
    }
  }, [exerciseRedux])

  return (
    <>
      <div className='container pb-5 mb-5'>
        <h5 className='my-3'>{exercise?.name}</h5>

      </div>
    </>
  )
}

export default Exercises
