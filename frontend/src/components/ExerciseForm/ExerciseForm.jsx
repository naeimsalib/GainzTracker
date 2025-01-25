import { useState } from "react";
import "./ExerciseForm.css";

export default function ExerciseForm({ handleSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Strength",
    muscleGroup: "",
    equipment: "",
    difficultyLevel: "Beginner",
    sets: 0,
    reps: 0,
    restTime: 0,
    notes: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "sets" || name === "reps" || name === "restTime" ? Number(value) : value, // ✅ Ensure number inputs work properly
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(formData); // ✅ Pass form data to parent component (e.g., AddExercisePage)
  }

  return (
    <form onSubmit={onSubmit} className="exercise-form">
      <label>Exercise Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="Strength">Strength</option>
        <option value="Cardio">Cardio</option>
        <option value="Flexibility">Flexibility</option>
        <option value="Mobility">Mobility</option>
      </select>

      <label>Muscle Group</label>
      <input type="text" name="muscleGroup" value={formData.muscleGroup} onChange={handleChange} required />

      <label>Equipment</label>
      <input type="text" name="equipment" value={formData.equipment} onChange={handleChange} />

      <label>Difficulty Level</label>
      <select name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange} required>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <label>Sets</label>
      <input type="number" name="sets" value={formData.sets} onChange={handleChange} required />

      <label>Reps</label>
      <input type="number" name="reps" value={formData.reps} onChange={handleChange} required />

      <label>Rest Time (seconds)</label>
      <input type="number" name="restTime" value={formData.restTime} onChange={handleChange} required />

      <button type="submit">Add Exercise</button>
    </form>
  );
}
