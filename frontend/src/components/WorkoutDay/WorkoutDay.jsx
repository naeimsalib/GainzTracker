import React from "react";
import PropTypes from "prop-types";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import "./WorkoutDay.css";

export default function WorkoutDay({ day, workout, onAddWorkout, onDelete, onShare, onEdit }) {
  return (
    <div className="day-column">
      <h3>{day}</h3>
      {workout ? (
        <WorkoutCard
          workout={workout}
          onDelete={onDelete}
          onShare={onShare}
          onEdit={onEdit}
        />
      ) : (
        <div className="rest-day">
          <p>Rest day</p>
          <button onClick={() => onAddWorkout(day)}>Add Workout</button>
        </div>
      )}
    </div>
  );
}

WorkoutDay.propTypes = {
  day: PropTypes.string.isRequired,
  workout: PropTypes.object,
  onAddWorkout: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};