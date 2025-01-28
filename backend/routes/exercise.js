const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../controllers/exercises');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// GET all shared exercises
router.get('/community', exercisesCtrl.getSharedExercises);

// GET all exercises for the logged-in user
router.get('/', ensureLoggedIn, exercisesCtrl.getAllExercises);

// GET a single exercise by ID
router.get('/:id', ensureLoggedIn, exercisesCtrl.getExerciseById);

// POST (create) a new exercise
router.post('/', ensureLoggedIn, exercisesCtrl.createExercise);

// PUT (update) an existing exercise
router.put('/:id', ensureLoggedIn, exercisesCtrl.updateExercise);

// PUT (share an exercise)
router.put('/:id/share', ensureLoggedIn, exercisesCtrl.shareExercise);

// PUT (unshare an exercise)
router.put('/:id/unshare', ensureLoggedIn, exercisesCtrl.unshareExercise);

// DELETE an exercise
router.delete('/:id', ensureLoggedIn, exercisesCtrl.deleteExercise);

// Save an exercise
router.post('/:id/save', ensureLoggedIn, exercisesCtrl.saveExercise);

module.exports = router;
