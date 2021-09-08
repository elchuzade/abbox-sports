const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Input Validation
const validateExerciseInput = require('../../validation/exercise')

const Exercise = require('../../models/Exercise')

// AWS IMAGES
const aws = require('aws-sdk')
const config = require('../../config/keys')
const upload = require('../files')
const exerciseIcon = upload.uploadExerciseIcon.single('exerciseIcon')

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: 'eu-central-1'
})

const s3 = new aws.S3()

// @route POST exercises/
// @desc Create exercise
// @access PRIVATE
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateExerciseInput(req.body)
  // Check for validation errors
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    // Create a new exercise
    const exercise = new Exercise({
      user: req.user.id,
      name: req.body.name
    })
    // Save created exercise
    const createdExercise = await exercise.save()
    // Return result of updated exercise
    return res.status(200).json({ message: 'Created Exercise', status: 'success', data: createdExercise })
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not created'
    return res.status(404).json(errors)
  }
})

// @route PUT exercises/:id
// @desc Update exercise
// @access PRIVATE
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateExerciseInput(req.body)
  // Check for validation errors
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const exercise = await Exercise.findById(req.params.id)

    if (exercise !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }
      if (exercise.deleted) {
        errors.exercise = 'Exercise is deleted'
        return res.status(400).json(errors)
      }
      // Updated fields
      exercise.name = req.body.name
      // Save made updates
      const updatedExercise = await exercise.save()
      // Return result of updated exercise
      return res.status(200).json({ message: 'Updated Exercise', status: 'success', data: updatedExercise })
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// @route DELETE exercises/:id
// @desc Delete exercise
// @access PRIVATE
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const exercise = await Exercise.findById(req.params.id)

    if (exercise !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }
      if (exercise.deleted) {
        errors.exercise = 'Exercise is deleted'
        return res.status(401).json(errors)
      }
      // Updated fields
      exercise.deleted = true
      // Save made updates
      const deletedExercise = await exercise.save()
      // Return result of updated exercise
      return res.status(200).json({ message: 'Deleted Exercise', status: 'success', data: deletedExercise })
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// @route GET exercises/:id
// @desc Get exercise
// @access PRIVATE
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const exercise = await Exercise.findById(req.params.id)

    if (exercise !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }
      if (exercise.deleted) {
        errors.exercise = 'Exercise is deleted'
        return res.status(401).json(errors)
      }
      
      // Return found exercise
      return res.status(200).json({ message: 'Found Exercise', status: 'success', data: exercise })
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// @route GET exercises/
// @desc Get all exercises
// @access PRIVATE
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const exercises = await Exercise.find({ deleted: false })

    if (exercises !== null) {      
      // Return found exercise
      return res.status(200).json({ message: 'Found Exercises', status: 'success', data: exercises })
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercises not found'
    return res.status(404).json(errors)
  }
})

// @route POST exercises/:id/participate
// @desc Follow the exercise
// @access PRIVATE
router.post('/:id/participate', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

      // remove current user from exercise participans and add again
      exercise.participants = exercise.participants.filter(p => p.toString() !== req.user.id)
      exercise.participants.push(req.user.id)

      // remove current exercise from profile exercises and add again
      profile.exercises = profile.exercises.filter(e => e._id.toString() !== exercise._id.toString())
      profile.exercises.push(exercise._id)

      // Save made updates
      const updatedProfile = await profile.save()
      const updatedExercise = await exercise.save()

      // Return result of updated exercise
      return res.status(200).json({ message: 'Participated in Exercise', status: 'success', data: { exercise: updatedExercise, profile: updatedProfile }})
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// @route POST exercises/:id/not-participate
// @desc Unfollow the exercise
// @access PRIVATE
router.post('/:id/not-participate', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

      // remove current user from exercise participans and add again
      exercise.participants = exercise.participants.filter(p => p.toString() !== req.user.id)

      // remove current exercise from profile exercises and add again
      profile.exercises = profile.exercises.filter(e => e._id.toString() !== exercise._id.toString())
      
      // Save made updates
      const updatedProfile = await profile.save()
      const updatedExercise = await exercise.save()

      // Return result of updated exercise
      return res.status(200).json({ message: 'Not Participated in Exercise', status: 'success', data: { exercise: updatedExercise, profile: updatedProfile }})
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Exercise not found'
    return res.status(404).json(errors)
  }
})

// SETS

// @route GET exercises/
// @desc Get all exercises
// @access PRIVATE
router.post('/:id/sets', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  // TODO: Add validation for number input for repetition, duration and weight
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
          profile.exercises[i].sets.add({
            repetitions: req.body.repetitions,
            duration: req.body.duration,
            weight: req.body.weight
          })
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

// IMAGE ROUTES

// @route POST exercises/:id/icon
// @desc Upload exercise.icon
// @access PRIVATE
router.post('/:id/icon', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const exercise = await Exercise.findById(req.params.id)

    if (exercise !== null) {
      if (exercise.user.toString() !== req.user.id) {
        errors.exercise = 'Unautorized'
        return res.status(401).json(errors)
      }
      if (exercise.deleted) {
        errors.exercise = 'Exercise is deleted'
        return res.status(401).json(errors)
      }
      // Check if the exercise.icon already exists? delete and make a new one
      if (exercise.icon && exercise.icon.key) {
        const params = {
          Bucket: exercise.icon.bucket,
          Delete: {
            Objects: [{ Key: exercise.icon.key }]
          }
        }
        s3.deleteObjects(params, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            // Create Exercise Icon
            exerciseIcon(req, res, err => {
              if (err) {
                console.log(err)
                errors.uploadfail = 'Failed to upload an image'
                return res.status(400).json(errors)
              }
              if (req.file == undefined) {
                console.log(err)
                errors.selectfail = 'No file selected'
                return res.json(errors)
              }
              exercise.icon.location = req.file.location
              exercise.icon.key = req.file.key
              exercise.icon.bucket = req.file.bucket
              exercise.icon.originalname = req.file.originalname
              exercise.icon.mimetype = req.file.mimetype
              exercise.icon.size = req.file.size
              exercise.icon.fieldName = req.file.metadata.fieldName

              exercise
                .save()
                .then(savedGame => res.status(200).json({ message: 'Uploaded Exercise Icon', status: 'success', data: savedGame }))
                .catch(err => {
                  console.log(err)
                  errors.exercise = 'Could not upload Exercise Icon'
                  return res.status(404).json(errors)
                })
            })
          }
        })
      } else {
        // Create Exercise Icon
        exerciseIcon(req, res, err => {
          if (err) {
            console.log(err)
            errors.uploadfail = 'Failed to upload an image'
            return res.status(400).json(errors)
          }
          if (req.file == undefined) {
            console.log(err)
            errors.selectfail = 'No file selected'
            return res.json(errors)
          }
          exercise.icon.location = req.file.location
          exercise.icon.key = req.file.key
          exercise.icon.bucket = req.file.bucket
          exercise.icon.originalname = req.file.originalname
          exercise.icon.mimetype = req.file.mimetype
          exercise.icon.size = req.file.size
          exercise.icon.fieldName = req.file.metadata.fieldName

          exercise
            .save()
            .then(savedGame => res.status(200).json({ message: 'Uploaded Exercise Icon', status: 'success', data: savedGame }))
            .catch(err => {
              console.log(err)
              errors.exercise = 'Could not upload Exercise Icon'
              return res.status(404).json(errors)
            })
        })
      }
    }
  } catch (error) {
    console.log(error)
    errors.exercise = 'Could not upload Exercise Icon'
    return res.status(404).json(errors)
  }
})

module.exports = router
