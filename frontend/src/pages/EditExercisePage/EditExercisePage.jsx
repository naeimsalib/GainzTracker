import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getExerciseById, updateExercise } from '../../services/exerciseService';
import './EditExercisePage.css';

export default function EditExercisePage() {
  const { id } = useParams();
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
    notes: '',
  });

  useEffect(() => {
    async function fetchExercise() {
      try {
        const data = await getExerciseById(id);
        setExerciseData(data);
      } catch (err) {
        console.error("Error fetching exercise:", err);
      }
    }
    fetchExercise();
  }, [id]);

  function handleChange(e) {
    setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateExercise(id, exerciseData);
      navigate('/exercises');
    } catch (err) {
      console.error("Error updating exercise:", err);
    }
  }

  return (
    <div className="edit-exercise-container">
      <h1>Edit Exercise</h1>
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

        <div className="form-group">
          <div className="input-group">
            <label>Sets</label>
            <input type="number" name="sets" value={exerciseData.sets} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Reps</label>
            <input type="number" name="reps" value={exerciseData.reps} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Rest Time (s)</label>
            <input type="number" name="restTime" value={exerciseData.restTime} onChange={handleChange} required />
          </div>
        </div>

        <label>Notes</label>
        <textarea name="notes" value={exerciseData.notes} onChange={handleChange}></textarea>

        <button type="submit">Update Exercise</button>
      </form>
    </div>
  );
}
