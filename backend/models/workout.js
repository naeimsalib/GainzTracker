const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Check if the model already exists before defining it
const Workout =
  mongoose.models.Workout ||
  mongoose.model(
    'Workout',
    new Schema(
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        dayOfWeek: {
          type: String,
          enum: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          required: true,
        },
        workoutType: {
          type: String,
          enum: ['Strength', 'Cardio', 'Flexibility', 'Mobility'],
          required: true,
        },
        duration: { type: Number, required: true },
        exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
        notes: { type: String },
        intensityLevel: { type: Number, min: 1, max: 10 },
        sharedWithCommunity: { type: Boolean, default: false },
      },
      { timestamps: true }
    )
  );

module.exports = Workout;
