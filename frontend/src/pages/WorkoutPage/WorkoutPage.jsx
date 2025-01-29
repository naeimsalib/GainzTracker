import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, deleteWorkout, shareWorkout, unshareWorkout } from "../../services/workoutService";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import "./WorkoutPage.css";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

  const handleAddWorkout = (day) => {
    navigate("/workouts/new", { state: { dayOfWeek: day } });
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await deleteWorkout(id);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  const handleShare = async (id, isShared) => {
    try {
      if (isShared) {
        await shareWorkout(id);
      } else {
        await unshareWorkout(id);
      }
      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout._id === id ? { ...workout, sharedWithCommunity: isShared } : workout
        )
      );
    } catch (err) {
      console.error("Error updating workout sharing status:", err);
    }
  };

  const workoutsByDay = daysOfWeek.map((day) => ({
    day,
    workouts: workouts.filter((workout) => workout.dayOfWeek === day),
  }));

  return (
    <div className="WorkoutPage">
      <h1>Your Weekly Workouts</h1>
      <div className="week-container">
        {workoutsByDay.map(({ day, workouts }) => (
          <div key={day} className="day-container">
            <h2>{day}</h2>
            {workouts.length > 0 ? (
              workouts.map((workout) => (
                <WorkoutCard
                  key={workout._id}
                  workout={workout}
                  onEdit={(id) => navigate(`/workouts/${id}/edit`)}
                  onDelete={handleDeleteWorkout}
                  onShare={(id, isShared) => handleShare(id, isShared)}
                />
              ))
            ) : (
              <div>
                <p>Rest Day</p>
                <button onClick={() => handleAddWorkout(day)} className="add-workout-btn">
                  Add Workout
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}