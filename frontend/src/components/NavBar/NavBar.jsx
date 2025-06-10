import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logOut } from '../../services/authService';
import { useState, useEffect } from 'react';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
    setIsMenuOpen(false);
  }

  // Determine the title based on the page
  let pageTitle = "GainzTracker";
  if (location.pathname === "/signup") pageTitle = "Sign Up";
  if (location.pathname === "/login") pageTitle = "Log In";

  return (
    <nav className={`NavBar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <NavLink to="/" className="logo">
            <h2>{pageTitle}</h2>
          </NavLink>
        </div>

        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-right ${isMenuOpen ? 'open' : ''}`}>
          {user ? (
            <>
              <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-home"></i>
                <span>Home</span>
              </NavLink>
              <NavLink to="/workouts" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-dumbbell"></i>
                <span>Workouts</span>
              </NavLink>
              <NavLink to="/exercises" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-list"></i>
                <span>Exercises</span>
              </NavLink>
              <NavLink to="/community" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-users"></i>
                <span>Community</span>
              </NavLink>
              <NavLink to="/profile" className="nav-link profile" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-user"></i>
                <span>{user.name}</span>
              </NavLink>
              <button onClick={handleLogOut} className="nav-link logout">
                <i className="fas fa-sign-out-alt"></i>
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              {location.pathname !== "/" && (
                <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-home"></i>
                  <span>Home</span>
                </NavLink>
              )}
              {location.pathname !== "/signup" && (
                <NavLink to="/signup" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-user-plus"></i>
                  <span>Sign Up</span>
                </NavLink>
              )}
              {location.pathname !== "/login" && (
                <NavLink to="/login" className="nav-link primary" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Log In</span>
                </NavLink>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
