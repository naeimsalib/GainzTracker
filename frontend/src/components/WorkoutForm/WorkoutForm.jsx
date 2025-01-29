import { useEffect, useState } from "react";
import { getExercises } from "../../services/exerciseService";
import "./WorkoutForm.css";

export default function WorkoutForm({ handleSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    dayOfWeek: initialData?.dayOfWeek || "Monday",
    workoutType: initialData?.workoutType || "Strength",
    duration: initialData?.duration || "",
    exercises: initialData?.exercises || [],
    notes: initialData?.notes || "",
    intensityLevel: initialData?.intensityLevel || 5,
  });

  const [availableExercises, setAvailableExercises] = useState([]);

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
      [name]: name === "duration" || name === "intensityLevel" ? Number(value) : value,
    }));
  }

  function handleExerciseSelection(e) {
    const selectedExercises = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      exercises: selectedExercises,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim() || !formData.duration || !formData.dayOfWeek || !formData.workoutType) {
      alert("All required fields must be filled!");
      return;
    }

    handleSubmit({
      ...formData,
      exercises: formData.exercises.map((ex) => ex._id),
    });
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

        <div className="form-group">
          <label>Intensity Level (1-10)</label>
          <input type="number" name="intensityLevel" min="1" max="10" value={formData.intensityLevel} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Exercises</label>
          <select multiple onChange={handleExerciseSelection} value={formData.exercises}>
            {availableExercises.map((ex) => (
              <option key={ex._id} value={ex._id}>{ex.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
        </div>

        <button type="submit">{initialData ? "Update Workout" : "Save Workout"}</button>
      </form>
    </div>
  );
}
