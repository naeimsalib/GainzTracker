const express = require('express');
const router = express.Router();
const workoutCtrl = require('../controllers/workouts');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// ✅ Fetch shared workouts
router.get('/community', ensureLoggedIn, workoutCtrl.getSharedWorkouts);

// ✅ Fetch saved workouts
router.get('/saved', ensureLoggedIn, workoutCtrl.getSavedWorkouts);

// ✅ Workout CRUD routes
router.get('/', ensureLoggedIn, workoutCtrl.getAllWorkouts);
router.get('/:id', ensureLoggedIn, workoutCtrl.getWorkoutById);
router.post('/', ensureLoggedIn, workoutCtrl.createWorkout);
router.put('/:id', ensureLoggedIn, workoutCtrl.updateWorkout);
router.delete('/:id', ensureLoggedIn, workoutCtrl.deleteWorkout);
router.post('/:id/save', ensureLoggedIn, workoutCtrl.saveWorkout);

// ✅ Exercise-related routes
router.put(
  '/:id/add-exercises',
  ensureLoggedIn,
  workoutCtrl.addExercisesToWorkout
);

// ✅ Sharing/unsharing routes
router.put('/:id/share', ensureLoggedIn, workoutCtrl.shareWorkout);
router.put('/:id/unshare', ensureLoggedIn, workoutCtrl.unshareWorkout);

module.exports = router;
