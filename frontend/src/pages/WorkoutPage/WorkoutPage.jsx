import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, deleteWorkout } from "../../services/workoutService";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
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

  async function handleDelete(id) {
    try {
      await deleteWorkout(id);
      setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== id));
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  }

  function handleEditWorkout(id) {
    navigate(`/workouts/${id}/edit`);
  }

  function handleShareWorkout(workoutId, shared) {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout._id === workoutId ? { ...workout, sharedWithCommunity: shared } : workout
      )
    );
  }

  return (
    <div className="WorkoutPage">
      <h1>Your Workouts</h1>

      <div className="workout-grid">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onEdit={handleEditWorkout}
              onDelete={handleDelete}
              onShare={handleShareWorkout}
            />
          ))
        ) : (
          <p>No workouts available. Add one!</p>
        )}
      </div>

      <button className="add-workout-btn" onClick={() => navigate("/workouts/new")}>
        Add New Workout
      </button>
    </div>
  );
}
