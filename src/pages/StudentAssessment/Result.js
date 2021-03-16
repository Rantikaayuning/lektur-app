import React, { useEffect, useState } from "react";
import checklist from "../../assets/Vector2.png";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../redux/actions/AssessmentAction";
import { useParams, Link } from "react-router-dom";
import { getCourseDetail } from "../../redux/actions/CoursesAction";
import { NotificationContainer } from "react-notifications";

const StudentAssessmentResult = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { assessment, isAssessmentLoading } = useSelector(
    (state) => state.assessment
  );
  const { courseDetail } = useSelector((state) => state.courses);

  const [selected, setSelected] = useState({});
  const [score, setScore] = useState();

  useEffect(() => {
    dispatch(getQuestions(id));
    dispatch(getCourseDetail(id));
    if (localStorage.getItem("selected")) {
      setSelected(JSON.parse(localStorage.getItem("selected")));
    }
    if (localStorage.getItem("score")) {
      setScore(JSON.parse(localStorage.getItem("score")));
    }
  }, [dispatch, id]);

  // const inputFromUser = Object.values(selected)

  // console.log('selected', selected)
  // console.log('assessment', assessment)
  // console.log('courseDetail', courseDetail)

  return (
    <>
      {isAssessmentLoading ? (
        <div id="loader"></div>
      ) : (
        <div className="student-assessment">
          <div className="assessment-title">
            {courseDetail === null ? (
              <div>
                <span className="bread-crumb">Final Assessment</span> /{" "}
                <span className="link">Result</span>
              </div>
            ) : (
              <div>
                <Link to={`/course-detail/${courseDetail.course._id}`}>
                  <span className="bread-crumb">
                    {courseDetail.course.title}
                  </span>
                </Link>{" "}
                / <span className="bread-crumb">Final Assessment </span>
                / <span className="link">Result</span>
              </div>
            )}
            <div className="final-assessment-title">
              <p>Final Assessment Result</p>
              <div className="result">
                <p className="total">{score}%</p>
                <p>Questions correct</p>
              </div>
            </div>
          </div>
          <div className="student-assessment-box">
            {assessment.length === null ? (
              <>
                <h4> </h4>
                <hr class="solid"></hr>
              </>
            ) : (
              <>
                <h4>{assessment.length} Questions</h4>
                <hr class="solid"></hr>
              </>
            )}

            {assessment.map((item, index) => (
              <div className="assessment-questions-result">
                <div className="questions-answer-box">
                  <p>
                    {item.number}. {item.question}
                  </p>
                  <>
                    {item.options.map((item, id) => (
                      <>
                        {item.value === assessment[index].answer ? (
                          <label class="container" key={id}>
                            <span>
                              <img src={checklist} alt="answer" />{" "}
                            </span>
                            <span>{item.text}</span>
                          </label>
                        ) : (
                          <label class="container">
                            <span>
                              <input
                                type="radio"
                                name="radio"
                                value={item.value}
                                disabled
                              />{" "}
                            </span>
                            <span>{item.text}</span>
                          </label>
                        )}
                      </>
                    ))}
                  </>
                  <br />
                  <br />
                </div>
                <div className="assessment-correct">
                  {selected[item.question] === "1" ? (
                    <p className="correct">Correct</p>
                  ) : (
                    <p className="wrong">Wrong</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <NotificationContainer />
    </>
  );
};

export default StudentAssessmentResult;
