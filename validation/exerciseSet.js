const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateExerciseSetInput (data) {
  let errors = {}

  data.repetitions = !isEmpty(data.repetitions) ? data.repetitions : ''
  data.duration = !isEmpty(data.duration) ? data.duration : ''
  data.weight = !isEmpty(data.weight) ? data.weight : ''

  if (data.repetitions && !Validator.isInt(data.repetitions)) {
    errors.repetitions = 'Repetitions must be number'
  }
  if (data.duration && !Validator.isInt(data.duration)) {
    errors.duration = 'Duration must be number'
  }
  if (data.weight && !Validator.isInt(data.weight)) {
    errors.weight = 'Weight must be number'
  }

  if (!data.duration && !data.repetitions && !data.weight) {
    errors.sets = 'No data provided'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}