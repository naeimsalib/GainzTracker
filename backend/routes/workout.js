const express = require('express');
const router = express.Router();
const workoutCtrl = require('../controllers/workouts');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// Fetch shared workouts
router.get('/community', ensureLoggedIn, workoutCtrl.getSharedWorkouts);

// Existing workout routes
router.get('/', ensureLoggedIn, workoutCtrl.getAllWorkouts);
router.get('/:id', ensureLoggedIn, workoutCtrl.getWorkoutById);
router.post('/', ensureLoggedIn, workoutCtrl.createWorkout);
router.put('/:id', ensureLoggedIn, workoutCtrl.updateWorkout);
router.delete('/:id', ensureLoggedIn, workoutCtrl.deleteWorkout);
router.post('/:id/save', ensureLoggedIn, workoutCtrl.saveWorkout);
router.put(
  '/:id/add-exercises',
  ensureLoggedIn,
  workoutCtrl.addExercisesToWorkout
);
router.put('/:id/share', ensureLoggedIn, workoutCtrl.shareWorkout);
module.exports = router;
