import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import ContentCards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCourses, getCategoryById } from "../../redux/actions/CoursesAction";
import { getHomepage } from "../../redux/actions/HomePage";
import defaultImg from "../../assets/defaultLektur.png";
import { NotificationContainer } from "react-notifications";

function Content() {
  const dispatch = useDispatch();
  const { courses, searchCourse } = useSelector((state) => state.courses);
  const { homePage, isHomeLoading } = useSelector((state) => state.homePage);

  const [categoryIds, setCategoryIds] = useState(0);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getHomepage());
  }, [dispatch]);

  const handleCategoryById = (id) => {
    setCategoryIds(id);
    dispatch(getCategoryById(id));
  };

  console.log(homePage);
  // console.log(categoryById);
  return (
    <>
      {isHomeLoading ? (
        <div id="loader"></div>
      ) : (
        <div className="content">
          {searchCourse !== "" ? (
            <div className="material">
              <div className="card-search">
                <h3>"Search Result"</h3>
              </div>
            </div>
          ) : (
            <div className="material">
              <div className="home">What to learn next</div>
              <div className="btn-material">
                {homePage !== null &&
                  homePage.category.map((item) => (
                    <button
                      className="btn-home-detail"
                      style={{
                        color: categoryIds === item._id && "#FFFFFF",
                        backgroundColor: categoryIds === item._id && "#EF9C27",
                        opacity: categoryIds === item._id && 0.8,
                      }}
                      key={item._id}
                      onClick={() => handleCategoryById(item._id)}
                    >
                      {item.categories}
                    </button>
                  ))}
              </div>
            </div>
          )}
          <div className="card-content">
            {searchCourse !== "" ? (
              <Row className="content-card-container">
                {searchCourse.map((item, index) => (
                  <Col
                    xl="3"
                    md="6"
                    sm="12"
                    key={index}
                    className="card-container"
                  >
                    <Link
                      to={`/course-detail/${item._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ContentCards
                        image={item.image === null ? defaultImg : item.image}
                        text={item.overview}
                        title={item.title}
                        lecture={item.fullname[0].fullname}
                        video_numbers={item.totalVideo}
                        material_numbers={item.totalMaterial}
                        footer={
                          item.category
                            ? item.category
                            : "General Science"
                        }
                      />
                    </Link>
                  </Col>
                ))}
              </Row>
            ) : (
              <Row className="content-card-container">
                {courses !== null &&
                  courses.map((item) => (
                    <Col
                      xl="3"
                      md="6"
                      sm="12"
                      key={item._id}
                      className="card-container"
                    >
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
                          footer={
                            item.categoryId
                              ? item.categoryId.categories
                              : "General Science"
                          }
                        />
                      </Link>
                    </Col>
                  ))}
              </Row>
            )}
          </div>
        </div>
      )}
      <NotificationContainer />
    </>
  );
}

export default Content;
