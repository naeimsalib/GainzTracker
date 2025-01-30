import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./WorkoutForm.css";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function WorkoutForm({ handleSubmit, initialData }) {
  const location = useLocation();
  const prefilledDay = location.state?.dayOfWeek || initialData?.dayOfWeek || "Monday";

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    dayOfWeek: prefilledDay,
    workoutType: initialData?.workoutType || "Strength",
    duration: initialData?.duration || "",
    intensityLevel: initialData?.intensityLevel || 5,
  });

  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await getExercises();
        setAvailableExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    }
    fetchExercises();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "duration" ? Number(value) : value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(formData);
  }

  return (
    <div className="workout-form-container">
      <h1>{initialData ? "Edit Workout" : "Create a Workout"}</h1>
      <form onSubmit={onSubmit} className="workout-form">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Day of the Week</label>
          <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} required>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Duration (Minutes)</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
        </div>

        <button type="submit">{initialData ? "Update Workout" : "Save Workout"}</button>
      </form>
    </div>
  );
}