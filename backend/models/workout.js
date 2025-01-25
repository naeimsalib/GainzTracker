const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Strength', 'Cardio', 'Flexibility', 'Mobility'],
      required: true,
    },
    muscleGroup: { type: String, required: true },
    equipment: { type: String },
    difficultyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    sets: { type: Number },
    reps: { type: Number },
    restTime: { type: Number },
    video: { type: String },
    notes: { type: String },
    workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }], // Linking exercises to workouts
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exercise', exerciseSchema);
