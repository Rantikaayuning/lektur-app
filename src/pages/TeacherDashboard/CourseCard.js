import React from "react";
import { Link } from "react-router-dom";

function CourseCard(props) {
  const {
    image,
    title,
    numOfVideos,
    numOfLesson,
    enrolledStudents,
    edit,
    invite,
  } = props;
  return (
    <>
      <div className="course-all">
        <img src={image} alt="course material" className="course-image" />
        <div className="course-info">
          <div>
            <b>{title}</b>
          </div>
          <small className="text-muted small-text">
            {numOfVideos} Videos | {numOfLesson} Lesson Material
          </small>
          <div>
            <small className="text-muted small-text">
              {enrolledStudents} Students Enrolled
            </small>
          </div>
        </div>
        <div className="invite-edit-btn">
          <button className="btn-invite">
            <Link to={invite}>Invite</Link>
          </button>
          <button className="btn-edit">
            <Link to={edit}>Edit</Link>
          </button>
        </div>
      </div>
      {/* <hr /> */}
    </>
  );
}

export default CourseCard;
