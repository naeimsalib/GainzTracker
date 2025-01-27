import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/userService';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    fitnessPreferences: {
      workoutTypes: [],  // Ensures array is never undefined
      intensityLevel: 5, // Default number
      preferredEquipment: [], // Ensures array is never undefined
    },
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        
        // Ensure fitnessPreferences always exist to prevent undefined error
        setProfile({
          name: data.name || '',
          email: data.email || '',
          fitnessPreferences: {
            workoutTypes: data.fitnessPreferences?.workoutTypes || [],
            intensityLevel: data.fitnessPreferences?.intensityLevel || 5,
            preferredEquipment: data.fitnessPreferences?.preferredEquipment || [],
          },
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateProfile(profile);
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Error updating profile.');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    // Handle nested fields correctly
    if (name.includes('fitnessPreferences.')) {
      const key = name.split('.')[1];
      setProfile((prev) => ({
        ...prev,
        fitnessPreferences: {
          ...prev.fitnessPreferences,
          [key]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={profile.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={profile.email} onChange={handleChange} required />

        <label>Preferred Workout Types (comma-separated)</label>
        <input
          type="text"
          name="fitnessPreferences.workoutTypes"
          value={profile.fitnessPreferences.workoutTypes.join(',')}
          onChange={handleChange}
        />

        <label>Intensity Level (1-10)</label>
        <input
          type="number"
          name="fitnessPreferences.intensityLevel"
          value={profile.fitnessPreferences.intensityLevel}
          onChange={handleChange}
          min="1"
          max="10"
        />

        <label>Preferred Equipment (comma-separated)</label>
        <input
          type="text"
          name="fitnessPreferences.preferredEquipment"
          value={profile.fitnessPreferences.preferredEquipment.join(',')}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
