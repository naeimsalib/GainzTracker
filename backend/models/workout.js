const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    workoutType: {
      type: String,
      enum: ['Strength', 'Cardio', 'Flexibility', 'Mobility'],
      required: true,
    },
    duration: { type: Number, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }], // Links to Exercise model
    notes: { type: String },
    intensityLevel: { type: Number, min: 1, max: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
