const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// Get all workouts for logged-in user
router.get('/', ensureLoggedIn, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).populate(
      'exercises'
    );
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Get single workout (with exercises)
router.get('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('exercises');
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// Create a workout
router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// Update a workout
router.put('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedWorkout);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// Delete a workout
router.delete('/:id', ensureLoggedIn, async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

module.exports = router;
