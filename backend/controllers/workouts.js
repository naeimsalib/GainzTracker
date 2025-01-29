const Workout = require('../models/workout');
const Exercise = require('../models/exercise');

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  addExercisesToWorkout,
  getSharedWorkouts,
  saveWorkout,
  shareWorkout,
  unshareWorkout,
  getSavedWorkouts,
};

// ✅ Fetch all workouts for the logged-in user
async function getAllWorkouts(req, res) {
  try {
    const workouts = await Workout.find({ user: req.user._id }).populate(
      'exercises'
    );
    res.json(workouts);
  } catch (err) {
    console.error('Error Fetching Workouts:', err);
    res
      .status(500)
      .json({ message: 'Failed to fetch workouts', error: err.message });
  }
}

// ✅ Fetch a single workout by ID
async function getWorkoutById(req, res) {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('exercises');
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    console.error('Error Fetching Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to fetch workout', error: err.message });
  }
}

// ✅ Create a new workout
async function createWorkout(req, res) {
  try {
    const {
      title,
      dayOfWeek,
      workoutType,
      duration,
      exercises,
      sharedWithCommunity,
    } = req.body;

    if (!title || !dayOfWeek || !workoutType || !duration) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newWorkout = await Workout.create({
      title,
      dayOfWeek,
      workoutType,
      duration: Number(duration),
      exercises: exercises || [],
      sharedWithCommunity: sharedWithCommunity || false,
      user: req.user._id,
    });

    res.status(201).json(newWorkout);
  } catch (err) {
    console.error('Error Creating Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to create workout', error: err.message });
  }
}

// ✅ Update a workout
async function updateWorkout(req, res) {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!workout) {
      return res
        .status(404)
        .json({ message: 'Workout not found or unauthorized' });
    }
    res.json(workout);
  } catch (err) {
    console.error('Error Updating Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to update workout', error: err.message });
  }
}

// ✅ Delete a workout
async function deleteWorkout(req, res) {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!workout)
      return res
        .status(404)
        .json({ message: 'Workout not found or unauthorized' });

    res.json({ message: 'Workout deleted successfully' });
  } catch (err) {
    console.error('Error deleting workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to delete workout', error: err.message });
  }
}

// ✅ Add exercises to a workout
async function addExercisesToWorkout(req, res) {
  try {
    const { exercises } = req.body;
    if (!Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({ message: 'Invalid exercise list' });
    }
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    const existingExercises = await Exercise.find({ _id: { $in: exercises } });
    if (existingExercises.length !== exercises.length) {
      return res
        .status(400)
        .json({ message: 'One or more exercises do not exist' });
    }
    const newExercises = exercises.filter(
      (ex) => !workout.exercises.includes(ex)
    );
    workout.exercises.push(...newExercises);
    await workout.save();
    res.json(workout);
  } catch (err) {
    console.error('Error adding exercises:', err);
    res
      .status(500)
      .json({
        message: 'Failed to add exercises to workout',
        error: err.message,
      });
  }
}

// ✅ Fetch shared workouts
async function getSharedWorkouts(req, res) {
  try {
    const sharedWorkouts = await Workout.find({ sharedWithCommunity: true })
      .populate('user', 'name')
      .populate('exercises');
    res.json(sharedWorkouts);
  } catch (err) {
    console.error('Error Fetching Shared Workouts:', err);
    res
      .status(500)
      .json({ message: 'Failed to fetch shared workouts', error: err.message });
  }
}

// ✅ Save a shared workout to the user's account
async function saveWorkout(req, res) {
  try {
    const sharedWorkout = await Workout.findById(req.params.id).populate(
      'exercises'
    );
    if (!sharedWorkout)
      return res.status(404).json({ message: 'Workout not found' });

    const copiedWorkout = new Workout({
      title: sharedWorkout.title,
      dayOfWeek: sharedWorkout.dayOfWeek,
      workoutType: sharedWorkout.workoutType,
      duration: sharedWorkout.duration,
      exercises: [...sharedWorkout.exercises],
      user: req.user._id,
    });

    await copiedWorkout.save();
    res.json(copiedWorkout);
  } catch (err) {
    console.error('Error Saving Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to save workout', error: err.message });
  }
}

// ✅ Share a workout
async function shareWorkout(req, res) {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { sharedWithCommunity: true },
      { new: true }
    );

    if (!workout) {
      return res
        .status(404)
        .json({ message: 'Workout not found or unauthorized.' });
    }

    res.json({ message: 'Workout shared successfully!', workout });
  } catch (err) {
    console.error('Error Sharing Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to share workout', error: err.message });
  }
}

// ✅ Unshare a workout
async function unshareWorkout(req, res) {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { sharedWithCommunity: false },
      { new: true }
    );

    if (!workout) {
      return res
        .status(404)
        .json({ message: 'Workout not found or unauthorized.' });
    }

    res.json({ message: 'Workout unshared successfully!', workout });
  } catch (err) {
    console.error('Error Unsharing Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to unshare workout', error: err.message });
  }
}

// ✅ Fetch saved workouts
async function getSavedWorkouts(req, res) {
  try {
    const savedWorkouts = await Workout.find({
      user: req.user._id,
      sharedWithCommunity: false,
    }).populate('exercises');
    res.json(savedWorkouts);
  } catch (err) {
    console.error('Error Fetching Saved Workouts:', err);
    res
      .status(500)
      .json({ message: 'Failed to fetch saved workouts', error: err.message });
  }
}
