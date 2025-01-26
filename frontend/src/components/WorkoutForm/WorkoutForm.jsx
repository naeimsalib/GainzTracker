import { useState } from "react";

export default function WorkoutForm({ handleSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    dayOfWeek: "Monday", 
    workoutType: "Strength",
    duration: "", 
    exercises: [],
    intensityLevel: 5,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "duration" || name === "intensityLevel" ? (value === "" ? "" : Number(value)) : value, 
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(formData);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Title</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      <label>Day of the Week</label>
      <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} required>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>

      <label>Workout Type</label>
      <select name="workoutType" value={formData.workoutType} onChange={handleChange} required>
        <option value="Strength">Strength</option>
        <option value="Cardio">Cardio</option>
        <option value="Flexibility">Flexibility</option>
        <option value="Mobility">Mobility</option>
      </select>

      <label>Duration (minutes)</label>
      <input
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Enter minutes"
        required
      />

      <label>Intensity Level (1-10)</label>
      <input type="number" name="intensityLevel" min="1" max="10" value={formData.intensityLevel} onChange={handleChange} required />

      <button type="submit">Add Workout</button>
    </form>
  );
}
