import React, { useEffect, useState } from 'react'
import { Row, Col } from "reactstrap";
import { Link, useParams } from 'react-router-dom'
import ContentCards from "../../components/ContentCard/Cards";
import ContentMaterial from "./content/index"
import logo from "../../assets/Vector.png"
import logo2 from "../../assets/Vector4.png"
import logo3 from "../../assets/Vector1.png"
import logo4 from "../../assets/finalSymbol.png"
import logo5 from "../../assets/radio-button.png"
import logo6 from "../../assets/Vector2.png"
import { getContentDetail, getCourses } from "../../redux/actions/CoursesAction";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import defaultImg from "../../assets/defaultLektur.png";
import { NotificationContainer } from "react-notifications";

export default function StudentMaterial() {
    const [openLesson, setOpenLesson] = useState(false)
    const [openMaterial, setOpenMaterial] = useState(false)
    const { id, content } = useParams()

    const dispatch = useDispatch()
    const { contentDetail, isLoading } = useSelector(state => state.courses)

    useEffect(() => {
        dispatch(getContentDetail(content))
        dispatch(getCourses());
    }, [dispatch, id, content])

    const handleOpenLesson = () => {
        setOpenLesson(!openLesson)
    }
    const find = contentDetail.listContent && contentDetail.listContent.find((item, id) => item.contentStatus === 0)
    // console.log("content", contentDetail)
    // console.log("find", find)
    return (
        <>
            {isLoading ? (
                <div id='loader'></div>
            ) : contentDetail.content !== undefined && (
                <div className="content-material">
                    <div className="text">
                        <div>
                            <Link to={`/course-detail/${id}`}>
                                <span className="bread-crumb">{contentDetail.content.courseId.title}</span>
                            </Link>{" "}/
                            <span className="link"> Lesson : {contentDetail.content.contentId.title}</span>
                        </div>
                        <div className="text-title">Lesson : {contentDetail.content.contentId.title}</div>
                    </div>
                    <div className="content-header">
                        <div className="image-content">
                            <div className="inframe">
                                <ReactPlayer
                                    onEnablePIP={true}
                                    controls url={contentDetail.content.contentId.video}
                                    className='video'
                                    width='100%'
                                    height='100%'
                                    light={contentDetail.content.contentId.thumbnail}
                                    playing={true}
                                    volume={0.182}
                                    onEnded={handleOpenLesson}
                                />
                            </div>
                            <div className="content-lock-material">
                                <ContentMaterial
                                    lessonList=
                                    {contentDetail.listContent.map((item, index) => (
                                        <>
                                            {item.contentStatus === 1 ? (
                                                <Link to={`/course-content/${id}/${item.contentId._id}`}>
                                                    <div className='unlocked'>
                                                        <img src={logo} alt='logo' />Lesson #{index + 1} : {item.contentId.title}
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div className='locked'>
                                                    <img src={logo2} alt='logo' />Lesson #{index + 1} : {item.contentId.title}
                                                </div>
                                            )}
                                        </>
                                    ))}
                                />
                            </div>
                        </div>
                        <div className="content-lock">
                            <div className="description-text">
                                <div className="title-des">Description</div>
                                <p>{contentDetail.content.contentId.description}</p>
                            </div>
                            <div className="next">
                                <div className="title-next">What's Next</div>
                                {contentDetail.material.map((item, index) => (
                                    <p>
                                        <img src={openMaterial ? logo6 : logo5} alt='cinematic course' />{" "}Read course material :{' '}
                                        <a href={item.material} target='_blank' rel='noreferrer' onClick={() => setOpenMaterial(true)}>
                                            <span>{contentDetail.content.contentId.title} {index === 0 ? '' : (index + 1)}.pdf</span>
                                        </a>
                                    </p>
                                ))}

                                {find !== null && find !== undefined && contentDetail.content.contentId.video !== null ? (
                                    <Link to={`/course-content/${id}/${find.contentId._id}`}>
                                        <button className={openLesson ? 'next-lesson-button' : 'next-locked-button'} onClick={handleOpenLesson}>
                                            <img src={openLesson ? logo3 : logo2} alt='next lesson' />{" "}Next Lesson : {find.contentId.title}
                                        </button>
                                    </Link>
                                ) : find !== null && find !== undefined && contentDetail.content.contentId.video === null ? (
                                    <Link to={`/course-content/${id}/${find.contentId._id}`}>
                                        <button className={'next-lesson-button'} onClick={handleOpenLesson}>
                                            <img src={logo3} alt='next lesson' />{" "}Next Lesson : {find.contentId.title}
                                        </button>
                                    </Link>
                                ) : (
                                    <Link to={`/assessment/${id}`}>
                                        <button className='next-lesson-button'>
                                            <img src={logo4} alt='next lesson' />{" "}Final Assessment
                                </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="card-text-course">Related Course</div>
                        <Row className="content-card-container">
                            {contentDetail.relatedCourse.map((item, index) => (index < 4 &&
                                <Col xl="3" md="6" sm="12" key={index} className="card-container">
                                    <Link
                                        to={`/course-detail/${item._id}`}
                                        style={{ textDecoration: "none", color: "black" }}
                                    >
                                        <ContentCards
                                            image={item.image === null ? defaultImg : item.image}
                                            text={item.overview}
                                            title={item.title}
                                            lecture={item.teacherId.fullname}
                                            video_numbers={item.totalVideo}
                                            material_numbers={item.totalMaterial}
                                        />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className="empty"></div>
                </div>
            )}
            <NotificationContainer />
        </>
    )
}
