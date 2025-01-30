import React, { useEffect, useState } from "react";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
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
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== workoutId)
      );
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
      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout._id === workoutId
            ? { ...workout, sharedWithCommunity: isShared }
            : workout
        )
      );
    } catch (err) {
      console.error("Error updating share status:", err);
    }
  }

  function handleEdit(workoutId) {
    // Implement the edit functionality here
    console.log(`Edit workout with ID: ${workoutId}`);
  }

  const workoutsByDay = daysOfWeek.map((day) => {
    const workout = workouts.find((workout) => workout.dayOfWeek === day);
    return (
      <div key={day} className="day-column">
        <h3>{day}</h3>
        {workout ? (
          <WorkoutCard
            key={workout._id}
            workout={workout}
            onDelete={handleDelete}
            onShare={handleShare}
            onEdit={handleEdit}
          />
        ) : (
          <div className="rest-day">
            <p>Rest day</p>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="workout-page">
      <h2>Your Workouts</h2>
      <div className="workout-grid">{workoutsByDay}</div>
    </div>
  );
}