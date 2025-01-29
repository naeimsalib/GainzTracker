import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkout, addExercisesToWorkout } from "../../services/workoutService"; 
import { getUserExercises } from "../../services/exerciseService"; 
import "./WorkoutDetailPage.css";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [allExercises, setAllExercises] = useState([]);  
  const [selectedExercises, setSelectedExercises] = useState([]);  

  useEffect(() => {
    async function fetchData() {
      try {
        const workoutData = await getWorkout(id);
        const exerciseData = await getUserExercises(); 
        setWorkout(workoutData);
        setAllExercises(exerciseData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, [id]);

  function handleExerciseSelection(event) {
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedExercises(selected);
  }

  async function handleAddExercises() {
    try {
      if (selectedExercises.length === 0) {
        alert("Please select at least one exercise.");
        return;
      }
      await addExercisesToWorkout(id, selectedExercises);
      const updatedWorkout = await getWorkout(id);
      setWorkout(updatedWorkout);
      setSelectedExercises([]);  
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

      {/* Add Exercises Section */}
      <h2>Add Exercises</h2>
      <select multiple onChange={handleExerciseSelection}>
        {allExercises.map((ex) => (
          <option key={ex._id} value={ex._id}>{ex.name}</option>
        ))}
      </select>
      <button onClick={handleAddExercises}>Add Exercises</button>

      <div className="button-group">
        <button className="edit-btn" onClick={() => navigate(`/workouts/${id}/edit`)}>Edit</button>
      </div>
    </div>
  );
}