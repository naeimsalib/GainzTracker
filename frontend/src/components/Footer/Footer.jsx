import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer({ user }) {
  return (
    <footer className="Footer">
      <div className="footer-top">
        {/* Left Section - Logo */}
        <h2 className="footer-logo">GainzTracker</h2>

        {/* Right Section - Links */}
        <div className="footer-links">
          <h3>Links</h3>
          <div className="footer-nav">
            {user ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/community">Community</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/workouts">Workouts</NavLink>
                <NavLink to="/exercises">Exercise Library</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Sign In</NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <hr className="footer-line" />

      {/* Copyright */}
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} GainzTracker
      </p>
    </footer>
  );
}
