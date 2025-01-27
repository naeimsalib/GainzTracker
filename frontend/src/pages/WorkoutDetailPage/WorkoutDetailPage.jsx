import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkout, deleteWorkout, addExercisesToWorkout } from "../../services/workoutService"; 
import { getExercises } from "../../services/exerciseService";
import "./WorkoutDetailPage.css";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [allExercises, setAllExercises] = useState([]);  // Store all exercises
  const [selectedExercises, setSelectedExercises] = useState([]);  // Track selected exercises

  useEffect(() => {
    async function fetchData() {
      try {
        const workoutData = await getWorkout(id);
        const exerciseData = await getExercises(); // ✅ Fetch all exercises
        setWorkout(workoutData);
        setAllExercises(exerciseData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, [id]);

  async function handleDelete() {
    try {
      await deleteWorkout(id);
      navigate("/workouts");
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  }

  // 🔹 Handle exercise selection
  function handleExerciseSelection(event) {
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedExercises(selected);
  }

  // 🔹 Add selected exercises to the workout
  async function handleAddExercises() {
    try {
      if (selectedExercises.length === 0) {
        alert("Please select at least one exercise.");
        return;
      }
      await addExercisesToWorkout(id, selectedExercises);
      const updatedWorkout = await getWorkout(id);
      setWorkout(updatedWorkout);
      setSelectedExercises([]);  // ✅ Clear selection after adding
    } catch (err) {
      console.error("Error adding exercises:", err);
    }
  }

  if (!workout) return <p>Loading workout details...</p>;

  return (
    <div className="WorkoutDetailPage">
      <h1>{workout.title}</h1>
      <p><strong>Day:</strong> {workout.dayOfWeek}</p>
      <p><strong>Type:</strong> {workout.workoutType}</p>
      <p><strong>Duration:</strong> {workout.duration} minutes</p>
      <p><strong>Intensity Level:</strong> {workout.intensityLevel}</p>

      {/* 🔹 List of Exercises in the Workout */}
      <h2>Exercises</h2>
      {workout.exercises.length > 0 ? (
        <div className="exercise-list">
          {workout.exercises.map((exercise) => (
            <div key={exercise._id} className="exercise-card">
              <h3>{exercise.name}</h3>
              <p><strong>Category:</strong> {exercise.category}</p>
              <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No exercises linked to this workout.</p>
      )}

      {/* 🔹 Add Exercises Section */}
      <h2>Add Exercises</h2>
      <select multiple onChange={handleExerciseSelection}>
        {allExercises.map((ex) => (
          <option key={ex._id} value={ex._id}>{ex.name}</option>
        ))}
      </select>
      <button onClick={handleAddExercises}>Add Exercises</button>

      <div className="button-group">
        <button className="edit-btn" onClick={() => navigate(`/workouts/${id}/edit`)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
