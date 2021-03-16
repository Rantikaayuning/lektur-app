import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { NotificationContainer } from "react-notifications";

import {
  // postAssessment,
  getQuestions,
} from "../../../redux/actions/AssessmentAction";
// import CreateAssessment from "../../../components/CreateAssessment";
import EditAssessment from "../../../components/EditAssessment";

const TeacherAssessmentTabEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { assessment, isLoading } = useSelector(
    (state) => state.assessment
  );

  useEffect(() => {
    dispatch(getQuestions(id));
  }, [dispatch, id]);

  const handleClick = async () => {
    history.push(`/new-created-questions/${id}`);
  };

  // console.log(assessment)
  return (
    <>
    {isLoading ? (
      <div id='loader'></div>
    ) : (
      <div className="teacher-assessment">
      <div className="teacher-dashboard-list">
        <Link to={`/course-teacher/course/${id}`}>
          <p>Course</p>
        </Link>
        <p className="open">Assessment</p>
        <Link to={`/course-teacher/students/${id}`}>
          <p>Students</p>
        </Link>
      </div>

      <>
        <div className="teacher-question-title">
          <h4>Questions</h4>
        </div>
        {assessment.length === 0 ? (
          <div className="teacher-save-question-box">
            <div
              className="teacher-new-question-save"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h4>{assessment.length} Questions</h4>
              <span
                style={{
                  textDecoration: "underline",
                }}
              >
                <Link to={`/teacher-new-assessment/${id}`}>
                  Add New Question
                    </Link>
              </span>
              <Spinner
                style={{
                  width: "6rem",
                  height: "6rem",
                  position: "fixed",
                  top: "50%",
                  left: "53%",
                }}
                color="secondary"
              />
            </div>
          </div>
        ) : (
          <>
            {assessment.map((item) => (
              <EditAssessment
                numberAll={item.number}
                questionAll={item.question}
                optionsAll={item.options}
                remarksAll={item.remarks}
                queId={item._id}
              />
            ))}
            <div
              style={{
                textDecoration: "underline",
                marginLeft: "16%",
                marginTop: "20px",
              }}
            >
              <Link to={`/created-questions/new/${id}`}>
                Add New Question
                  </Link>
            </div>
            <div className="save-exam-question save-update-question">
              <button
                onClick={() =>
                  handleClick().then(() => window.location.reload(false))
                }
              >
                Save Exam
                  </button>
            </div>
          </>
        )}
      </>
      <NotificationContainer />
    </div>
    )}
    </>
  );
};

export default TeacherAssessmentTabEdit;
