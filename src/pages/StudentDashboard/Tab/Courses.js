import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentProfile from '../Profile';
import { Progress } from 'reactstrap'
import { Modal } from 'react-bootstrap';
import { PopUpCourse } from '../../../components/PopUp/PopUpCourse';
import { PopUpMaterial } from '../../../components/PopUp/PopUpMaterial';
import { useDispatch, useSelector } from "react-redux";
import { getStudentCourses, getPopUpContent, getPopUpMaterial, getCourseDetail } from "../../../redux/actions/CoursesAction";
import defaultImg from "../../../assets/defaultLektur.png";
import logo from '../../../assets/checklist2.png';
import logo2 from '../../../assets/Vector4.png';
import { NotificationContainer } from "react-notifications";

const StudentBoardCourses = () => {
    const [contentModal, setContentModal] = useState(false);
    const [materialModal, setMaterialModal] = useState(false);

    const dispatch = useDispatch();
    const { studentCourses, popUpContent, popUpMaterial, courseDetail, isLoading } = useSelector(state => state.courses);

    useEffect(() => {
        dispatch(getStudentCourses());
    }, [dispatch]);

    const handlePopUpContent = (id) => {
        dispatch(getPopUpContent(id))
        dispatch(getCourseDetail(id))
        setContentModal(true)
    }

    const handlePopUpMaterial = (id) => {
        dispatch(getPopUpMaterial(id))
        setMaterialModal(true)
    }

    // console.log("content", popUpContent)
    // console.log("material", popUpMaterial)
    // console.log("course", studentCourses)
    // console.log('detail', courseDetail)
    return (
        <>
            {(studentCourses.course === null || studentCourses.course === undefined) ? (
                <div id='loader'></div>
            ) : (
                <div className="student-board">
                    <div>
                        <StudentProfile />
                    </div>
                    <div className='student-lesson'>
                        <div className='student-course-assessment'>
                            <p><b>Courses</b></p>
                            <Link to='/student-assessment'>
                                <p>Assesment</p>
                            </Link>
                        </div>
                        <div className='student-course-list'>
                            {studentCourses === null ? (
                                <div></div>
                            ) : (
                                <>
                                    {studentCourses.course.map((item, index) => (
                                        <div>
                                            {item.courseId === null || item.courseId === undefined ? (
                                                <div></div>
                                            ) :
                                                item.status === 2 && (item.courseId !== undefined || item.courseId !== null) ? (
                                                    <div className='student-course-detail' key={index}>
                                                        <img src={item.courseId.image === null ? defaultImg : item.courseId.image} alt='courses' />
                                                        <div className='course-detail-first'>
                                                            <p><b>{item.courseId.title}</b></p>
                                                            <p className='title'>By {item.courseId.teacherId.fullname}</p>
                                                            <p className='title-link' onClick={() => handlePopUpMaterial(item.courseId._id)}>
                                                                <u>See course materials</u>
                                                            </p>
                                                        </div>
                                                        <div className='course-detail-second'>
                                                            <p><Progress color="warning" value={item.totalSeenCourses / item.totalCourse * 100} /></p>
                                                            <p className='title'>{item.totalSeenCourses}/{item.totalCourse} Course Complete</p>
                                                            <p><button onClick={() => handlePopUpContent(item.courseId._id)}>Review</button></p>
                                                        </div>
                                                    </div>
                                                ) : item.status === 1 && (item.courseId !== undefined || item.courseId !== null) ? (
                                                    <div className='student-course-detail' key={index}>
                                                        <img src={item.courseId.image === null ? defaultImg : item.courseId.image} alt='courses' />
                                                        <div className='course-detail-first'>
                                                            <p><b>{item.courseId.title}</b></p>
                                                            <p className='title'>By {item.courseId.teacherId.fullname}</p>
                                                            <p className='title-link' onClick={() => handlePopUpMaterial(item.courseId._id)}>
                                                                <u>See course materials</u>
                                                            </p>
                                                        </div>
                                                        <div className='course-detail-second'>
                                                            <p><Progress color="warning" value={item.totalSeenCourses / item.totalCourse * 100} /></p>
                                                            <p className='title'>{item.totalSeenCourses === 0 ? 0 : `${item.totalSeenCourses}/${item.totalCourse}`} Course Complete</p>
                                                            <p><button onClick={() => handlePopUpContent(item.courseId._id)}>Lesson {item.totalSeenCourses === 0 ? '' : `#${item.totalSeenCourses}`}</button></p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='student-course-detail' key={index}>
                                                        <img src={item.courseId.image === null ? defaultImg : item.courseId.image} alt='courses' />
                                                        <div className='course-detail-first'>
                                                            <p><b>{item.courseId.title}</b></p>
                                                            <p className='title'>By {item.courseId.teacherId.fullname}</p>
                                                        </div>
                                                        <div className='course-detail-second'>
                                                            <p className='title'>Waiting Approval</p>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </>
                                // ) : studentCourses.course.courseId === undefined && (
                                //     <div className='student-course-detail'></div>    
                            )}
                        </div>

                        {/* content popup */}
                        {popUpContent.length > 0 && courseDetail !== null && isLoading === false ? (
                            <Modal
                                show={contentModal}
                                backdropClassName='backdrop-content'
                                size='lg'
                                onHide={() => setContentModal(false)}
                                className='pop-up-course-box'
                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"
                            >
                                <PopUpCourse
                                    title={<div>Content</div>}
                                    lessonContent=
                                    {popUpContent.map((item, id) => (
                                        <div className="lock-content" key={id}>
                                            {item.contentStatus === 1 || id === 0 ? (
                                                <Link to={`/course-content/${courseDetail.course._id}/${item.contentId}`}>
                                                    <p className='unlocked'>
                                                        <img src={logo} alt='logo' />Lesson #{id + 1} {item.title}
                                                    </p>
                                                </Link>
                                            ) : (
                                                <p className='locked'>
                                                    <img src={logo2} alt='logo' />
                                                    Lesson #{id + 1} {item.title}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                />
                            </Modal>
                        ) : isLoading === true ? (
                            <Modal
                                show={contentModal}
                                backdropClassName='backdrop-content'
                                size='lg'
                                onHide={() => setContentModal(false)}
                                className='pop-up-course-box'
                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"
                            >
                                <PopUpCourse
                                    title={<div>Content</div>}
                                    lessonContent={<div id='popup-loader'></div>}
                                />
                            </Modal>
                        ) : (
                            <Modal
                                show={contentModal}
                                backdropClassName='backdrop-content'
                                size='lg'
                                onHide={() => setContentModal(false)}
                                className='pop-up-course-box'
                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"
                            >
                                <PopUpCourse
                                    title={<div>Content</div>}
                                    lessonContent={<p className='pop-up-course-nothing'>No Content yet</p>}
                                />
                            </Modal>
                        )}

                        {/* material popup */}
                        {popUpMaterial.length !== null && isLoading === false ? (
                            <Modal
                                show={materialModal}
                                backdropClassName='backdrop-content'
                                size='lg'
                                onHide={() => setMaterialModal(false)}
                                dialogClassName="modal-90w"
                                className='pop-up-material-box'
                                aria-labelledby="example-custom-modal-styling-title"
                            >
                                <PopUpMaterial
                                    title={<div>Material</div>}
                                    materialContent=
                                    {<div className="pop-up-course-material">
                                        {popUpMaterial.map((item, id) => (
                                            <>
                                                {/* <p>Lesson : {item.contentId.title}</p> */}
                                                <li key={item.contentId.title}>
                                                    <label>Read course material : <a href={item.material} target='_blank' rel='noreferrer'>{item.contentId.title}.pdf</a></label>
                                                </li>
                                            </>
                                        ))}
                                    </div>}
                                />
                            </Modal>
                        ) : isLoading === true ? (
                            <Modal
                                show={materialModal}
                                backdropClassName='backdrop-content'
                                size='lg'
                                onHide={() => setMaterialModal(false)}
                                dialogClassName="modal-90w"
                                className='pop-up-material-box'
                                aria-labelledby="example-custom-modal-styling-title"
                            >
                                <PopUpMaterial
                                    title={<div>Material</div>}
                                    materialContent={<div id='popup-loader'></div>}
                                />
                            </Modal>
                        ) : (
                            <Modal
                                show={materialModal}
                                backdropClassName='backdrop-content'
                                size='lg'
                                onHide={() => setMaterialModal(false)}
                                dialogClassName="modal-90w"
                                className='pop-up-material-box'
                                aria-labelledby="example-custom-modal-styling-title"
                            >
                                <PopUpMaterial
                                    title={<div>Material</div>}
                                    materialContent={<p className='pop-up-course-nothing'>No Material yet</p>}
                                />
                            </Modal>
                        )}
                    </div>
                </div>
            )}
            <NotificationContainer />
        </>
    )
}

export default StudentBoardCourses;
