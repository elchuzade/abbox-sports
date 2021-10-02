const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercise',
      required: true
    },
    repetitions: {
      type: Number
    },
    duration: {
      type: Number
    },
    weight: {
      type: Number
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false
    }
  }, { timestamps: true }
)

module.exports = ExerciseSet = mongoose.model('exerciseSet', ExerciseSetSchema)