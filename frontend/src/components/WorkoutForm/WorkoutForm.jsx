import { useState } from "react";
import "./WorkoutForm.css";

export default function WorkoutForm({ handleSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    dayOfWeek: "Monday",
    workoutType: "Strength",
    duration: "",
    intensityLevel: 5,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "duration" ? Number(value) : value, // Convert duration to number
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.duration) {
      alert("Title and Duration are required!");
      return;
    }
    handleSubmit(formData);
  }

  return (
    <div className="workout-form-container">
      <h1>Create a Workout</h1>
      <form onSubmit={onSubmit} className="workout-form">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Day of the Week</label>
          <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} required>
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Workout Type</label>
          <select name="workoutType" value={formData.workoutType} onChange={handleChange} required>
            {["Strength", "Cardio", "Flexibility", "Mobility"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Duration (Minutes)</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
        </div>

        <button type="submit">Save Workout</button>
      </form>
    </div>
  );
}
