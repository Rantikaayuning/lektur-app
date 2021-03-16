import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { postAssessment } from "../../redux/actions/AssessmentAction";
import { produce } from "immer";
import { useDispatch } from "react-redux";
import { NotificationManager, NotificationContainer } from "react-notifications";
// import "react-notifications/lib/notifications.css";

function CreateAssessment() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [buttonText, setButtonText] = useState("Save Question");

  const [question, setQuestion] = useState({
    number: null,
    question: "",
    remarks: "",
  });

  const [options, setOptions] = useState([
    { value: 1, text: "" },
    { value: 2, text: "" },
    { value: 3, text: "" },
    { value: 4, text: "" },
  ]);

  const [answer, setAnswer] = useState(null);

  const handleChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // if (messageAlert !== null && messageAlert.code === 201) {
    //   NotificationManager.success("", messageAlert.message, 3000); // `${messageAlert}`
    // }
    e.preventDefault();
    const body = {
      number: question.number,
      question: question.question,
      remarks: question.remarks,
      answer: answer,
      options: options,
    };
    dispatch(postAssessment(body, id));
  };

  // console.log(JSON.stringify(options, null, 2));

  return (
    <>
      <div className="teacher-assessment">
        <>
          <form className="teacher-new-question">
            <div className="teacher-option-title">
              <h4 className="question-answer-tag">
                #{" "}
                <input
                  className="number-input-tag"
                  type="text"
                  name="number"
                  placeholder="1"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <input
                  className="question-input-tag"
                  type="text"
                  placeholder="Question"
                  name="question"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </h4>
            </div>
            <br />
            <div className="teacher-option-box">
              <div className="teacher-answer-option">
                <h5 className="answer-title"> Answer</h5>
                <br />
                {options.map((p, index) => {
                  return (
                    <div key={p.value}>
                      <label class="container-assessment">
                        <input
                          className="radio-option"
                          type="radio"
                          name="value"
                          required
                          onChange={(e) => {
                            const value = e.target.value;
                            setOptions((currentOption) =>
                              produce(currentOption, (v) => {
                                v[index].value = Number(value);
                              })
                            );
                            console.log(value);
                            // e.target.value
                            setAnswer(value);
                          }}
                          value={p.value}
                        />

                        <input
                          className="options-table"
                          required
                          onChange={(e) => {
                            const text = e.target.value;
                            setOptions((currentOption) =>
                              produce(currentOption, (v) => {
                                v[index].text = text;
                              })
                            );
                            // e.target.value
                          }}
                          value={p.text}
                          placeholder="Option"
                        />

                        {/* a button bellow is for option deletion */}
                        <button
                          className="option-deletion-btn"
                          onClick={() =>
                            setOptions((currentOption) =>
                              currentOption.filter((x) => x.value !== p.value)
                            )
                          }
                        >
                          x
                        </button>
                      </label>
                    </div>
                  );
                })}
                {/* <pre>{JSON.stringify(options, null, 2)}</pre> */}
              </div>
              <div className="teacher-answer-remark">
                <h5>Remark</h5>
                <br />
                <textarea
                  type="text"
                  name="remarks"
                  placeholder="Explain here..."
                  cols="61"
                  rows="5"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <br />
            <div className="more-option-save">
              <div className="teacher-add-more">
                <button
                  onClick={() =>
                    setOptions((currentOption) => [
                      ...currentOption,
                      {
                        value: options.length + 1,
                        text: "",
                      },
                    ])
                  }
                >
                  Add More Options
                </button>
              </div>

              <p
                className="save-per-question"
                onClick={() =>
                  !question.number
                    ? NotificationManager.error("", `Please fill in the number`, 3000)
                    : !question.question
                      ? NotificationManager.error("", `Please fill in the question`, 3000)
                      : !answer
                        ? NotificationManager.error("", `Please fill in the options and select the correct answer`, 3000)
                        : setButtonText("Question Saved")
                }
              >
                <button type="submit" onClick={handleSubmit}>
                  {buttonText}
                </button>
              </p>
            </div>
          </form>
        </>
      </div>
      <NotificationContainer />
    </>
  );
}

export default CreateAssessment;
