import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getQuestions, putFinalScore } from '../../redux/actions/AssessmentAction'
import { getCourseDetail } from '../../redux/actions/CoursesAction';
import { Modal, Button } from 'react-bootstrap'
import { NotificationContainer } from "react-notifications";

const StudentAssessment = () => {
  const { id } = useParams()

  const dispatch = useDispatch();
  const { assessment, isAssessmentLoading } = useSelector(state => state.assessment)
  const { courseDetail } = useSelector(state => state.courses)

  const [selected, setSelected] = useState({})

  const handleChange = (e) => {
    setSelected({
      ...selected,
      [e.target.name]: e.target.value
    })
  }

  const handleCheck = () => {
    handleShow()
    localStorage.setItem('selected', JSON.stringify(selected));
  }

  const handleSubmit = () => {
    const calculateScore = Object.values(selected).reduce((a, b) => Number(a) + Number(b));
    const submitScore = Math.trunc(assessment.length !== null && (calculateScore / assessment.length) * 100);
    dispatch(putFinalScore(submitScore, id));
    localStorage.setItem('score', JSON.stringify(submitScore));
    handleClose()
  }

  useEffect(() => {
    dispatch(getQuestions(id));
    dispatch(getCourseDetail(id))
  }, [dispatch, id]);

  // Modal confirm submit
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const afterSelected = Object.values(selected)

  // console.log('finalScore', finalScore)
  // console.log('selected', selected)

  return (
    <>
      {isAssessmentLoading ? (
        <div id="loader"></div>
      ) : (
        <div className='student-assessment'>
          <div className="assessment-title">
            {courseDetail === null ? (
              <div>
                <span className="link">Final Assessment</span>
              </div>
            ) : (
              <div>
                <Link to={`/course-detail/${id}`}>
                  <span className="bread-crumb">{courseDetail.course.title}</span>
                </Link>{" "}/
                <span className="link"> Final Assessment</span>
              </div>
            )}
            <div className="final-assessment-title">Final Assessment</div>
          </div>
          <div className='student-assessment-box' >
            <h4>{assessment.length} Questions</h4>
            <hr class="solid"></hr>
            {assessment.map((question, index) => (
              <form key={assessment.number} >
                <div className='assessment-questions' key={index}>
                  <p>{question.number}. {question.question}</p>
                  <p>Answer</p>
                  <p>
                    {question.options.map((option, id) => (
                      <label for={id} className='container'>
                        <input
                          id={id}
                          type='radio'
                          name={assessment[index].question}
                          value={option.value === assessment[index].answer ? 1 : 0}
                          onChange={(e) => handleChange(e)}
                          disabled={!selected}
                        />
                        {option.text}
                      </label>
                    ))}
                  </p>
                </div>
              </form>
            ))}
          </div>
          <div className='submit-assessment'>
            <p>
              {afterSelected.length === 0 ? (
                <button className='disabled'>Submit Assessment</button>
              ) : (
                <button onClick={(e) => handleCheck(e)} className='button'>Submit Assessment</button>
              )}
            </p>
          </div>
        </div>
      )}

      <Modal show={show} onHide={handleClose} size='lg' backdropClassName='backdrop-content'>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className='submit-confirmation'>Are you sure you want to submit ?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
                </Button>
          <Link to={`/assessment/result/${id}`}>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
                </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      <NotificationContainer />
    </>
  )
}

export default StudentAssessment;