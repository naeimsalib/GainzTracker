import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, deleteWorkout } from "../../services/workoutService";
import "./WorkoutsPage.css";

export default function WorkoutsPage() {
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
    <div className="WorkoutsPage">
      <h1>Your Workouts</h1>
      <button onClick={() => navigate("/workouts/new")}>Add Workout</button>

      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <h3 onClick={() => navigate(`/workouts/${workout._id}`)}>{workout.title}</h3> {/* ✅ Clickable */}
            <p>Type: {workout.workoutType}</p>
            <p>Duration: {workout.duration} minutes</p>
            <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
