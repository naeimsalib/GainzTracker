import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExercises, deleteExercise } from '../../services/exerciseService';
import './ExercisesPage.css';

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  // Fetch exercises from backend
  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    }
    fetchExercises();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      try {
        await deleteExercise(id);
        setExercises(exercises.filter(exercise => exercise._id !== id));
      } catch (err) {
        console.error("Error deleting exercise:", err);
      }
    }
  }

  return (
    <div className="ExercisesPage">
      <h1>Your Exercises</h1>

      {exercises.length > 0 ? (
        <ul className="exercise-list">
          {exercises.map((exercise) => (
            <>
            <li key={exercise._id} className="exercise-item">
              <h3>{exercise.name}</h3>
              <p><strong>Category:</strong> {exercise.category}</p>
              <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
              <button onClick={() => navigate(`/exercises/${exercise._id}/edit`)}>Edit</button>
              <button onClick={() => handleDelete(exercise._id)}>Delete</button>
            </li>
            <div className="no-exercises">
              <p>Add More Exercises</p>
              <button onClick={() => navigate('/exercises/new')} className="add-exercise-btn">
                Add Exercise
              </button>
            </div>
            </>
          ))}
        </ul>
      ) : (
        <div className="no-exercises">
          <p>You have no saved exercises.</p>
          <button onClick={() => navigate('/exercises/new')} className="add-exercise-btn">
            Add Exercise
          </button>
        </div>
      )}
    </div>
  );
}
