import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer({ user }) {
  return (
    <footer className="Footer">
      <nav>
        {user ? (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
            <NavLink to="/community">Community</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </nav>
      <p>&copy; {new Date().getFullYear()} GainzTracker. All Rights Reserved.</p>
    </footer>
  );
}
