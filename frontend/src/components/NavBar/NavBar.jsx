import { NavLink, Link } from 'react-router-dom';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      {user ? (
        <>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/community">Community</NavLink>
          <Link to="" onClick={handleLogOut}> Log Out </Link>
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}
