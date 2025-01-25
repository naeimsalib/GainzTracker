import { useState } from 'react';

export default function WorkoutForm({ handleSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '', // ✅ Ensure the date field is included
    workoutType: 'Strength', // ✅ Default to a valid type
    duration: 0, // ✅ Ensure this is a number
    exercises: [], // ✅ Empty array if no exercises
    intensityLevel: 5, // ✅ Default to mid-level intensity
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'duration' || name === 'intensityLevel' ? Number(value) : value, // ✅ Ensure numbers
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(formData); // ✅ Send correct form data to backend
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Title</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Date</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      <label>Workout Type</label>
      <select name="workoutType" value={formData.workoutType} onChange={handleChange} required>
        <option value="Strength">Strength</option>
        <option value="Cardio">Cardio</option>
        <option value="Flexibility">Flexibility</option>
        <option value="Mobility">Mobility</option>
      </select>

      <label>Duration (minutes)</label>
      <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />

      <label>Intensity Level (1-10)</label>
      <input type="number" name="intensityLevel" min="1" max="10" value={formData.intensityLevel} onChange={handleChange} required />

      <button type="submit">Add Workout</button>
    </form>
  );
}
