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

// route for saving workouts
router.post('/:id/save', ensureLoggedIn, workoutCtrl.saveWorkout);

module.exports = router;
