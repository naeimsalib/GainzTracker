const express = require('express');
const router = express.Router();
const workoutCtrl = require('../controllers/workouts');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// GET all workouts
router.get('/', ensureLoggedIn, workoutCtrl.getAllWorkouts);

// GET a specific workout by ID
router.get('/:id', ensureLoggedIn, workoutCtrl.getWorkoutById);

// POST create a new workout
router.post('/', ensureLoggedIn, workoutCtrl.createWorkout);

// PUT update a workout
router.put('/:id', ensureLoggedIn, workoutCtrl.updateWorkout);

// DELETE a workout
router.delete('/:id', ensureLoggedIn, workoutCtrl.deleteWorkout);

module.exports = router;
