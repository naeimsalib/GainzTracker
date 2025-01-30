import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutDay from "../../components/WorkoutDay/WorkoutDay";
import "./WorkoutPage.css";
import {
  getWorkouts,
  deleteWorkout,
  shareWorkout,
  unshareWorkout,
} from "../../services/workoutService";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      }
    }
    loadWorkouts();
  }, []);

  async function handleDelete(workoutId) {
    try {
      await deleteWorkout(workoutId);
      setWorkouts((prev) => prev.filter((workout) => workout._id !== workoutId));
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  }

  async function handleShare(workoutId, isShared) {
    try {
      if (isShared) {
        await shareWorkout(workoutId);
      } else {
        await unshareWorkout(workoutId);
      }
      setWorkouts((prev) =>
        prev.map((workout) =>
          workout._id === workoutId ? { ...workout, sharedWithCommunity: isShared } : workout
        )
      );
    } catch (err) {
      console.error("Error updating share status:", err);
    }
  }

  function handleEdit(workoutId) {
    navigate(`/workouts/${workoutId}/edit`);
  }

  function handleAddWorkout(day) {
    navigate(`/workouts/new?day=${day}`);
  }

  const workoutsByDay = daysOfWeek.map((day) => {
    const workout = workouts.find((workout) => workout.dayOfWeek === day);
    return (
      <WorkoutDay
        key={day} // Ensure unique key for each day
        day={day}
        workout={workout}
        onAddWorkout={handleAddWorkout}
        onDelete={handleDelete}
        onShare={handleShare}
        onEdit={handleEdit}
      />
    );
  });

  return (
    <div className="workout-page">
      <h2>Your Workouts</h2>
      <div className="workout-grid">{workoutsByDay}</div>
    </div>
  );
}