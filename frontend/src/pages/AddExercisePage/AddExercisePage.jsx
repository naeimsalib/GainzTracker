import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExercise } from '../../services/exerciseService';
import './AddExercisePage.css';

export default function AddExercisePage() {
  const navigate = useNavigate();
  const [exerciseData, setExerciseData] = useState({
    name: '',
    category: 'Strength',
    muscleGroup: '',
    equipment: '',
    difficultyLevel: 'Beginner',
    sets: '',
    reps: '',
    restTime: '',
    video: '',
    notes: '',
    sharedWithCommunity: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setExerciseData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(exerciseData); // Debugging: Check the form data
      await createExercise(exerciseData);
      navigate('/exercises');
    } catch (err) {
      console.error('Error creating exercise:', err);
    }
  }

  return (
    <div className="add-exercise-container">
      <h1>Add Exercise</h1>
      <form onSubmit={handleSubmit} className="exercise-form">
        <label>Exercise Name</label>
        <input type="text" name="name" value={exerciseData.name} onChange={handleChange} required />

        <label>Category</label>
        <select name="category" value={exerciseData.category} onChange={handleChange} required>
          <option value="Strength">Strength</option>
          <option value="Cardio">Cardio</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Mobility">Mobility</option>
        </select>

        <label>Muscle Group</label>
        <input type="text" name="muscleGroup" value={exerciseData.muscleGroup} onChange={handleChange} required />

        <label>Equipment</label>
        <input type="text" name="equipment" value={exerciseData.equipment} onChange={handleChange} />

        <label>Difficulty Level</label>
        <select name="difficultyLevel" value={exerciseData.difficultyLevel} onChange={handleChange} required>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Sets</label>
        <input type="number" name="sets" value={exerciseData.sets} onChange={handleChange} required />

        <label>Reps</label>
        <input type="number" name="reps" value={exerciseData.reps} onChange={handleChange} required />

        <label>Rest Time (seconds)</label>
        <input type="number" name="restTime" value={exerciseData.restTime} onChange={handleChange} required />

        <label>Video URL</label>
        <input type="text" name="video" value={exerciseData.video} onChange={handleChange} />

        <label>Notes</label>
        <textarea name="notes" value={exerciseData.notes} onChange={handleChange}></textarea>

        <label>
          <input type="checkbox" name="sharedWithCommunity" checked={exerciseData.sharedWithCommunity} onChange={handleChange} />
          Share with Community
        </label>

        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
}