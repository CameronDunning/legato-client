import React from "react";

const PendingLessonTeacher = props => {
  return (
    <div>
      <span>
        Confirm {props.course} lesson with {props.student} on {props.time}?
      </span>
      <button onClick={() => props.acceptBooking(props.currentLessonID)}>
        Confirm
      </button>
      <button onClick={() => props.rejectBooking(props.currentLessonID)}>
        Reject
      </button>
      <button onClick={() => props.notNow()}>Not Now</button>
    </div>
  );
};

export default PendingLessonTeacher;