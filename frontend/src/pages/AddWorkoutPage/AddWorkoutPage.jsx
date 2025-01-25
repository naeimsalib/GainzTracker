import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import { createWorkout } from "../../services/workoutService";
import "./AddWorkoutPage.css";

export default function AddWorkoutPage() {
  const navigate = useNavigate();

  async function handleCreateWorkout(workoutData) {
    try {
      await createWorkout(workoutData);
      navigate("/workouts");
    } catch (err) {
      console.error("Error creating workout:", err);
    }
  }

  return (
    <div className="AddWorkoutPage">
      <h1>New Workout</h1>
      <WorkoutForm onSubmit={handleCreateWorkout} />
    </div>
  );
}
