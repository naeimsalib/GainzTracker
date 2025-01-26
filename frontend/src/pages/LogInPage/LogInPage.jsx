import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

export default function LogInPage({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (authService.getUser()) {
      navigate('/'); // Redirect to home if logged in
    }
  }, []);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
      navigate('/'); // Redirect to home page after login
    } catch (err) {
      console.log(err);
      setErrorMsg('Log In Failed - Try Again');
    }
  }

  return (
    <>
      <h2>Log In!</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <button type="submit">LOG IN</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}
