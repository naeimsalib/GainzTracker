const express = require('express');
const router = express.Router();
const workoutCtrl = require('../controllers/workouts');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// API Routes for Workouts
router.get('/', ensureLoggedIn, workoutCtrl.getAllWorkouts);
router.get('/:id', ensureLoggedIn, workoutCtrl.getWorkoutById);
router.post('/', ensureLoggedIn, workoutCtrl.createWorkout);
router.put('/:id', ensureLoggedIn, workoutCtrl.updateWorkout);
router.delete('/:id', ensureLoggedIn, workoutCtrl.deleteWorkout);

// ✅ Add this missing PUT route to add exercises to a workout
router.put(
  '/:id/add-exercises',
  ensureLoggedIn,
  workoutCtrl.addExercisesToWorkout
);

module.exports = router;
