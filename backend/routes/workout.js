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

module.exports = router;
