import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkout, addExercisesToWorkout } from "../../services/workoutService";
import { getUserExercises } from "../../services/exerciseService";
import "./AddExercisePage.css";

export default function AddExercisePage() {
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

  async function handleAddExercises() {
    if (selectedExercises.length === 0) {
      alert("Please select at least one exercise.");
      return;
    }
    try {
      await addExercisesToWorkout(id, selectedExercises);
      navigate(`/workouts/${id}`);
    } catch (err) {
      console.error("Error adding exercises:", err);
    }
  }

  function handleExerciseSelection(event) {
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedExercises(selected);
  }

  if (!workout) return <p>Loading workout details...</p>;

  return (
    <div className="AddExercisePage">
      <h1>Add Exercises to {workout.title}</h1>
      <select multiple onChange={handleExerciseSelection}>
        {allExercises.map((ex) => (
          <option key={ex._id} value={ex._id}>{ex.name}</option>
        ))}
      </select>
      <button onClick={handleAddExercises}>Add Selected Exercises</button>
    </div>
  );
}
