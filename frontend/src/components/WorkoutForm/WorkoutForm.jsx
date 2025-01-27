import { useEffect, useState } from "react";
import { getExercises } from "../../services/exerciseService";
import "./WorkoutForm.css";

export default function WorkoutForm({ handleSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    dayOfWeek: "Monday",
    workoutType: "Strength",
    duration: "",
    exercises: [],
    intensityLevel: 5,
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
      [name]: name === "duration" ? Number(value) : value, // Convert duration to number
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
  
    console.log("Form Data Before Submission:", formData);
  
    if (!formData.title.trim() || !formData.duration) {
      alert("Title and Duration are required!");
      return;
    }

    handleSubmit({
      ...formData,
      exercises: formData.exercises.map(ex => ex._id),
    });
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
          <label>Duration (Minutes)</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
        </div>

        <button type="submit">Save Workout</button>
      </form>
    </div>
  );
}
