import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExercisesPage.css';

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  // Fetch exercises (Placeholder until backend is ready)
  useEffect(() => {
    // Replace with API call later
    const savedExercises = JSON.parse(localStorage.getItem('exercises')) || [];
    setExercises(savedExercises);
  }, []);

  return (
    <div className="ExercisesPage">
      <h1>Your Exercises</h1>

      {exercises.length > 0 ? (
        <ul className="exercise-list">
          {exercises.map((exercise, index) => (
            <li key={index} className="exercise-item">
              <h3>{exercise.name}</h3>
              <p><strong>Category:</strong> {exercise.category}</p>
              <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
            </li>
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
