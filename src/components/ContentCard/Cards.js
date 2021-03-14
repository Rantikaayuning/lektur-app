import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
} from "reactstrap";

function Cards(props) {
  const {
    image,
    title,
    lecture,
    video_numbers,
    material_numbers,
    text,
    footer,
  } = props;

  return (
    <div>
      <Card className="card">
        <CardImg
          top
          width="100%"
          src={image}
          alt={title}
          className="card-image"
        />
        <CardBody className="p-2">
          <CardTitle tag="p" className="card-title">
            {title}
          </CardTitle>
          <CardSubtitle tag="p" className="text-muted card-subtitle">
            By {lecture}
          </CardSubtitle>
          <span>
            <small className="text-muted">{video_numbers} Videos</small>{" "}
            <small className="text-muted material-numbers">
              {material_numbers} Learning Material
            </small>{" "}
          </span>
          <CardText className="mt-3 card-text">{text}</CardText>
        </CardBody>
        <div
          style={{
            background:
              footer === "Business"
                ? "#e2d5d5"
                : footer === "Data Science"
                ? "#fbe6c2"
                : footer === "Economics"
                ? "#f7d9d9"
                : footer === "Food and Beverage"
                ? "#f2b4b4"
                : footer === "Human Resources"
                ? "#eff0b6"
                : footer === "Literature"
                ? "#eaffd0"
                : footer === "Mathematics"
                ? "#eae3c8"
                : footer === "Media and Journalism"
                ? "#faf3e0"
                : footer === "Network and Security"
                ? "#ece2e1"
                : footer === "Pharmacology"
                ? "#d3e0dc"
                : footer === "Psychology"
                ? "#d4e2d4"
                : footer === "Sales and Marketing"
                ? "#d0e8f2"
                : footer === "Science & Engineering"
                ? "#d8ac9c"
                : footer === "Social Science"
                ? "#a0c1b8"
                : footer === "Software Engineering"
                ? "99bbad"
                : "#d4b5b0",
          }}
          className="card-footer"
        >
          {footer}
        </div>
      </Card>
    </div>
  );
}

export default Cards;
