import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer({ user }) {
  return (
    <footer className="Footer">
      <div className="footer-top">
        <h2 className="footer-logo">GainzTracker</h2>
        <div className="footer-links">
          <h3>Links</h3>
          <nav>
            {user ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/workouts">Workouts</NavLink>
                <NavLink to="/exercises">Exercises</NavLink>
                <NavLink to="/community">Community</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Sign In</NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
      <hr className="footer-line" />
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} GainzTracker
      </p>
    </footer>
  );
}
