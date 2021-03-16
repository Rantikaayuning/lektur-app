import React from "react";
import bgcontent from "../../assets/rectangle55.png";
import { Link } from "react-router-dom";
import Content from "../../components/ContentCard/index";
import Jumbo from "../../components/Header/Jumbotron";
import {useSelector} from "react-redux"

const Home = () => {
  const { searchCourse } = useSelector(state => state.courses)
  const { isAuthentificated } = useSelector(state => state.users)
  const { homePage, isHomeLoading } = useSelector((state) => state.homePage);
  
  return (
    <>
      {searchCourse !== '' && isHomeLoading ? (
        <div></div>
      ) : homePage !== null && searchCourse === '' && (
        <Jumbo 
        urlMostPopular={homePage.mostPopular.video}
        totalEnrolled={homePage.mostPopular.mostPopularCourse[0].totalEnrolled}
        totalMaterial={homePage.mostPopular.mostPopularCourse[0].totalMaterial}
        totalVideos={homePage.mostPopular.mostPopularCourse[0].totalVideo}
        courseName={homePage.mostPopular.mostPopularCourse[0].title}
        teacherName={homePage.mostPopular.mostPopularCourse[0].teacherId.fullname}
        enrollButton={
            <Link to={`/course-detail/${homePage.mostPopular.mostPopularCourse[0]._id}`}>
            <button>
              <span>Enroll Now</span>
            </button>
            </Link>
          }
        />
      )}
        <Content />
        <div className="content-register">
          <img src={bgcontent} alt="background content" />
          <div className="register-button">
            <h1>
              Create Your <span className="own-class">Own Class</span>
            </h1>
            {isAuthentificated ? (
              <div></div>
            ) : (
            <Link to="/register">
              <button>Register Now</button>
            </Link>
            )}
          </div>
        </div>        
    </>
  );
};

export default Home;
