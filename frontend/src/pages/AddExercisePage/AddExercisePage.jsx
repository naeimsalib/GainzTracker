import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExercise } from '../../services/exerciseService';
import './AddExercisePage.css';

export default function AddExercisePage() {
  const navigate = useNavigate();
  const [exerciseData, setExerciseData] = useState({
    name: '',
    category: '',
    muscleGroup: '',
    equipment: '',
    difficultyLevel: '',
    sets: '',
    reps: '',
    restTime: '',
    video: '',
    note: '',
  });

  function handleChange(e) {
    setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createExercise(exerciseData);
      navigate('/exercises'); // Redirect back to exercises list
    } catch (err) {
      console.error("Error creating exercise:", err);
    }
  }

  return (
    <div className="AddExercisePage">
      <h1>New Exercise</h1>
      <form onSubmit={handleSubmit} className="exercise-form">
        <label>Exercise Name</label>
        <input type="text" name="name" value={exerciseData.name} onChange={handleChange} required />

        <label>Category</label>
        <input type="text" name="category" value={exerciseData.category} onChange={handleChange} required />

        <label>Muscle Group</label>
        <input type="text" name="muscleGroup" value={exerciseData.muscleGroup} onChange={handleChange} required />

        <label>Equipment</label>
        <input type="text" name="equipment" value={exerciseData.equipment} onChange={handleChange} />

        <label>Difficulty Level</label>
        <input type="text" name="difficultyLevel" value={exerciseData.difficultyLevel} onChange={handleChange} />

        <label>Sets</label>
        <input type="number" name="sets" value={exerciseData.sets} onChange={handleChange} />

        <label>Reps</label>
        <input type="number" name="reps" value={exerciseData.reps} onChange={handleChange} />

        <label>Rest Time</label>
        <input type="text" name="restTime" value={exerciseData.restTime} onChange={handleChange} />

        <label>Video</label>
        <input type="text" name="video" value={exerciseData.video} onChange={handleChange} />

        <label>Exercise Note</label>
        <textarea name="note" value={exerciseData.note} onChange={handleChange}></textarea>

        <button type="submit">Save Workout</button>
      </form>
    </div>
  );
}
