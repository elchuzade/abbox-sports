const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Input Validation
const validateExerciseInput = require('../../validation/exercise')

const Profile = require('../../models/Profile')
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

    const profile = await Profile.findOne({ user: req.user.id })
    // Create a new exercise
    const exercise = new Exercise({
      user: req.user.id,
      name: req.body.name,
      tags: req.body.tags
    })
    // Save created exercise
    const createdExercise = await exercise.save()

    profile.exercises.unshift(createdExercise._id)
    const savedProfile = await profile.save()

    // Return result of updated exercise
    return res.status(200).json({ message: 'Created Exercise', status: 'success', data: { exercise: createdExercise, profile: savedProfile } })
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
    const exercise = await Exercise.findById(req.params.id).populate('exerciseSets')

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
            // Check if the exercise.icon already exists? delete and make a new one
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
                .then(savedExercise => res.status(200).json({ message: 'Uploaded Exercise Icon', status: 'success', data: savedExercise }))
                .catch(err => {
                  console.log(err)
                  errors.exercise = 'Could not upload Exercise Icon'
                  return res.status(404).json(errors)
                })
            })
          }
        })
      } else {
        // Check if the exercise.icon already exists? delete and make a new one
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
            .then(savedExercise => res.status(200).json({ message: 'Uploaded Exercise Icon', status: 'success', data: savedExercise }))
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
