import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    fitnessPreferences: {
      workoutTypes: [],
      intensityLevel: 5,
      preferredEquipment: [],
    },
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage or cookies

    if (!token) {
      setError("You must be logged in to access this page.");
      return;
    }

    fetch("/api/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add Authorization header
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized access. Please log in again.");
        }
        return res.json();
      })
      .then((data) => {
        setProfile({
          name: data.name || "",
          email: data.email || "",
          fitnessPreferences: {
            workoutTypes: Array.isArray(data.fitnessPreferences?.workoutTypes)
              ? data.fitnessPreferences.workoutTypes
              : [],
            intensityLevel: data.fitnessPreferences?.intensityLevel || 5,
            preferredEquipment: Array.isArray(data.fitnessPreferences?.preferredEquipment)
              ? data.fitnessPreferences.preferredEquipment
              : [],
          },
        });
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFitnessPreferenceChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      fitnessPreferences: {
        ...prev.fitnessPreferences,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <h2>Profile Page</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <form>
          <label>Name:</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} />

          <label>Workout Types (comma-separated):</label>
          <input
            type="text"
            name="workoutTypes"
            value={profile.fitnessPreferences.workoutTypes.join(", ")}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                fitnessPreferences: {
                  ...prev.fitnessPreferences,
                  workoutTypes: e.target.value.split(",").map((item) => item.trim()),
                },
              }))
            }
          />

          <label>Preferred Equipment (comma-separated):</label>
          <input
            type="text"
            name="preferredEquipment"
            value={profile.fitnessPreferences.preferredEquipment.join(", ")}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                fitnessPreferences: {
                  ...prev.fitnessPreferences,
                  preferredEquipment: e.target.value.split(",").map((item) => item.trim()),
                },
              }))
            }
          />

          <label>Intensity Level:</label>
          <input
            type="number"
            name="intensityLevel"
            value={profile.fitnessPreferences.intensityLevel}
            onChange={handleFitnessPreferenceChange}
          />

          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
