const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate exercises with users
    name: { type: String, required: true },
    category: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    equipment: { type: String },
    difficultyLevel: { type: String },
    sets: { type: Number },
    reps: { type: Number },
    restTime: { type: String },
    video: { type: String },
    note: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exercise', exerciseSchema);
