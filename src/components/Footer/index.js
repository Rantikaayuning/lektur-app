import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <div className="footer-section course">
          <h4>COURSE</h4>
          <br />
          <Link to="/">
            <p>Business</p>
          </Link>
          <Link to="/">
            <p>Technology</p>
          </Link>
          <Link to="/">
            <p>Graphic Design</p>
          </Link>
          <Link to="/">
            <p>Self Development</p>
          </Link>
        </div>
        <div className="footer-section teach">
          <h4>TEACH</h4>
          <br />
          <Link to="/">
            <p>Teach at Lektur</p>
          </Link>
          <Link to="/">
            <p>For school</p>
          </Link>
          <Link to="/">
            <p>FAQ</p>
          </Link>
        </div>
        <div className="footer-section resource">
          <h4>RESOURCE</h4>
          <br />
          <Link to="/">
            <p>Contact Us</p>
          </Link>
          <Link to="/">
            <p>About</p>
          </Link>
          <Link to="/">
            <p>Careers</p>
          </Link>
        </div>
        <div className="footer-section copyright">
          <h4>
            <span>LEKTUR</span>
          </h4>
          <br />
          <p>
            Lektur &copy; 2020{" "}
            <span className="all-rights">All rights reserved</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
