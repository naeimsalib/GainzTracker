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
    handleSubmit(formData);
  }

  return (
    <div className="workout-form-container">
      <h1>Create a Workout</h1>
      <form onSubmit={onSubmit} className="workout-form">
        {/* Other Inputs */}
        <div className="form-group">
          <label>Select Exercises</label>
          <select multiple name="exercises" value={formData.exercises} onChange={handleExerciseSelection}>
            {availableExercises.map((exercise) => (
              <option key={exercise._id} value={exercise._id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save Workout</button>
      </form>
    </div>
  );
}
