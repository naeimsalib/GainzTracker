const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../controllers/exercises');

// GET all shared exercises
router.get('/community', exercisesCtrl.getSharedExercises);

// GET all exercises for the logged-in user
router.get('/', exercisesCtrl.getAllExercises);

// GET a single exercise by ID
router.get('/:id', exercisesCtrl.getExerciseById);

// POST (create) a new exercise
router.post('/', exercisesCtrl.createExercise);

// PUT (update) an existing exercise
router.put('/:id', exercisesCtrl.updateExercise);

// PUT (share an exercise)
router.put('/:id/share', exercisesCtrl.shareExercise);

// DELETE an exercise
router.delete('/:id', exercisesCtrl.deleteExercise);

module.exports = router;
