import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/authService';
import './App.css';
import HomePage from '../HomePage/HomePage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import WorkoutsPage from '../WorkoutsPage/WorkoutsPage';
import ExercisesPage from '../ExercisesPage/ExercisesPage';
import CommunityPage from '../CommunityPage/CommunityPage';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

export default function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  function handleLogin(userData) {
    setUser(userData);
    navigate('/'); // Redirect to Home Page after login
  }

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/signup" element={<SignUpPage setUser={handleLogin} />} />
          <Route path="/login" element={<LogInPage setUser={handleLogin} />} />
          {user && (
            <>
              <Route path="/workouts" element={<WorkoutsPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/community" element={<CommunityPage />} />
            </>
          )}
        </Routes>
      </section>
      <Footer user={user} />
    </main>
  );
}
