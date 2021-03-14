import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentProfile from '../Profile';
import { getCertificate, getStudentCourses } from "../../../redux/actions/CoursesAction";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from 'jspdf';
import lekturLogo from '../../../assets/cropLektur.png';
import certificate from '../../../assets/LekturCertificate.png';
import signature from '../../../assets/signature.png'

const StudentBoardAssessment = () => {
    const [isDownload, setDownload] = useState(false)
    const dispatch = useDispatch()
    const {studentCourses, certificateData, isLoading} = useSelector(state => state.courses);

    useEffect(() => {
        dispatch(getStudentCourses());
    }, [dispatch]);

    const handleDownload = () => {
        const doc = new jsPDF('landscape');
        doc.addImage(certificate, "PNG", 0, 0, 290, 210);
        doc.setFontSize(40);
        doc.setFont('times', 'bold')
        doc.setTextColor(224, 157, 40);
        doc.text(`${certificateData.fullname}`, 180, 115, 'center');
        doc.setFontSize(20);
        doc.setFont('times', 'normal')
        doc.setTextColor(53, 56, 61);
        doc.text(`for successfully completing the course`, 180, 130, 'center');
        doc.setFontSize(30)
        doc.setTextColor(224, 157, 40);
        doc.text(`"${certificateData.courseTitle}"`, 180, 140, 'center');
        doc.setTextColor(53, 56, 61);
        doc.setFontSize(20)
        doc.text(`with a consolidated score of ${certificateData.score}%`, 180, 148, 'center');
        doc.setTextColor(53, 56, 61);
        doc.setFontSize(15)
        doc.addImage(lekturLogo, "PNG", 100, 158, 35, 30);
        doc.text(certificateData.completionDate ? certificateData.completionDate : '', 120, 195, 'center');
        doc.setFont('fantasy', 'bold')
        doc.setFontSize(20)
        doc.addImage(signature, "PNG", 193, 160, 100, 30);
        doc.setTextColor(53, 56, 61);
        doc.setFontSize(15)
        doc.setFont('times', 'normal')
        doc.text(certificateData.teacher, 240, 195, 'center');

        doc.save(`Lektur ${certificateData.courseTitle} Certificate`)
        setDownload(false)
    }

    const handleView = () => {
        const doc = new jsPDF('landscape');
        doc.addImage(certificate, "PNG", 0, 0, 290, 210);
        doc.setFontSize(40);
        doc.setFont('times', 'bold')
        doc.setTextColor(224, 157, 40);
        doc.text(`${certificateData.fullname}`, 180, 115, 'center');
        doc.setFontSize(20);
        doc.setFont('times', 'normal')
        doc.setTextColor(53, 56, 61);
        doc.text(`for successfully completing the course`, 180, 130, 'center');
        doc.setFontSize(30)
        doc.setTextColor(224, 157, 40);
        doc.text(`"${certificateData.courseTitle}"`, 180, 140, 'center');
        doc.setTextColor(53, 56, 61);
        doc.setFontSize(20)
        doc.text(`with a consolidated score of ${certificateData.score}%`, 180, 148, 'center');
        doc.setTextColor(53, 56, 61);
        doc.setFontSize(15)
        doc.addImage(lekturLogo, "PNG", 100, 158, 35, 30);
        doc.text(certificateData.completionDate ? certificateData.completionDate : '', 120, 195, 'center');
        doc.setFont('fantasy', 'bold')
        doc.setFontSize(20)
        doc.addImage(signature, "PNG", 193, 160, 100, 30);
        doc.setTextColor(53, 56, 61);
        doc.setFontSize(15)
        doc.setFont('times', 'normal')
        doc.text(certificateData.teacher, 240, 195, 'center');
        window.open(doc.output('bloburl'))
        setDownload(false)
    }

    const handleDownloadHere = (id) => {
        dispatch(getCertificate(id))
        setDownload(true)
    }

    // console.log(studentCourses)
    // console.log('certificate', certificateData)
    return (
        <>
        {studentCourses.course === null || studentCourses.course === undefined ? (
            <div id='loader'></div>
        ) : (
            <div className="student-board">
            <div>
                <StudentProfile />
            </div>
            <div className='student-lesson'>
                <div className='student-course-assessment'>
                    <Link to='/student-courses'>
                        <p>Courses</p>
                    </Link>
                    <p><b>Assesment</b></p>
                </div>
                <div className='student-course-list'>
                {studentCourses.course.map((item, index) => (
                    <div>
                        {item.status === 1 && (item.totalSeenCourses === item.totalCourse && item.totalSeenCourses !== 0) ? (
                        <div className='student-assess-detail'>
                            <div className='assessment-detail'>
                                <h4>{item.courseId.title}</h4>
                                <p className='lecture'>{item.courseId.teacherId.fullname}</p>
                                <p className='complete'>Completed at: -</p>
                            </div>
                            <div className='assessment-precentage'>
                                <div>
                                    <p><i>No result yet</i></p>
                                    <Link to={`/assessment/${item.courseId._id}`}>
                                        <button>Take Test</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        ) : item.status === 1 && (item.totalSeenCourses !== item.totalCourse || item.totalSeenCourses === 0)? (
                        <div className='student-assess-detail'>
                            <div className='assessment-detail'>
                                <h4>{item.courseId.title}</h4>
                                <p className='lecture'>{item.courseId.teacherId.fullname}</p>
                                <p className='complete'>Completed at: -</p>
                            </div>
                            <div className='assessment-precentage'>
                                <div>
                                    <p><i>No result yet</i></p>
                                </div>
                            </div>
                        </div>
                        ) : item.status === 2 ? (
                        <div className='student-assess-detail'>
                            <div className='assessment-detail'>
                                <h4>{item.courseId.title}</h4>
                                <p className='lecture'>{item.courseId.teacherId.fullname}</p>
                                <p className='complete'>Completed at: {item.completionDate} </p>
                            </div>
                            <div className='assessment-precentage'>
                                <div>
                                    <h4>{item.score}%</h4>
                                    <p>Question Correct</p>
                                    {isDownload && isLoading === false ? (
                                        <div className='button-download-certificate'>
                                        <button onClick={() => handleDownload()}>Download</button>
                                        <button onClick={() => handleView()}>View</button>
                                        </div>
                                    ) : isLoading === true ? (
                                        <div id='small-loader'></div>
                                    ) : (
                                        <p className='download-certificate'>Download or View your certificate <span onClick={() => handleDownloadHere(item.courseId._id)}>here</span></p>
                                    )}
                                </div>
                            </div>
                        </div>
                        ) : (
                            <div className='student-assess-detail'></div>
                        )}
                    </div>
                ))}
                </div>
                </div>
            </div>
        )}
        </>
    )
}

export default StudentBoardAssessment;