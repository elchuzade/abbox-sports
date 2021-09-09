const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Input Validation
const validateProfileInput = require('../../validation/profile')

const Profile = require('../../models/Profile')

// AWS IMAGES
const aws = require('aws-sdk')
const config = require('../../config/keys')
const upload = require('../files')
const profileIcon = upload.uploadProfileIcon.single('profileIcon')

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: 'eu-central-1'
})

const s3 = new aws.S3()

// @route PUT profiles/
// @desc Update profile
// @access PRIVATE
router.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)
  // Check for validation errors
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    if (profile !== null) {
      if (profile.deleted) {
        errors.profile = 'Profile is deleted'
        return res.status(400).json(errors)
      }
      // Updated fields
      profile.name = req.body.name
      // Save made updates
      const updatedProfile = await profile.save()
      // Return result of updated profile
      return res.status(200).json({ message: 'Updated Profile', status: 'success', data: updatedProfile })
    }
  } catch (error) {
    console.log(error)
    errors.profile = 'Profile not found'
    return res.status(404).json(errors)
  }
})

// @route DELETE profiles/
// @desc Delete profile
// @access PRIVATE
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    if (profile !== null) {
      if (profile.deleted) {
        errors.profile = 'Profile is deleted'
        return res.status(400).json(errors)
      }
      // Updated fields
      profile.deleted = true
      // Save made updates
      const deletedProfile = await profile.save()
      // Return result of updated profile
      return res.status(200).json({ message: 'Deleted Profile', status: 'success', data: deletedProfile })
    }
  } catch (error) {
    console.log(error)
    errors.profile = 'Profile not found'
    return res.status(404).json(errors)
  }
})

// @route GET profiles/
// @desc Get profile
// @access PRIVATE
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    if (profile !== null) {
      if (profile.deleted) {
        errors.profile = 'Profile is deleted'
        return res.status(400).json(errors)
      }
      
      // Return found profile
      return res.status(200).json({ message: 'Found Profile', status: 'success', data: profile })
    }
  } catch (error) {
    console.log(error)
    errors.profile = 'Profile not found'
    return res.status(404).json(errors)
  }
})

// IMAGE ROUTES

// @route POST profiles/icon
// @desc Upload exercise.icon
// @access PRIVATE
router.post('/icon', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    if (profile !== null) {
      if (profile.deleted) {
        errors.profile = 'Profile is deleted'
        return res.status(401).json(errors)
      }
      // Check if the profile.icon already exists? delete and make a new one
      if (profile.icon && profile.icon.key) {
        const params = {
          Bucket: profile.icon.bucket,
          Delete: {
            Objects: [{ Key: profile.icon.key }]
          }
        }
        s3.deleteObjects(params, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            // Create Exercise Icon
            profileIcon(req, res, err => {
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
              profile.icon.location = req.file.location
              profile.icon.key = req.file.key
              profile.icon.bucket = req.file.bucket
              profile.icon.originalname = req.file.originalname
              profile.icon.mimetype = req.file.mimetype
              profile.icon.size = req.file.size
              profile.icon.fieldName = req.file.metadata.fieldName

              profile
                .save()
                .then(savedProfile => res.status(200).json({ message: 'Uploaded Profile Icon', status: 'success', data: savedProfile }))
                .catch(err => {
                  console.log(err)
                  errors.exercise = 'Could not upload Profile Icon'
                  return res.status(404).json(errors)
                })
            })
          }
        })
      } else {
        // Create Exercise Icon
        profileIcon(req, res, err => {
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
          profile.icon.location = req.file.location
          profile.icon.key = req.file.key
          profile.icon.bucket = req.file.bucket
          profile.icon.originalname = req.file.originalname
          profile.icon.mimetype = req.file.mimetype
          profile.icon.size = req.file.size
          profile.icon.fieldName = req.file.metadata.fieldName

          profile
            .save()
            .then(savedProfile => res.status(200).json({ message: 'Uploaded Profile Icon', status: 'success', data: savedProfile }))
            .catch(err => {
              console.log(err)
              errors.profile = 'Could not upload Profile Icon'
              return res.status(404).json(errors)
            })
        })
      }
    }
  } catch (error) {
    console.log(error)
    errors.profile = 'Could not upload Profile Icon'
    return res.status(404).json(errors)
  }
})

module.exports = router
