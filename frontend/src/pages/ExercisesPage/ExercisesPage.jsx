import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExercises } from "../../services/exerciseService";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import "./ExercisesPage.css";

export default function ExercisesPage({ user }) {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExercises() {
      setIsLoading(true);
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchExercises();
  }, []);

  const handleShare = (exerciseId, shared) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise._id === exerciseId ? { ...exercise, sharedWithCommunity: shared } : exercise
      )
    );
  };

  const handleDelete = (exerciseId) => {
    setExercises((prevExercises) => prevExercises.filter((exercise) => exercise._id !== exerciseId));
  };

  // Get unique categories for filter
  const categories = ["all", ...new Set(exercises.map(exercise => exercise.category))];

  // Filter exercises based on search term and category
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="ExercisesPage">
      <div className="exercises-header">
        <h1>
          <i className="fas fa-dumbbell"></i>
          My Exercises
        </h1>
        <p className="exercises-description">
          Manage and organize your exercise library
        </p>
      </div>

      <div className="exercises-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="add-exercise-btn"
          onClick={() => navigate("/exercises/new")}
        >
          <i className="fas fa-plus"></i>
          Add Exercise
        </button>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading exercises...</p>
        </div>
      ) : (
        <div className="exercises-grid">
          {filteredExercises.length === 0 ? (
            <div className="no-exercises">
              <i className="fas fa-dumbbell"></i>
              <p>No exercises found</p>
              <button 
                className="add-first-btn"
                onClick={() => navigate("/exercises/new")}
              >
                Add Your First Exercise
              </button>
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise._id}
                exercise={exercise}
                user={user}
                onEdit={(id) => navigate(`/exercises/${id}/edit`)}
                onDelete={handleDelete}
                onShare={handleShare}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}