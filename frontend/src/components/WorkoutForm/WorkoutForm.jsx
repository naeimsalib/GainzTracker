import { useState } from "react";
import "./WorkoutForm.css";

export default function WorkoutForm({ onSubmit }) {
  const [workoutData, setWorkoutData] = useState({
    title: "",
    day: "",
    workoutType: "",
    duration: "",
    intensityLevel: "",
  });

  function handleChange(e) {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(workoutData);
  }

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <label>Workout Title</label>
      <input type="text" name="title" onChange={handleChange} required />

      <label>Day</label>
      <input type="text" name="day" onChange={handleChange} required />

      <label>Type</label>
      <input type="text" name="workoutType" onChange={handleChange} required />

      <label>Duration</label>
      <input type="text" name="duration" onChange={handleChange} required />

      <label>Intensity Level</label>
      <input type="text" name="intensityLevel" onChange={handleChange} required />

      <button type="submit">Save Workout</button>
    </form>
  );
}
