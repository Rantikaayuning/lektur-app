import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";

import ContentCards from "../../components/ContentCard/Cards";
import { getCategoryById } from "../../redux/actions/CoursesAction";
import defaultImg from "../../assets/defaultLektur.png";
import { NotificationContainer } from "react-notifications";
// import { getHomepage } from "../../redux/actions/HomePage";

function CategorySelection() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { categoryById } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getCategoryById(id));
    // dispatch(getHomepage());
  }, [dispatch, id]);

  // console.log(categories);

  return (
    <div>
      {categoryById.length !== 0 ? (
        <div className="material">
          <div className="card-search">
            <h3>{categoryById.length} "Result"</h3>
          </div>
        </div>
      ) : (
        <div className="material">
          <div className="card-search">
            <h3>"0 Result"</h3>
          </div>
        </div>
      )}

      <Row className="content-card-container">
        {categoryById.length !== 0
          ? categoryById.map((item) => (
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
      <NotificationContainer />
    </div>
  );
}

export default CategorySelection;
