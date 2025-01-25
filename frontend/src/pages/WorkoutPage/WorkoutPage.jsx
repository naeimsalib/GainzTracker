import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, deleteWorkout } from "../../services/workoutService";
import "./WorkoutPage.css";

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <div className="WorkoutPage">
      <h1>Your Workouts</h1>
      <button onClick={() => navigate("/workouts/new")}>Add Workout</button>

      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <h3 onClick={() => navigate(`/workouts/${workout._id}`)}>{workout.title}</h3>
            <p>Type: {workout.workoutType}</p>
            <p>Duration: {workout.duration} mins</p>
            <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
