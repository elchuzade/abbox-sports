const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }
  if (isEmpty(data.name)) {
    errors.name = 'Name is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}