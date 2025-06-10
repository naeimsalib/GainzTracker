import { useEffect, useState } from "react";
import {
  getSharedWorkouts,
  saveWorkout,
} from "../../services/workoutService";
import {
  getSharedExercises,
  saveExercise,
} from "../../services/exerciseService";
import "./CommunityPage.css";

export default function CommunityPage({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [viewType, setViewType] = useState("workouts");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        if (viewType === "workouts") {
          const sharedWorkouts = await getSharedWorkouts();
          setWorkouts(sharedWorkouts);
        } else {
          const sharedExercises = await getSharedExercises();
          setExercises(sharedExercises);
        }
      } catch (err) {
        console.error("Error fetching shared items:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [viewType]);

  const filteredItems = viewType === "workouts"
    ? workouts.filter(workout => 
        workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.workoutType.toLowerCase().includes(searchTerm.toLowerCase()))
    : exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="CommunityPage">
      <div className="community-header">
        <h1>
          <i className="fas fa-globe"></i>
          Community Hub
        </h1>
        <p className="community-description">
          Discover and save workouts and exercises shared by the community
        </p>
      </div>

      <div className="community-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder={`Search ${viewType}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewType === "workouts" ? "active" : ""}`}
            onClick={() => setViewType("workouts")}
          >
            <i className="fas fa-dumbbell"></i>
            Workouts
          </button>
          <button 
            className={`toggle-btn ${viewType === "exercises" ? "active" : ""}`}
            onClick={() => setViewType("exercises")}
          >
            <i className="fas fa-list"></i>
            Exercises
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading {viewType}...</p>
        </div>
      ) : (
        <div className="community-grid">
          {filteredItems.length === 0 ? (
            <div className="no-items">
              <i className="fas fa-inbox"></i>
              <p>No {viewType} found</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className="community-card">
                <div className="card-header">
                  <h3>{viewType === "workouts" ? item.title : item.name}</h3>
                  <span className="shared-by">
                    <i className="fas fa-user"></i>
                    {item.user.name}
                  </span>
                </div>

                <div className="card-content">
                  {viewType === "workouts" ? (
                    <>
                      <div className="info-row">
                        <i className="fas fa-calendar-day"></i>
                        <span>{item.dayOfWeek}</span>
                      </div>
                      <div className="info-row">
                        <i className="fas fa-dumbbell"></i>
                        <span>{item.workoutType}</span>
                      </div>
                      <div className="info-row">
                        <i className="fas fa-clock"></i>
                        <span>{item.duration} minutes</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="info-row">
                        <i className="fas fa-tag"></i>
                        <span>{item.category}</span>
                      </div>
                      <div className="info-row">
                        <i className="fas fa-fire"></i>
                        <span>{item.muscleGroup}</span>
                      </div>
                    </>
                  )}
                </div>

                <button 
                  className="save-btn"
                  onClick={() => viewType === "workouts" ? saveWorkout(item._id) : saveExercise(item._id)}
                >
                  <i className="fas fa-bookmark"></i>
                  Save to My {viewType === "workouts" ? "Workouts" : "Exercises"}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
