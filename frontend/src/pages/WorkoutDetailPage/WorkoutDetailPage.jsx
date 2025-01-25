import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkout } from "../../services/workoutService";
import "./WorkoutDetailPage.css";

export default function WorkoutDetailPage() {
  const { id } = useParams(); // Get the workout ID from the URL
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

  if (!workout) return <p>Loading workout details...</p>;

  return (
    <div className="WorkoutDetailPage">
      <h1>{workout.title}</h1>
      <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
      <p><strong>Type:</strong> {workout.workoutType}</p>
      <p><strong>Duration:</strong> {workout.duration} minutes</p>
      <p><strong>Intensity Level:</strong> {workout.intensityLevel}</p>
      
      <h2>Exercises</h2>
      {workout.exercises.length > 0 ? (
        <ul>
          {workout.exercises.map((exercise) => (
            <li key={exercise._id}>
              <strong>{exercise.name}</strong> - {exercise.muscleGroup}
            </li>
          ))}
        </ul>
      ) : (
        <p>No exercises linked to this workout.</p>
      )}
    </div>
  );
}
