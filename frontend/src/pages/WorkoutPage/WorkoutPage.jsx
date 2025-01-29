import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, deleteWorkout } from "../../services/workoutService";
import WorkoutDay from "../../components/WorkoutDay/WorkoutDay";
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

  function handleAddWorkout(day) {
    const existingWorkout = workouts.find((workout) => workout.dayOfWeek === day);
    if (existingWorkout) {
      alert(`A workout for ${day} already exists. Please edit the existing one.`);
    } else {
      navigate(`/workouts/new?day=${day}`);
    }
  }

  function handleEditWorkout(id) {
    navigate(`/workouts/${id}/edit`);
  }

  // Ensure all 7 days are represented
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const workoutMap = workouts.reduce((acc, workout) => {
    acc[workout.dayOfWeek] = workout;
    return acc;
  }, {});

  return (
    <div className="WorkoutPage">
      <h1>Your Weekly Workouts</h1>

      <div className="workout-grid">
        {daysOfWeek.map((day) => (
          <WorkoutDay
            key={day}
            day={day}
            workout={workoutMap[day]}
            onAdd={handleAddWorkout}
            onEdit={handleEditWorkout}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
