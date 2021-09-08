const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    name: {
      type: String
    },
    icon: {
      location: {
        type: String
      },
      key: {
        type: String
      },
      bucket: {
        type: String
      },
      originalname: {
        type: String
      },
      mimetype: {
        type: String
      },
      size: {
        type: Number
      },
      fieldName: {
        type: String
      }
    },
    participants: [
      {
        participant: {
          type: Schema.Types.ObjectId,
          ref: 'user'
        },
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
    tags: [String],
    deleted: {
      type: Boolean,
      required: true,
      default: false
    }
  }, { timestamps: true }
)

module.exports = Exercise = mongoose.model('exercise', ExerciseSchema)