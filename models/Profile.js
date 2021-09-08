const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    name: {
      type: String
    },
    exercises: [
      {
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'exercise',
        },
        sets: [
          {
            repetitions: {
              type: Number
            },
            duration: {
              type: Number
            },
            weight: {
              type: Number
            }
          }
        ],
      }
    ],
    deleted: {
      type: Boolean,
      required: true,
      default: false
    }
  }, { timestamps: true }
)

module.exports = Profile = mongoose.model('profile', ProfileSchema)