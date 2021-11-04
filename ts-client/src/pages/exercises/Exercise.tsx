import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getExercise } from '../../redux/actions/exerciseActions'
import { Row, Col } from 'reactstrap'
import getWeekNumber from '../../utils/getWeekNumber'
import getYearNumber from '../../utils/getYearNumber'
import groupArrayByKey from '../../utils/groupArrayByKey'

interface Props { }


const Exercises: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const [exercise, setExercise] = useState<Exercise>()
  const [weeks, setWeeks] = useState<WeekYear[]>([])

  const exerciseRedux = useSelector((state: State) => state.exercise)

  useEffect(() => {
    let id = window.location.pathname.split('/exercises/')[1]
    id = id.replace('/', '')
    dispatch(getExercise(id))
  }, [dispatch])

  useEffect(() => {
    if (exerciseRedux.exercise) {
      let updatedExerciseSets: any[] = []
      let firstYear: number = 0
      if (exerciseRedux.exercise.exerciseSets && exerciseRedux.exercise.exerciseSets.length > 0) {
        // let firstWeek = getWeekNumber(exerciseRedux.exercise.exerciseSets[0].createdAt)
        // let lastWeek = getWeekNumber(new Date())

        // last entry is the first year the user joined
        firstYear = getYearNumber(exerciseRedux.exercise.exerciseSets[exerciseRedux.exercise.exerciseSets.length - 1].createdAt)

        // appending week and year number for grouping by week and year
        for (let i = 0; i < exerciseRedux.exercise.exerciseSets.length; i++) {
          let yearDifference = getYearNumber(exerciseRedux.exercise.exerciseSets[i].createdAt) - firstYear
          updatedExerciseSets.push({
            ...exerciseRedux.exercise.exerciseSets[i],
            week_year: `${getWeekNumber(exerciseRedux.exercise.exerciseSets[i].createdAt) + (52 * yearDifference)}_${getYearNumber(exerciseRedux.exercise.exerciseSets[i].createdAt)}`,
            week: getWeekNumber(exerciseRedux.exercise.exerciseSets[i].createdAt) + (52 * yearDifference),
            latest: getWeekNumber(exerciseRedux.exercise.exerciseSets[i].createdAt) === getWeekNumber(new Date())
          })
        }
      }
      setExercise({
        ...exerciseRedux.exercise,
        exerciseSets: updatedExerciseSets
      })

      // REFACTORING DATA
      let groupedData = groupArrayByKey(updatedExerciseSets, 'week_year')
      let refactoredGroupedData: WeeksYear = {}

      for (let i = 0; i < Object.keys(groupedData).length; i++) {
        refactoredGroupedData[Object.keys(groupedData)[i]] = {
          days: groupedData[Object.keys(groupedData)[i]],
          week: groupedData[Object.keys(groupedData)[i]][0].week,
          latest: (groupedData[Object.keys(groupedData)[i]][0].week % 52 || 52) === getWeekNumber(new Date())
        }
      }

      // add dayOfWeek to each exercise set
      for (let i = 0; i < Object.keys(refactoredGroupedData).length; i++) {
        for (let j = 0; j < refactoredGroupedData[Object.keys(groupedData)[i]].days.length; j++) {
          refactoredGroupedData[Object.keys(groupedData)[i]].days[j].dayOfWeek =
            new Date(groupedData[Object.keys(groupedData)[i]][j].createdAt).toLocaleString('en-us', { weekday: 'short' })
        }
      }
      // group based on dayOfWeek each groupedValue (group inside group)
      for (let i = 0; i < Object.keys(refactoredGroupedData).length; i++) {
        refactoredGroupedData[Object.keys(groupedData)[i]].days = groupArrayByKey(groupedData[Object.keys(groupedData)[i]], 'dayOfWeek')
      }
      let refactoredGroupedArray: WeekYear[] = []
      // turn object into array
      for (let i = 0; i < Object.keys(refactoredGroupedData).length; i++) {
        refactoredGroupedArray.push(refactoredGroupedData[Object.keys(refactoredGroupedData)[i]])
      }

      if (refactoredGroupedArray.length > 0) {
        // refill empty weeks with data placeholders
        let firstWeek = refactoredGroupedArray[refactoredGroupedArray.length - 1].week
        let lastWeek = refactoredGroupedArray[0].week
        let arrayOfAllWeeks: number[] = []
        let populatedArrayOfAllWeeks: WeekYear[] = []

        for (var i = firstWeek; i <= lastWeek; i++) {
          arrayOfAllWeeks.push(i);
        }
        for (let i = 0; i < arrayOfAllWeeks.length; i++) {
          let foundWeek = refactoredGroupedArray.find(data => data.week === arrayOfAllWeeks[i])
          if (foundWeek) {
            populatedArrayOfAllWeeks.push(foundWeek)
          } else {
            populatedArrayOfAllWeeks.push({
              days: {},
              week: arrayOfAllWeeks[i],
              latest: (arrayOfAllWeeks[i] % 52 || 52) === getWeekNumber(new Date())
            })
          }
        }
        setWeeks(populatedArrayOfAllWeeks.reverse())
      }

    }
  }, [exerciseRedux])

  const DayOfTheWeek = (day: ExerciseSet[] | null, weekDay: string, latest: boolean) => {
    if (day === null) {
      return (
        <div className={`exercise-data-square ${latest ? 'exercise-data-square-latest' : ''}`}>
          <div className='exercise-data-square-header'><small className='text-muted'>{weekDay}</small></div>
        </div>
      )
    } else {
      // combine all actions to a single value for weight, duration and repetitions
      let totalWeight = 0
      let totalDuration = 0
      let totalRepetitions = 0

      for (let i = 0; i < day.length; i++) {
        totalWeight += day[i].weight || 0
        totalDuration += day[i].duration || 0
        totalRepetitions += day[i].repetitions || 0
      }

      return (
        <div className={`exercise-data-square ${latest ? 'exercise-data-square-latest' : ''}`}>
          <div className='exercise-data-square-header'><small className='text-muted'>{weekDay}</small></div>
          {exercise?.tags?.includes('weight') && <div><i className='fas fa-dumbbell mr-2' />{totalWeight}</div>}
          {exercise?.tags?.includes('duration') && <div><i className='fas fa-clock mr-2' />{totalDuration}</div>}
          {exercise?.tags?.includes('repetitions') && <div><i className='fas fa-calculator mr-2' />{totalRepetitions}</div>}
        </div>
      )
    }
  }

  const WeekOfTheYear = (week: WeekYear) => {
    const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let modifiedWeek: WeekYear = {
      ...week,
      days: {}
    }
    // populate missing days of the week
    for (let i = 0; i < weekDays.length; i++) {
      if (Object.keys(week.days).includes(weekDays[i])) {
        modifiedWeek.days[weekDays[i]] = week.days[weekDays[i]]
      } else {
        modifiedWeek.days[weekDays[i]] = null
      }
    }
    return (
      <div className={`exercise-data-week mb-3 ${modifiedWeek.latest ? 'exercise-data-week-latest' : ''}`}>
        <Row className='mx-0'>
          {modifiedWeek && Object.keys(modifiedWeek.days).map((day, i) => (
            <Col key={i} xs='3' className='px-1 my-1'>
              {/* day is Sun, Mon, Tue ..., modifiedWeek[day] is array of ExerciseSets of that day */}
              {DayOfTheWeek(modifiedWeek.days[day], day, modifiedWeek.latest)}
            </Col>
          ))}
          <Col xs='3' className='px-1 my-1'>
            <div className='exercise-data-week-header d-flex'>
              <p className='m-auto'><i>Week {modifiedWeek.week % 52 || 52}</i></p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <>
      <div className='container pb-5 mb-5'>
        <h5 className='my-3'>{exercise?.name}</h5>
        {exercise?.tags?.map((t, i) => (
          <span className='mx-1 border py-1 px-2 border-radius-50' key={i}>{t}</span>
        ))}
        <div className='my-1'>Data</div>
        {weeks.map((week_year, i) => <div key={i}>{WeekOfTheYear(week_year)}</div>)}
      </div>
    </>
  )
}

export default Exercises
