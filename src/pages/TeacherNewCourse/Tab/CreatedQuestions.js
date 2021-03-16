import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import { NotificationContainer } from "react-notifications";

import imgEdit from "../../../assets/editicon.png";
import imgDropdown from "../../../assets/dropdownsymbol.png";
import { getQuestions } from "../../../redux/actions/AssessmentAction";

function CreatedQuestions() {
  // const [isPicked, setPicked] = useState({
  //   data: [...assessment],
  // });

  const { id } = useParams();

  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.assessment.assessment);
  const {isLoading} = useSelector((state) => state.assessment);

  useEffect(() => {
    dispatch(getQuestions(id));
  }, [dispatch, id]);

  function handleDropDown(index) {
    // isPicked.data[index].isChosen
    //   ? (isPicked.data[index].isChosen = false)
    //   : (isPicked.data[index].isChosen = true);
    // setPicked({ ...isPicked });
  }

  // console.log("allQuestions: ", allQuestions);

  return (
    <>
    {isLoading ? (
      <div id='loader'></div>
    ) : (
      <div className="teacher-assessment">
      <div className="teacher-dashboard-list">
        <Link to={`/course-filled-teacher/${id}`}>
          <p>Course</p>
        </Link>
        <p className="open">Assessment</p>
        <Link to={`/teacher-new-students/${id}`}>
          <p>Students</p>
        </Link>
      </div>
      <div className="teacher-save-question-box">
        {allQuestions.length === 0 ? (
          <div className="teacher-save-question-box">
            <div
              className="teacher-new-question-save"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h4>{allQuestions.length} Questions</h4>
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
            <div className="teacher-question-title">
              <h4>Questions</h4>
            </div>
            <div className="teacher-new-question-save">
              <div className="teacher-option-save">
                <h4>
                  {allQuestions.length} Questions{" "}
                  <Link to={`/created-questions/${id}`}>
                    <img src={imgEdit} alt="edit"></img>
                  </Link>
                </h4>
                <br />
              </div>
              <div className="save-question-box">
                {allQuestions.map((item, index) => (
                  <div className="questions-answer-box-save">
                    <div className="question-dropdown">
                      <p>
                        {item.number}. {item.question}
                      </p>
                      <p>
                        <img
                          src={imgDropdown}
                          alt="symbol"
                          onClick={() => {
                            handleDropDown(index);
                          }}
                        />
                      </p>
                    </div>
                    <p className="answer">Answer</p>
                    {item.options.map((option, index) => (
                      <label class="container">
                        <input
                          type="checkbox"
                          // name={index}
                          value={option.value}
                          checked={item.answer === option.value}
                        />
                        <span> {option.text}</span>
                        <span className="checkmark"></span>
                      </label>
                    ))}

                    <br />
                    <br />
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    textDecoration: "underline",
                  }}
                >
                  <Link to={`/teacher-new-assessment/${id}`}>
                    Add New Question
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <NotificationContainer />
    </div>
    )}
    </>
  );
}

export default CreatedQuestions;
