import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import {
  getCourseFilled,
  deleteCourse,
  getCourseDetail,
  getTeacherCourses,
} from "../../../redux/actions/CoursesAction";
import { NotificationContainer } from "react-notifications";

function CourseFilled(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    courseFilled,
    contentFilled,
    materialFilled,
    // courseDetail,
    background,
  } = useSelector((state) => state.courses);

  const { id } = useParams();

  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getCourseFilled(id));
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
    <>
      {courseFilled === null ? (
        <div id="loader"></div>
      ) : (
        <>
          <div className="main-course-filled">
            <div className="teacher-dashboard-list">
              <p className="open">Course</p>
              <Link to={`/teacher-new-assessment/${id}`}>
                <p>Assessment</p>
              </Link>
              <Link to={`/teacher-new-students/${id}`}>
                <p>Students</p>
              </Link>
            </div>
            <div
              className="course-detail"
              style={{
                backgroundImage: `url(${background})`,
              }}
            >
              <div className="course-detail-filled">
                <span>{courseFilled.title}</span>
                <Link to={`/course-change-teacher/${id}`}>
                  <i class="fa fa-pencil "></i>
                </Link>
                <p>{courseFilled.overview}</p>
              </div>
            </div>
            <div className="course-filled-content">
              <p>Content*</p>
              <div className="course-filled-content-box">
                <div className="course-filled-content-card">
                  {contentFilled.map((item, index) => (
                    <div className="card-filled">
                      <div className="course-filled-content-card-left">
                        <span className="span">
                          Lesson #{index + 1} : {item.title}{" "}
                        </span>
                        <Link to={`/course-change-teacher/${id}`}>
                          <i className="fa fa-pencil "></i>
                        </Link>
                        <br />
                        <>
                          {item.description === null ? null : (
                            <span className="span-paragraph">
                              {item.description}
                            </span>
                          )}
                        </>
                        <br />
                        {materialFilled.filter((materi) => materi.contentId === item._id).map((materi, index) => (
                          <>
                              <>
                                <Link to={`/course-change-teacher/${id}`}>
                                  <i class="fa fa-file files"></i>
                                </Link>
                                <a
                                  href={materi.material}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span className="span-detail">
                                    {item.title} {index + 1}.pdf
                                  </span>
                                </a>
                              </>
                            <br />
                          </>
                        ))}
                      </div>
                      <div className="image-computer1">
                        {item.video === null ? null : (
                          <iframe src={`${item.video}`} title="glints" />
                        )}
                        {/* <img src={Comp1} alt="comp1" /> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <u className="add-new-lesson">Add New Lesson</u>
              <Link to={`/teacher-new-assessment/${id}`}>
                <button> Save Changes</button>
              </Link>
              <u className="delete-course" onClick={toggle}>
                Delete Course
              </u>
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
    </>
  );
}

export default CourseFilled;
