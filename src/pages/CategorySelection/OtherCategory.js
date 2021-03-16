import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

import ContentCards from "../../components/ContentCard/Cards";
import { getCourses } from "../../redux/actions/CoursesAction";
import defaultImg from "../../assets/defaultLektur.png";
import { NotificationContainer } from "react-notifications";

function OtherCategory() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  // console.log(courses);
  // console.log(courses.filter((item) => item.categoryId.categories.length > 11));

  return (
    <div>
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Data Science"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter((item) => item.categoryId.categories === "Data Science")
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      <br />
      <br />
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Food and Beverage"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter(
                (item) => item.categoryId.categories === "Food and Beverage"
              )
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      <br />
      <br />
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Human Resources"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter(
                (item) => item.categoryId.categories === "Human Resources"
              )
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      <br />
      <br />
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Media and Journalism"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter(
                (item) =>
                  item.categoryId.categories === "Media and Journalism"
              )
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      <br />
      <br />
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Network and Security"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter(
                (item) =>
                  item.categoryId.categories === "Network and Security"
              )
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      <br />
      <br />
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Pharmacology"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter((item) => item.categoryId.categories === "Pharmacology")
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      <br />
      <br />
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Sales and Marketing"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter(
                (item) => item.categoryId.categories === "Sales and Marketing"
              )
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      <br />
      <br />
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Science &amp; Engineering"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter(
                (item) =>
                  item.categoryId.categories === "Science & Engineering"
              )
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      <br />
      <br />
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Social Science"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter(
                (item) => item.categoryId.categories === "Social Science"
              )
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      <br />
      <br />
      <>
        <div className="material">
          <div className="card-search">
            <h3>"Software Engineering"</h3>
          </div>
        </div>
        <Row className="content-card-container">
          {courses.length !== 0
            ? courses
              .filter((item) => item.categoryId)
              .filter(
                (item) =>
                  item.categoryId.categories === "Software Engineering"
              )
              .map((item) => (
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
              ))
            : ""}
        </Row>
      </>
      {/* <br />
      <br /> */}
      <NotificationContainer />
    </div>
  );
}

export default OtherCategory;
