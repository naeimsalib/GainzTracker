const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
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
    workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
    sharedWithCommunity: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
