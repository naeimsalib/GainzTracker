import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getUser } from "../../services/authService";
import "./App.css";

// Importing Pages
import HomePage from "../HomePage/HomePage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import WorkoutPage from "../WorkoutPage/WorkoutPage";
import AddWorkoutPage from "../AddWorkoutPage/AddWorkoutPage";
import ExercisesPage from "../ExercisesPage/ExercisesPage";
import AddExercisePage from "../AddExercisePage/AddExercisePage";
import EditExercisePage from "../EditExercisePage/EditExercisePage";
import CommunityPage from "../CommunityPage/CommunityPage";
import WorkoutDetailPage from "../WorkoutDetailPage/WorkoutDetailPage";
import ExerciseDetailPage from "../ExerciseDetailPage/ExerciseDetailPage"; 

// Importing Components
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

export default function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  function handleLogin(userData) {
    setUser(userData);
    navigate("/"); // Redirect to Home Page after login
  }

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/signup" element={<SignUpPage setUser={handleLogin} />} />
          <Route path="/login" element={<LogInPage setUser={handleLogin} />} />

          {/* Protected Routes (Only accessible when logged in) */}
          {user && (
            <>
              {/* Workouts */}
              <Route path="/workouts" element={<WorkoutPage />} />
              <Route path="/workouts/new" element={<AddWorkoutPage />} />

              {/* Exercises */}
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/exercises/new" element={<AddExercisePage />} />
              <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
              <Route path="/exercises/:id/edit" element={<EditExercisePage />} />
              <Route path="/exercises/:id" element={<ExerciseDetailPage />} />

              {/* Community */}
              <Route path="/community" element={<CommunityPage />} />
            </> 
          )}
        </Routes>
      </section>
      <Footer user={user} />
    </main>
  );
}
