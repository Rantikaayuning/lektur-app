import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CreateAssessment from "../../../components/CreateAssessment";

const TeacherAssessmentTabNew = () => {
  const history = useHistory();
  const { id } = useParams();

  const [questionList, setQuestionList] = useState([]);

  const addQuestion = () => {
    setQuestionList(
      questionList.concat(<CreateAssessment key={questionList.length} />)
    );
  };

  const handleClickSave = async () => {
    history.push(`/created-questions/${id}`);
  };

  return (
    <>
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
          <CreateAssessment />
          <div>
            {questionList}
            <p onClick={addQuestion} className="add-new-question">
              Add new question
            </p>
          </div>

          <div className="save-exam-question">
            <button
              onClick={() =>
                handleClickSave().then(() => window.location.reload(true))
              }
            >
              Save Exam
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default TeacherAssessmentTabNew;
