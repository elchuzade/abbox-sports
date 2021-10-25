import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getExercise } from '../../redux/actions/exerciseActions'
import { Row, Col, Button } from 'reactstrap'

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
        {exercise?.tags?.map((t, i) => (
          <span className='mx-1 border py-1 px-2 border-radius-50' key={i}>{t}</span>
        ))}
        <div className='my-1'>Data</div>
        <div className='exercise-data-week'>
          <Row className='my-1 mx-0'>
            <Col className='px-1'>
              <div className='exercise-data-square'>
                <div className='exercise-data-square-header'><small className='text-muted'>Mon</small></div>
                {exercise?.tags?.includes('weight') && <div><i className='fas fa-dumbbell mr-2' />90</div>}
                {exercise?.tags?.includes('duration') && <div><i className='fas fa-clock mr-2' />90</div>}
                {exercise?.tags?.includes('repetitions') && <div><i className='fas fa-calculator mr-2' />90</div>}
              </div>
            </Col>
            <Col className='px-1'>
              <div className='exercise-data-square'>
                <div className='exercise-data-square-header'><small className='text-muted'>Mon</small></div>
                {exercise?.tags?.includes('weight') && <div><i className='fas fa-dumbbell mr-2' />90</div>}
                {exercise?.tags?.includes('duration') && <div><i className='fas fa-clock mr-2' />90</div>}
                {exercise?.tags?.includes('repetitions') && <div><i className='fas fa-calculator mr-2' />90</div>}
              </div>
            </Col>
            <Col className='px-1'>
              <div className='exercise-data-square'>
                <div className='exercise-data-square-header'><small className='text-muted'>Mon</small></div>
                {exercise?.tags?.includes('weight') && <div><i className='fas fa-dumbbell mr-2' />90</div>}
                {exercise?.tags?.includes('duration') && <div><i className='fas fa-clock mr-2' />90</div>}
                {exercise?.tags?.includes('repetitions') && <div><i className='fas fa-calculator mr-2' />90</div>}
              </div>
            </Col>
            <Col className='px-1'>
              <div className='exercise-data-square'>
                <div className='exercise-data-square-header'><small className='text-muted'>Mon</small></div>
                {exercise?.tags?.includes('weight') && <div><i className='fas fa-dumbbell mr-2' />90</div>}
                {exercise?.tags?.includes('duration') && <div><i className='fas fa-clock mr-2' />90</div>}
                {exercise?.tags?.includes('repetitions') && <div><i className='fas fa-calculator mr-2' />90</div>}
              </div>
            </Col>
          </Row>
          <Row className='my-1 mx-0'>
            <Col className='px-1'>
              <div className='exercise-data-square'>
                <div className='exercise-data-square-header'><small className='text-muted'>Mon</small></div>
                {exercise?.tags?.includes('weight') && <div><i className='fas fa-dumbbell mr-2' />90</div>}
                {exercise?.tags?.includes('duration') && <div><i className='fas fa-clock mr-2' />90</div>}
                {exercise?.tags?.includes('repetitions') && <div><i className='fas fa-calculator mr-2' />90</div>}
              </div>
            </Col>
            <Col className='px-1'>
              <div className='exercise-data-square'>
                <div className='exercise-data-square-header'><small className='text-muted'>Mon</small></div>
                {exercise?.tags?.includes('weight') && <div><i className='fas fa-dumbbell mr-2' />90</div>}
                {exercise?.tags?.includes('duration') && <div><i className='fas fa-clock mr-2' />90</div>}
                {exercise?.tags?.includes('repetitions') && <div><i className='fas fa-calculator mr-2' />90</div>}
              </div>
            </Col>
            <Col className='px-1'>
              <div className='exercise-data-square'>
                <div className='exercise-data-square-header'><small className='text-muted'>Mon</small></div>
                {exercise?.tags?.includes('weight') && <div><i className='fas fa-dumbbell mr-2' />90</div>}
                {exercise?.tags?.includes('duration') && <div><i className='fas fa-clock mr-2' />90</div>}
                {exercise?.tags?.includes('repetitions') && <div><i className='fas fa-calculator mr-2' />90</div>}
              </div>
            </Col>
            <Col className='px-1'>
              <div className='exercise-data-week-header d-flex'>
                <p className='m-auto'><i>Week 1</i></p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Exercises
