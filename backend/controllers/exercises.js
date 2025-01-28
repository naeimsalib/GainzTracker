const Exercise = require('../models/exercise');
const mongoose = require('mongoose');

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  shareExercise,
  getSharedExercises,
  saveExercise,
};

//  GET All Exercises for Logged-in User
async function getAllExercises(req, res) {
  try {
    const exercises = await Exercise.find({ user: req.user._id });
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving exercises' });
  }
}

//  GET a Single Exercise by ID
async function getExerciseById(req, res) {
  try {
    const exercise = await Exercise.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!exercise)
      return res.status(404).json({ message: 'Exercise not found' });
    res.json(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving the exercise' });
  }
}

//  POST (Create) a New Exercise
async function createExercise(req, res) {
  try {
    const newExercise = await Exercise.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(newExercise);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating exercise' });
  }
}

//  PUT (Update) an Existing Exercise
async function updateExercise(req, res) {
  try {
    const updatedExercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedExercise)
      return res.status(404).json({ message: 'Exercise not found' });
    res.json(updatedExercise);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating exercise' });
  }
}

//  DELETE an Exercise
async function deleteExercise(req, res) {
  try {
    const deletedExercise = await Exercise.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deletedExercise)
      return res.status(404).json({ message: 'Exercise not found' });
    res.json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting exercise' });
  }
}

async function shareExercise(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Exercise ID format' });
    }

    const exercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { sharedWithCommunity: true },
      { new: true }
    );

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found or you don't have permission to share it.",
      });
    }

    res.json({ message: 'Exercise shared successfully!', exercise });
  } catch (err) {
    console.error('Error sharing exercise:', err);
    res
      .status(500)
      .json({ message: 'Error sharing exercise', error: err.message });
  }
}

async function getSharedExercises(req, res) {
  try {
    const exercises = await Exercise.find({
      sharedWithCommunity: true,
    }).populate('user', 'name');
    res.json(exercises);
  } catch (err) {
    console.error('Error fetching shared exercises:', err);
    res.status(500).json({ message: 'Error retrieving shared exercises' });
  }
}

async function saveExercise(req, res) {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // Clone the exercise for the logged-in user
    const savedExercise = new Exercise({
      name: exercise.name,
      category: exercise.category,
      muscleGroup: exercise.muscleGroup,
      equipment: exercise.equipment,
      difficultyLevel: exercise.difficultyLevel,
      sets: exercise.sets,
      reps: exercise.reps,
      restTime: exercise.restTime,
      video: exercise.video,
      notes: exercise.notes,
      user: req.user._id, // Assign to the logged-in user
    });

    await savedExercise.save();
    res.json(savedExercise);
  } catch (err) {
    console.error('Error saving exercise:', err);
    res.status(500).json({ message: 'Failed to save exercise' });
  }
}
