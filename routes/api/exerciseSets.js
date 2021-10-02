const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Input Validation
const validateExerciseSetInput = require('../../validation/exerciseSet')

const Exercise = require('../../models/Exercise')
const ExerciseSet = require('../../models/ExerciseSet')

// @route GET exercises/sets/:exerciseId
// @desc Get all exercise sets
// @access PRIVATE
router.get('/:exerciseId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const exercise = await Exercise.findById(req.params.exerciseId)

    if (exercise !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }
      if (exercise.deleted) {
        errors.exercise = 'Exercise is deleted'
        return res.status(400).json(errors)
      }

      const exerciseSets = ExerciseSet.find({ '_id': { $in: exercise.exerciseSets }, deleted: false })

      // Return result of updated exercise
      return res.status(200).json({ message: 'All sets of exercise', status: 'success', data: exerciseSets })
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Sets not found'
    return res.status(404).json(errors)
  }
})

// @route POST exercises/sets/:exerciseId
// @desc Add exercise set
// @access PRIVATE
router.post('/:exerciseId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateExerciseSetInput(req.body)
  // Check for validation errors
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const exercise = await Exercise.findById(req.params.exerciseId)
    // Create a new exercise set
    let newExerciseSet = new ExerciseSet({
      user: req.user.id,
      exercise: req.params.exerciseId,
      repetitions: req.body.repetitions,
      duration: req.body.duration,
      weight: req.body.weight
    })

    if (exercise !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }
      if (exercise.deleted) {
        errors.exercise = 'Exercise is deleted'
        return res.status(400).json(errors)
      }

      const savedExerciseSet = await newExerciseSet.save()

      exercise.exerciseSets.unshift(savedExerciseSet._id)

      // Save made updates
      const updatedExercise = await exercise.save()

      // Return result of updated exercise
      return res.status(200).json({ message: 'Added new Set to Exercise', status: 'success', data: { exercise: updatedExercise, exerciseSet: savedExerciseSet } })
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// @route PUT exercises/sets/:setId
// @desc Update exercise set
// @access PRIVATE
router.put('/:setId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateExerciseSetInput(req.body)
  // Check for validation errors
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const exerciseSet = await ExerciseSet.findById(req.params.setId)

    if (exerciseSet !== null) {
      if (exerciseSet.user.toString() !== req.user.id) {
        errors.exerciseSet = 'Unauthorized'
        return res.status(401).json(errors)
      }
      if (exerciseSet.deleted) {
        errors.exerciseSet = 'Exercise set is deleted'
        return res.status(400).json(errors)
      }

      exerciseSet.duration = req.body.duration
      exerciseSet.repetitions = req.body.repetitions
      exerciseSet.weight = req.body.weight

      updatedExerciseSet = await exerciseSet.save()

      // Return result of updated exercise
      return res.status(200).json({ message: 'Updated exercise set', status: 'success', data: updatedExerciseSet })
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// @route DELETE exercises/sets/:setId
// @desc Delete exercise set
// @access PRIVATE
router.delete('/:setId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const exerciseSet = await ExerciseSet.findById(req.params.setId)

    if (exerciseSet !== null) {
      if (exerciseSet.user.toString() !== req.user.id) {
        errors.exerciseSet = 'Unauthorized'
        return res.status(401).json(errors)
      }
      if (exerciseSet.deleted) {
        errors.exerciseSet = 'Exercise set is deleted'
        return res.status(400).json(errors)
      }

      exerciseSet.deleted = true

      deletedExerciseSet = await exerciseSet.save()

      // Return result of updated exercise
      return res.status(200).json({ message: 'Deleted exercise set', status: 'success', data: deletedExerciseSet })
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

module.exports = router
