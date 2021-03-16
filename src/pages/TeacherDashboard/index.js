import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";

import CourseCard from "./CourseCard";

import {
  getUserProfile,
  updateUserProfile,
  updateProfileImage,
} from "../../redux/actions/UserAction";
import { getTeacherCourses } from "../../redux/actions/TeacherAction";
import defaultPhoto from "../../assets/user.png";
import successLogo from "../../assets/upload2.png";
import defaultImg from "../../assets/defaultLektur.png";
import editIcon from "../../assets/iconEdit.png";
import { NotificationContainer } from "react-notifications";

function TeacherDashboard() {
  const dispatch = useDispatch();

  const [isProfile, setProfile] = useState(true);
  const [isEditPhoto, setEditPhoto] = useState(false);
  const [PopUpProfileImage, setPopUpProfileImage] = useState(false);
  const [imageProfile, setImageProfile] = useState("");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const { userProfile, profileImage, message, isUserLoading, token } = useSelector(
    (state) => state.users
  );
  // const teacherCourses = useSelector((state) => state.courses.teacherCourses);
  const { isLoading, teacherProfile } = useSelector((state) => state.teachers);

  const handleEdit = async () => {
    setProfile(!isProfile);
  };

  const handleEditPhoto = async () => {
    setEditPhoto(!isEditPhoto);
  };

  useEffect(() => {
    token ? dispatch(getUserProfile(token)) : dispatch(getUserProfile()); // why was this commented?
    token ? dispatch(getTeacherCourses(token)) : dispatch(getTeacherCourses());
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(fullname, email));
  };

  const updateProfile = () => {
    dispatch(updateProfileImage(imageProfile));
    setPopUpProfileImage(true);
  };

  const popUp = () => {
    setPopUpProfileImage(false);
    window.location.reload();
  };

  // console.log(teacherProfile);
  return (
    <>
      {isLoading ? (
        <div id='loader'></div>
      ) : (
        <div className="teacher-dashboard-container">
          {isProfile && !isEditPhoto ? (
            <div>
              {userProfile ? (
                <div className="teacher-profile">
                  {userProfile.image === null ? (
                    <img src={defaultPhoto} alt="student" />
                  ) : (
                    <img src={userProfile.image} alt="student" />
                  )}
                  <img src={editIcon} alt='Edit Profile' className='edit-photo-icon' onClick={handleEditPhoto} />
                  <div className="name-email">
                    <div>
                      <b>{userProfile.fullname}</b>
                    </div>
                    <div>{userProfile.email}</div>
                  </div>
                  <span className="edit-teacher-profile">
                    <u onClick={handleEdit}> Edit Profile </u>
                  </span>
                </div>
              ) : (
                <div className='student-profile'>
                  <div id="popup-loader"></div>
                </div>
              )}
            </div>
          ) : isEditPhoto ? (
            <div className="teacher-profile">
              <div className="teacher-profile-edit">
                {userProfile.image === null ? (
                  <img src={defaultPhoto} alt="student" />
                ) : (
                  <img src={userProfile.image} alt="student" />
                )}
                <input
                  className="input-profile"
                  type="file"
                  onChange={(e) => setImageProfile(e.target.files[0])}
                />
                <button className="upload-image" onClick={updateProfile}>
                  Upload Image
            </button>
                <p className="back-edit" onClick={handleEditPhoto}>Cancel</p>
              </div>
            </div>
          ) : (
            <div className="teacher-profile">
              <div className="teacher-profile-edit">
                {userProfile.image === null ? (
                  <img src={defaultPhoto} alt="student" />
                ) : (
                  <img src={userProfile.image} alt="student" />
                )}
                <form onSubmit={handleSubmit}>
                  <p>
                    Name<span>*</span>
                  </p>
                  <input
                    type="text"
                    placeholder={userProfile.fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    value={fullname}
                    required
                  />
                  <br />
                  <br />
                  <p>
                    Email<span>*</span>
                  </p>
                  <input
                    type="email"
                    placeholder={userProfile.email}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <br />
                  <br />
                  {isUserLoading ? (
                    <button className="save-edit" onClick={handleSubmit}>Saving...</button>
                  ) : (
                    <button className="save-edit" onClick={handleSubmit}>Save Changes</button>
                  )}
                  <p className="back-edit" onClick={handleEdit}>Cancel</p>
                </form>
              </div>
            </div>
          )}

          {teacherProfile !== null && (
            <div className="courses-container">
              <div className="courses-header">
                <h5>
                  <b>Courses</b>
                </h5>
                <button onClick={() => window.open("/teacher-create-course", "_self")}>New Course</button>
              </div>
              <div className="card-teacher-container overflow-auto">
                <hr />
                {teacherProfile.map((item, index) => (
                  <CourseCard
                    key={index}
                    image={item.image === null ? defaultImg : item.image}
                    title={item.title}
                    numOfVideos={item.totalVideo}
                    numOfLesson={item.totalMaterial}
                    enrolledStudents={item.totalEnrolled}
                    edit={`/course-teacher/edit/${item._id}`}
                    invite={`/course-teacher/students/${item._id}`}
                  />
                ))}
              </div>
            </div>
          )}
          <Modal
            show={PopUpProfileImage}
            size="md"
            backdropClassName='backdrop-content'
            onHide={() => setPopUpProfileImage(false)}
            className="popup-upload"
            aria-labelledby="example-custom-modal-styling-title"
            centered
          >
            <Modal.Header closeButton>
              <div className="teacher-profile-popup">
                {!profileImage ? (
                  <div className="popUp-loading">
                    <div id="popUp-loader"></div>
                    <p>Currently Uploading</p>
                  </div>
                ) : (
                  <div className="upload-success">
                    <img src={successLogo} alt="logo" />
                    <p>{message}</p>
                    <button className="upload-image-popup" onClick={popUp}>
                      Save
                </button>
                  </div>
                )}
              </div>
            </Modal.Header>
          </Modal>
        </div>
      )}
      <NotificationContainer />
    </>
  );
}

export default TeacherDashboard;

