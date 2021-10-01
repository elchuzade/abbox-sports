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
    exercises: [
      {
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'exercise',
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