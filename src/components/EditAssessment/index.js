import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { produce } from "immer";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";

import {
  updateQuestion,
  getQuestions,
  deleteQuestion,
} from "../../redux/actions/AssessmentAction";
import trashCan from "../../assets/trash.png";


function EditAssessment(props) {
  const {
    className,
    numberAll,
    questionAll,
    optionsAll,
    remarksAll,
    queId,
  } = props;

  // const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [buttonText, setButtonText] = useState("Update Question");

  const [number, setNumber] = useState(numberAll);
  const [question, setQuestion] = useState(questionAll);
  const [remarks, setRemarks] = useState(remarksAll);
  // const [questionId, setQuestionId] = useState(queId);

  const [options, setOptions] = useState(
    optionsAll !== null
      ? optionsAll.map((item, index) => ({
        value: index + 1,
        text: item.text,
      }))
      : [
        { value: 1, text: "" },
        { value: 2, text: "" },
        { value: 8, text: "" },
        { value: 4, text: "" },
        { value: 5, text: "" },
      ]
  );

  const [answer, setAnswer] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      number: number,
      question: question,
      remarks: remarks,
      answer: answer,
      options: options,
    };
    dispatch(updateQuestion(body, id, queId))
      .then(() => dispatch(getQuestions(id)))
      .then(() => setButtonText("Updated"))
  };

  const deleteCreatedQuestion = async () => {
    dispatch(deleteQuestion(id, queId))
      .then(() => dispatch(getQuestions(id)))
      .then(() => window.location.reload(false));
    // .then(() => history.push(`/new-created-questions/${id}`));
  };

  // console.log(JSON.stringify(options, null, 2));

  return (
    <>
      <div className="teacher-assessment">
        <>
          <div className="teacher-new-question">
            <div className="teacher-option-title">
              <h4 className="question-answer-tag">
                <>
                  #{" "}
                  <input
                    className="number-input-tag"
                    type="text"
                    name="number"
                    placeholder="1"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </>
                <>
                  <input
                    className="question-input-tag"
                    type="text"
                    placeholder="Question"
                    name="question"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </>
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
                          }}
                          value={p.text}
                          placeholder="Option"
                        />

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
                <>
                  <textarea
                    type="text"
                    name="remarks"
                    placeholder="Explain here..."
                    cols="61"
                    rows="5"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </>
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

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img src={trashCan} onClick={toggle} className="trash-pic" alt='delete icon' />
                <p
                  type="submit"
                  className="save-per-question"
                  onClick={(e) =>
                    !number
                      ? NotificationManager.error("", `Please fill in the number`, 3000)
                      : !question
                        ? NotificationManager.error("", `Please fill in the question`, 3000)
                        : !answer
                          ? NotificationManager.error("", `Please fill in the options and select the correct answer`, 3000)
                          : setButtonText("CLICK to update!")
                  }
                >
                  <button
                    type="submit"
                    onClick={(e) =>
                      buttonText === "CLICK to update!" ? handleSubmit(e) : null
                    }
                  >
                    {buttonText}
                  </button>
                </p>
              </div>
            </div>
            <div>
              <Modal isOpen={modal} toggle={toggle} className={className} backdropClassName='backdrop-content'>
                <ModalBody>
                  Are you sure you want to delete this question?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={() => deleteCreatedQuestion().then(() => toggle())}
                  >
                    Delete
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default EditAssessment;
