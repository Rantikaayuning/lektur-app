import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetail, getCourses, postEnrollCourse, getStudentCourses } from "../../redux/actions/CoursesAction";

import ContentCards from "../../components/ContentCard/Cards";
import defaultImg from "../../assets/defaultLektur.png";
import { NotificationContainer } from "react-notifications";

function CourseDetail() {
  const [PopUpCourseDetail, setPopUpCourseDetail] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { courseDetail, courses, studentCourses } = useSelector(state => state.courses);
  const { userProfile, isAuthentificated } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getCourseDetail(id));
    dispatch(getCourses());
    dispatch(getStudentCourses());
  }, [dispatch, id]);

  const handleEnroll = () => {
    dispatch(postEnrollCourse(id))
    setPopUpCourseDetail(true)
  }

  const find = studentCourses.course && studentCourses.course.find(item => [item.courseId !== null && item.courseId !== undefined && item.courseId._id].includes(id) )

  // console.log("detail", courseDetail)
  console.log(find)

  return (
    <div className="main-course">
      {courseDetail === null ? (
        <div id="loader"></div>
      ) : (
        <>
          <div className="course-detail" id="myDiv">
            <div className="course-detail-left">
              <p className="p1">Business</p>
              <p className="p2">{courseDetail.course.title}</p>
              <p className="p3">By {courseDetail.course.teacherId.fullname}</p>
              {userProfile ? (
                <div>
                  {userProfile.status === 0 ? (
                    <>
                      {find === null || find === undefined ? (
                        <button onClick={handleEnroll} className='not-enrolled'>
                          Enroll Now
                        </button>
                      ) : (
                        <button className='enrolled'>
                          You've already enrolled
                        </button>
                      )}
                    </>
                  ) : null}
                </div>
              ) : (
                <button onClick={handleEnroll} className='not-enrolled'>
                  Enroll Now
                </button>
              )}
            </div>
            <div className="course-detail-right flex">
              <div>
                <p className="p1">{courseDetail.course.totalVideo}</p>
                <p className="p2">Learning Videos</p>
              </div>
              <div>
                <p className="p1">{courseDetail.course.totalMaterial}</p>
                <p className="p2">Study Material</p>
              </div>
              <div className="course-detail-right-material overflow-auto">
                <div className="content-p">Content</div>
                <ul>
                  <li>
                    {courseDetail.content.map((item, index) => (
                      <div className="rectangle">
                        <p>Lesson #{index + 1}: {item.title}</p>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="center">
            <div className="course-center">
              <h5>Description</h5>
              <p>{courseDetail.course.overview}</p>
            </div>
          </div>
          <div className="card-content">
            <div className="card-text-course">Other Courses</div>
            <Row className="content-card-container">
              {courses.map((item, index) => index < 4 && (
                <Col xl="3" md="6" sm="12" key={index} className="card-container">
                  <Link
                    to={`/course-detail/${item._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ContentCards
                      image={item.image === null ? defaultImg : item.image}
                      text={item.overview}
                      title={item.title}
                      lecture={item.teacherId.fullname}
                      video_numbers={item.totalVideo}
                      material_numbers={item.totalMaterial}
                      footer={
                        item.categoryId
                          ? item.categoryId.categories
                          : "General Science"
                      }
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
          <Modal
            show={PopUpCourseDetail}
            backdropClassName='backdrop-content'
            size="lg"
            onHide={() => setPopUpCourseDetail(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            {isAuthentificated ? (
              <>
                <Modal.Header closeButton>
                  <div className="modal-central" closeButton>
                    <div className='image-content-box'>
                      <img src={defaultImg} alt='default' className="modal-central-image" />
                    </div>
                    <div className="modal-central-content">
                      <p className="p1">Successfully enrolled!</p>
                      <p className="p2">{courseDetail.course.title}</p>
                      <p className="p3">{courseDetail.course.teacherId.fullname}</p>
                    </div>
                  </div>
                </Modal.Header>
                <div className="modal-central-body">
                  <p>Please wait coresponding teacher approve you!</p>
                </div>
              </>
            ) : (
              <Modal.Header closeButton>
                <div className="modal-central-login" closeButton>
                  <div className="modal-central-content-login">
                    <p>
                      Please <Link to="/login">login</Link> to enroll this
                      course !
                    </p>
                  </div>
                </div>
              </Modal.Header>
            )}
          </Modal>
        </>
      )}
      <NotificationContainer />
    </div>
  );
}

export default CourseDetail;
