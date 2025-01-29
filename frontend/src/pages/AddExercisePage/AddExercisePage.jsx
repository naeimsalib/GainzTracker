import { useState } from "react";
import "./AddExercisePage.css";

export default function AddExercisePage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Strength",
    muscleGroup: "",
    equipment: "",
    difficultyLevel: "Beginner",
    sets: "",
    reps: "",
    restTime: "",
    video: "",
    notes: "",
    sharedWithCommunity: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Exercise Submitted:", formData);
  }

  return (
    <div className="add-exercise-form-container">
      <h1>Add a New Exercise</h1>
      <form onSubmit={handleSubmit} className="add-exercise-form">
        {/* Exercise Name */}
        <div className="form-group full-width">
          <label>Exercise Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="Strength">Strength</option>
            <option value="Cardio">Cardio</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Mobility">Mobility</option>
          </select>
        </div>

        {/* Muscle Group */}
        <div className="form-group">
          <label>Muscle Group</label>
          <input type="text" name="muscleGroup" value={formData.muscleGroup} onChange={handleChange} required />
        </div>

        {/* Equipment */}
        <div className="form-group full-width">
          <label>Equipment</label>
          <input type="text" name="equipment" value={formData.equipment} onChange={handleChange} />
        </div>

        {/* Difficulty Level */}
        <div className="form-group">
          <label>Difficulty Level</label>
          <select name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange} required>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Sets, Reps, Rest Time (One Row) */}
        <div className="triple-group">
          <div className="form-group">
            <label>Sets</label>
            <input type="number" name="sets" value={formData.sets} onChange={handleChange} min="1" />
          </div>
          <div className="form-group">
            <label>Reps</label>
            <input type="number" name="reps" value={formData.reps} onChange={handleChange} min="1" />
          </div>
          <div className="form-group">
            <label>Rest Time (seconds)</label>
            <input type="number" name="restTime" value={formData.restTime} onChange={handleChange} min="0" />
          </div>
        </div>

        {/* Video URL */}
        <div className="form-group full-width">
          <label>Video URL</label>
          <input type="text" name="video" value={formData.video} onChange={handleChange} />
        </div>

        {/* Notes */}
        <div className="form-group full-width">
          <label>Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"></textarea>
        </div>

        {/* Shared with Community */}
        <div className="form-group checkbox-group">
          <input type="checkbox" name="sharedWithCommunity" checked={formData.sharedWithCommunity} onChange={handleChange} />
          <label>Share with Community</label>
        </div>

        {/* Submit Button */}
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
}
