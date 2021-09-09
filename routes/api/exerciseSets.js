const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Input Validation
const validateExerciseSetInput = require('../../validation/exerciseSet')

const Profile = require('../../models/Profile')
const ExerciseSet = require('../../models/ExerciseSet')

// @route GET exercises/sets/:exerciseId
// @desc Get all exercise sets
// @access PRIVATE
router.get('/:exerciseId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    if (profile !== null) {
      let sets = []

      if (!profile.exercises.some(e => e.exercise.toString() === req.params.exerciseId)) {
        errors.exercise = 'Exercise not found'
        return res.status(404).json(errors)
      }

      // Find exercise from profile exercises and add this set
      for (let i = 0; i < profile.exercises.length; i++) {
        if (profile.exercises[i].exercise.toString() === req.params.exerciseId) {
          if (profile.exercises[i].deleted) {
            errors.exercise = 'Exercise is deleted'
            return res.status(400).json(errors)
          }
          // Found exercise

          sets = await ExerciseSet.find({ _id: { $in: profile.exercises[i].sets } })
          break
        }
      }

      // Return result of updated exercise
      return res.status(200).json({ message: 'All sets of exercise', status: 'success', data: sets })
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
    const profile = await Profile.findOne({ user: req.user.id })

    if (profile !== null) {
      if (!profile.exercises.some(e => e.exercise.toString() === req.params.exerciseId)) {
        errors.exercise = 'Exercise not found'
        return res.status(404).json(errors)
      }

      // Find exercise from profile exercises and add this set
      for (let i = 0; i < profile.exercises.length; i++) {
        if (profile.exercises[i].exercise.toString() === req.params.exerciseId) {
          if (profile.exercises[i].deleted) {
            errors.exercise = 'Exercise is deleted'
            return res.status(400).json(errors)
          }
          // Found exercise
          let newExerciseSet = new ExerciseSet({
            user: req.user.id,
            exercise: req.params.exerciseId,
            repetitions: req.body.repetitions,
            duration: req.body.duration,
            weight: req.body.weight
          })

          const savedExercise = await newExerciseSet.save()
          profile.exercises[i].sets.push(savedExercise._id)
          break
        }
      }

      // Save made updates
      const updatedProfile = await profile.save()

      // Return result of updated exercise
      return res.status(200).json({ message: 'Added new Set to Exercise', status: 'success', data: updatedProfile})
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// @route PUT exercises/sets/:exerciseId/:setId
// @desc Update exercise set
// @access PRIVATE
router.put('/:exerciseId/:setId', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

// @route DELETE exercises/sets/:exerciseId/:setId
// @desc Delete exercise set
// @access PRIVATE
router.delete('/:exerciseId/:setId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const exerciseSet = await ExerciseSet.findById(req.params.setId)

    if (exerciseSet !== null) {
      if (exerciseSet.user.toString() !== req.user.id) {
        errors.exerciseSet = 'Unauthorized'
        return res.status(401).json(errors)
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
