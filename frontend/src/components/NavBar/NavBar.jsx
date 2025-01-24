import { NavLink, useLocation } from 'react-router-dom';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const location = useLocation();

  function handleLogOut() {
    logOut();
    setUser(null);
  }

  // Determine the title based on the page
  let pageTitle = "GainzTracker";
  if (location.pathname === "/signup") pageTitle = "Sign Up";
  if (location.pathname === "/login") pageTitle = "Log In";

  return (
    <nav className="NavBar">
      <div className="navbar-left">
        <h2>{pageTitle}</h2>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <NavLink to="/" className="nav-btn">Home</NavLink>
            <NavLink to="/workouts" className="nav-btn">Workouts</NavLink>
            <NavLink to="/exercises" className="nav-btn">Exercises</NavLink>
            <NavLink to="/community" className="nav-btn">Community</NavLink>
            <button onClick={handleLogOut} className="nav-btn logout">Log Out</button>
            <span className="welcome-message">Welcome, {user.name}</span>
          </>
        ) : (
          <>
            {location.pathname !== "/" && (
              <NavLink to="/" className="nav-btn">Home</NavLink>
            )}
            {location.pathname !== "/signup" && (
              <NavLink to="/signup" className="nav-btn">Sign Up</NavLink>
            )}
            {location.pathname !== "/login" && (
              <NavLink to="/login" className="nav-btn primary">Log In</NavLink>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
