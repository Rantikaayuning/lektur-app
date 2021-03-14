import React from "react";
import "../../styles/Jumbotron.css";
import ReactPlayer from "react-player";
import defaultLektur from "../../assets/defaultLektur.png"

function Jumbo(props) {
  const { urlMostPopular, totalEnrolled, totalMaterial, totalVideos, courseName, teacherName, enrollButton } = props
  return (
    <div className="jumbotron">
      <div className="jumbotron-left">
        {" "}
        <h2>
          {" "}
          Bring Your Class <span> At Home </span>{" "}
        </h2>{" "}
        {enrollButton}
      </div>{" "}
      <div className="jumbotron-right">
        {" "}
        <div className="video-content">
          <ReactPlayer 
            controls url={urlMostPopular}
            title="glints"
            className='video' 
            width='100%' 
            height='70%'
            volume={0.182}
            playing={true}
            light={defaultLektur}
          />
          <div className="bottom">
            <div className="left">
              <p className="p1"> {totalEnrolled} Enrolled </p>{" "}
              <p className="p2"> {courseName} </p>{" "}
              <p className="p3"> {teacherName} </p>{" "}
            </div>{" "}
            <div className="right">
              <p> {totalMaterial} Study Material </p> <p> {totalVideos} Learning Videos </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Jumbo;
