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
            type: Schema.Types.ObjectId,
            ref: 'exerciseSet',
          }
        ],
        deleted: {
          type: Boolean,
          required: true,
          default: false
        },
        joinedAt: {
          type: Date,
          required: true,
          default: Date.now()
        },
        leftAt: {
          type: Date
        },
        rejoinedAt: {
          type: Date
        }
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