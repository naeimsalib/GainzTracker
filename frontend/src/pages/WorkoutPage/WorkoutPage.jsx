import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import "./WorkoutPage.css";
import {
  getWorkouts,
  deleteWorkout,
  shareWorkout,
  unshareWorkout,
} from "../../services/workoutService";

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

  return (
    <div className="workout-page">
      <div className="workout-header">
        <h2>Your Workouts</h2>
      </div>
      
      {workouts.length > 0 ? (
        <div className="workout-grid">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onDelete={handleDelete}
              onShare={handleShare}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <p className="no-workouts-message">No workouts found.</p>
      )}
    </div>
  );
  
}
