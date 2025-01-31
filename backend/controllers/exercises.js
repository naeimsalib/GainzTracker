const Exercise = require('../models/exercise');
const mongoose = require('mongoose');

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  shareExercise,
  unshareExercise,
  getSharedExercises,
  saveExercise,
};

//  GET All Exercises for Logged-in User
async function getAllExercises(req, res) {
  try {
    const exercises = await Exercise.find({ user: req.user._id });
    res.json(exercises);
  } catch (err) {
    console.error('Error retrieving exercises:', err);
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
    console.error('Error retrieving the exercise:', err);
    res.status(500).json({ message: 'Error retrieving the exercise' });
  }
}

//  POST (Create) a New Exercise
async function createExercise(req, res) {
  try {
    const newExercise = new Exercise({
      ...req.body,
      user: req.user._id,
    });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    console.error('Error creating exercise:', err);
    res
      .status(500)
      .json({ message: 'Failed to create exercise', error: err.message });
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
    console.error('Error updating exercise:', err);
    res.status(400).json({ message: 'Error updating exercise' });
  }
}

//  DELETE an Exercise
async function deleteExercise(req, res) {
  try {
    const exercise = await Exercise.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!exercise)
      return res
        .status(404)
        .json({ message: 'Exercise not found or unauthorized' });
    res.json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    console.error('Error deleting exercise:', err);
    res
      .status(500)
      .json({ message: 'Failed to delete exercise', error: err.message });
  }
}

//  PUT (Share) an Exercise
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

//  PUT (Unshare) an Exercise
async function unshareExercise(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Exercise ID format' });
    }

    const exercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { sharedWithCommunity: false },
      { new: true }
    );

    if (!exercise) {
      return res.status(404).json({
        message:
          "Exercise not found or you don't have permission to unshare it.",
      });
    }

    res.json({ message: 'Exercise unshared successfully!', exercise });
  } catch (err) {
    console.error('Error unsharing exercise:', err);
    res
      .status(500)
      .json({ message: 'Error unsharing exercise', error: err.message });
  }
}

//  GET All Shared Exercises
async function getSharedExercises(req, res) {
  try {
    const exercises = await Exercise.find({
      sharedWithCommunity: true,
    }).populate('user', 'name');
    res.json(exercises);
  } catch (err) {
    console.error('Error retrieving shared exercises:', err);
    res.status(500).json({ message: 'Error retrieving shared exercises' });
  }
}

//  POST (Save) a Shared Exercise to User's Account
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
