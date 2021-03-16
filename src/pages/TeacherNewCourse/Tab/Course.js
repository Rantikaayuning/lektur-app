import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateContent from "../../../components/CreateContent";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import {
  postCourse,
  deleteCourse,
  getTeacherCourses,
  getCategory,
} from "../../../redux/actions/CoursesAction";
import { NotificationContainer } from "react-notifications";

const TeacherCourseTab = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [isAdd1, setAdd1] = useState(false);
  const [isAdd2, setAdd2] = useState(false);

  const handleAdd1 = () => {
    setAdd1(true);
  };

  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { id, getTitle, getOverview, categories } = useSelector(
    (state) => state.courses
  );

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [imageData, setImageData] = useState("");
  const [category, setCategory] = useState("")

  const submitCourse = () => {
    dispatch(postCourse(title, overview, imageData, category));
    setAdd2(true)
  };

  //---------------CONTENT/LESSON--------------------------------------------//

  const [contentList, setContentList] = useState([]);

  const addContent = () => {
    setContentList(
      contentList.concat(<CreateContent key={contentList.length} />)
    );
  };

  //-----------------------DELETE-COURSE--------------------------------//

  const deleteCourseTeacher = async () => {
    dispatch(deleteCourse(id))
      .then(() => dispatch(getTeacherCourses))
      .then(() => history.push("/teacher-dashboard"))
  };

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  const cancelMaterial = () => {
    setAdd2(false)
}

  // console.log(categories);

  return (
    <>
      <div className="teacher-assessment">
        <div className="teacher-dashboard-list">
          <p className="open">Course</p>
          <p className="tab-locked">Assessment</p>
          <p className="tab-locked">Students</p>
        </div>
        <div className="teacher-create-course-box">
          {id === null ? (
            <>
              <div className="teacher-create-course-title">
                <p>
                  <input
                    type="text"
                    placeholder="Title*"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  <hr type="solid" />
                </p>
              </div>
              <div className="teacher-create-course-overview">
                <p>
                  <textarea
                    type="text"
                    placeholder="Overview*"
                    cols="45"
                    rows="5"
                    onChange={(e) => setOverview(e.target.value)}
                    value={overview}
                  />
                  <hr type="solid" />
                </p>
              </div>
              <div className="teacher-add-header-image">
                {isAdd1 === true ? (
                  <p>
                    <input
                      type="file"
                      placeholder="Image"
                      id="upload"
                      onChange={(e) => setImageData(e.target.files[0])}
                    />
                  </p>
                ) : (
                  <p>
                    <button onClick={handleAdd1}>Add header image*</button>
                  </p>
                )}
                <p>Max. size 5 MB. Supported format .png/jpg/jpeg</p>
              </div>
              <hr type="solid" />
              <div>
                {categories === null ? (
                  <select className="select-category">
                    <option selected>Loading...</option>
                  </select>
                ) : (
                  <select className="select-category" onChange={(e) => setCategory(e.target.value)}>
                    <option className="option-category" selected>Choose a category*</option>
                    {categories.map((item, index) => (
                      <option value={item._id}>{item.categories}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="teacher-save-new-course">
                <p>
                  {!isAdd2 ? (
                    <button onClick={submitCourse}>Save</button>
                  ) : (
                    <>
                      {getTitle === null ? (
                        <div className="loading-dot">
                        <div id="small-loader-navbar"></div>
                        <div onClick={cancelMaterial} className="cancel">Cancel</div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </>
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              {getTitle === null ? (
                <div id="loader"></div>
              ) : (
                <>
                  <div className="course-detail-update">
                    {getTitle}
                    <p>{getOverview}</p>
                  </div>
                </>
              )}
            </>
          )}

          {id === null ? (
            <div></div>
          ) : (
            <>
              <div>
                <p>
                  <hr type="solid" />
                </p>
              </div>
              <div className="teacher-update-content">
                <h4>Content*</h4>
              </div>
              <CreateContent />
              {contentList}
              <div className="teacher-add-new-lesson-button">
                <p onClick={addContent}>Add new lesson</p>
              </div>
              <div className="publish-and-delete-course">
                <Link to={`/course-filled-teacher/${id}`}>
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
            </>
          )}
        </div>
      </div>
      <NotificationContainer />
    </>
  );
};

export default TeacherCourseTab;
