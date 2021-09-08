const express = require('express')
const router = express.Router()
const passport = require('passport')

const Exercise = require('../../models/Exercise')
const Profile = require('../../models/Profile')
const ExerciseSet = require('../../models/ExerciseSet')


// @route GET exercises/:id/sets
// @desc Get all exercise sets
// @access PRIVATE
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    let sets = []

    if (profile !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }

      // Find exercise from profile exercises and add this set
      for (let i = 0; i < profile.exercises.length; i++) {
        if (profile.exercises[i].exercise === req.params.id) {
          // Found exercise
          sets = profile.exercises[i].exercise.sets
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

// @route POST exercises/:exerciseId/sets
// @desc Add exercise set
// @access PRIVATE
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    if (profile !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }

      // Find exercise from profile exercises and add this set
      for (let i = 0; i < profile.exercises.length; i++) {
        if (profile.exercises[i].exercise === req.params.id) {
          // Found exercise
          let newExercise = new ExerciseSet({
            user: req.user.id,
            exercise: req.params.exerciseId,
            repetitions: req.body.repetitions,
            duration: req.body.duration,
            weight: req.body.weight
          })

          const savedExercise = await newExercise.save()

          profile.exercises[i].sets.add(savedExercise)
          return
        }
      }

      // Save made updates
      const updatedProfile = await profile.save()

      // Return result of updated exercise
      return res.status(200).json({ message: 'Not Participated in Exercise', status: 'success', data: { exercise: updatedExercise, profile: updatedProfile }})
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// @route PUT exercises/:id/sets/:setId
// @desc Update exercise set
// @access PRIVATE
router.put('/:id/sets/:setId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const exercise = await Exercise.findById(req.params.id)
    const profile = await Profile.findOne({ user: req.user.id })

    if (exercise !== null && profile !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }
      if (exercise.deleted) {
        errors.exercise = 'Exercise is deleted'
        return res.status(400).json(errors)
      }

      // Find exercise from profile exercises and add this set
      for (let i = 0; i < profile.exercises.length; i++) {
        if (profile.exercises[i].exercise === req.params.id) {
          // Found exercise
          for (let j = 0; j < profile.exercises[i].exercises.sets.length; j++) {
            if (profile.exercises[i].exercise.sets[j]._id.toString() === req.params.setId) {
              profile.exercises[i].exercise.sets[j].repetitions = req.body.repetitions
              profile.exercises[i].exercise.sets[j].duration = req.body.duration
              profile.exercises[i].exercise.sets[j].weight = req.body.weight
            }
          }
        }
      }
    }

    // Save made updates
    const updatedProfile = await profile.save()

    // Return result of updated exercise
    return res.status(200).json({ message: 'Not Participated in Exercise', status: 'success', data: { exercise: updatedExercise, profile: updatedProfile }})
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// @route DELETE exercises/:id/sets/:setId
// @desc Delete exercise set
// @access PRIVATE
router.delete('/:id/sets/:setId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const exercise = await Exercise.findById(req.params.id)
    const profile = await Profile.findOne({ user: req.user.id })

    if (exercise !== null && profile !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }
      if (exercise.deleted) {
        errors.exercise = 'Exercise is deleted'
        return res.status(400).json(errors)
      }

      // Find exercise from profile exercises and add this set
      for (let i = 0; i < profile.exercises.length; i++) {
        if (profile.exercises[i].exercise === req.params.id) {
          // Found exercise
          profile.exercises[i].exercise.sets.fiter(s => s._id.toString() !== req.params.setId)
        }
      }
    }

    // Save made updates
    const updatedProfile = await profile.save()

    // Return result of updated exercise
    return res.status(200).json({ message: 'Not Participated in Exercise', status: 'success', data: { exercise: updatedExercise, profile: updatedProfile }})
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})


module.exports = router
