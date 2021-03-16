import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import {
  getCourseDetail,
  deleteCourse,
  getTeacherCourses,
} from "../../../redux/actions/CoursesAction";
import { NotificationContainer } from "react-notifications";

function CourseNextChange(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const { courseDetail, isLoading } = useSelector((state) => state.courses);

  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getCourseDetail(id));
  }, [dispatch, id]);

  const deleteCourseTeacher = async () => {
    dispatch(deleteCourse(id))
      .then(() => dispatch(getTeacherCourses))
      .then(() => history.push("/teacher-dashboard"))
    // .then(() => window.location.reload(false));
  };

  // console.log(courseDetail);

  return (
    <div className="teacher-assessment">
      {courseDetail === null || isLoading ? (
        <div id="loader"></div>
      ) : (
        <>
          <div className="teacher-dashboard-list">
            <p className="open">Course</p>
            <Link to={`/created-questions/${id}`}>
              <p>Assessment</p>
            </Link>
            <Link to={`/course-teacher/students/${id}`}>
              <p>Students</p>
            </Link>
          </div>

          <div className="teacher-update-box">
            <div className="course-detail-update">
              <span>{courseDetail.course.title}</span>
              <Link to={`/course-teacher/course/${id}`}>
                <i class="fa fa-pencil "></i>
              </Link>
              <p>{courseDetail.course.overview}</p>
            </div>

            <div>
              <p>
                <hr type="solid" />
              </p>
            </div>
            <div className="teacher-update-content">
              <h4>Content*</h4>
            </div>
            <div className="add-new-lesson-box">
              <div className="add-new-lesson-input">
                <h4>
                  <b>Lesson #1</b>
                </h4>
                <div className="add-new-lesson-title">
                  <p>
                    <input type="text" placeholder="     Title*" />
                  </p>
                  <p>
                    <hr type="solid" />
                  </p>
                </div>
                <div className="add-new-lesson-description">
                  <p>
                    <textarea type="text" placeholder="      Description*" />
                  </p>
                  <p>
                    <hr type="solid" />
                  </p>
                </div>
              </div>
              <div className="upload-new-lesson">
                <p>
                  <button className="video-lesson">Upload Video</button>
                </p>
                <p>Required. Max. size 200 MB. Supported format .mp4</p>
                <p>
                  <button className="material-lesson">
                    Add Lesson Material
                  </button>
                </p>
                <p>Max. size 20MB. Supported format .pdf</p>
                <p className="save">
                  <button>save</button>
                </p>
              </div>
            </div>
            <div className="teacher-add-new-lesson-button">
              <p>Add new lesson</p>
            </div>
            <div className="publish-and-delete-course">
              <Link to={`/course-teacher/edit/${id}`}>
                <p>
                  <button>Publish Course</button>
                </p>
              </Link>
              <p className="delete" onClick={toggle}>
                Delete Course
              </p>
            </div>
            <Modal isOpen={modal} toggle={toggle} className={className} backdropClassName='backdrop-content'>
              <ModalBody>
                Are you sure you want to delete this course?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => deleteCourseTeacher().then(() => toggle())}
                >
                  Delete
                </Button>
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </>
      )}
      <NotificationContainer />
    </div>
  );
}

export default CourseNextChange;
