import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkout, deleteWorkout } from "../../services/workoutService";
import "./WorkoutDetailPage.css";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const data = await getWorkout(id);
        setWorkout(data);
      } catch (err) {
        console.error("Error fetching workout:", err);
      }
    }
    fetchWorkout();
  }, [id]);

  async function handleDelete() {
    try {
      await deleteWorkout(id);
      navigate("/workouts"); // Redirect after deleting
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  }

  if (!workout) return <p>Loading workout details...</p>;

  return (
    <div className="WorkoutDetailPage">
      <h1>{workout.title}</h1>
      <p><strong>Day:</strong> {workout.day}</p>
      <p><strong>Type:</strong> {workout.workoutType}</p>
      <p><strong>Duration:</strong> {workout.duration} minutes</p>
      <p><strong>Intensity Level:</strong> {workout.intensityLevel}</p>

      <h2>Exercises</h2>
      {workout.exercises.length > 0 ? (
        <div className="exercise-list">
          {workout.exercises.map((exercise) => (
            <div key={exercise._id} className="exercise-card">
              <h3>{exercise.name}</h3>
              <p><strong>Category:</strong> {exercise.category}</p>
              <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No exercises linked to this workout.</p>
      )}

      <div className="button-group">
        <button className="edit-btn" onClick={() => navigate(`/workouts/${id}/edit`)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
