const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: { type: String, required: true },
    fitnessPreferences: {
      workoutTypes: [
        {
          type: String,
          enum: ['Strength', 'Cardio', 'Flexibility', 'Mobility'],
        },
      ],
      intensityLevel: { type: Number, min: 1, max: 10 },
      preferredEquipment: [{ type: String }],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

// Hash password before updating
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, SALT_ROUNDS);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
