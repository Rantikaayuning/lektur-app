import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import Cookies from "js-cookie";

import Logo from "../../assets/LEKTUR.png";
import garis from "../../assets/Rectangle 2.png";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getUserProfile } from "../../redux/actions/UserAction";
import { getCourseSearch } from "../../redux/actions/CoursesAction";
import defaultPhoto from "../../assets/user.png";
import { NotificationContainer } from "react-notifications";
import { getHomepage } from "../../redux/actions/HomePage";

function Navbar(props) {
  const dispatch = useDispatch();
  const { homePage } = useSelector((state) => state.homePage);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const history = useHistory();

  useEffect(() => {
    props.isAuthentificated && props.getUserProfile();
    dispatch(getHomepage());
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    props.getCourseSearch(search);
    history.push("/");
  };

  const handleDropDownClick = (id) => {
    history.push(`/category-selection/${id}`);
    window.location.reload(false);
  };

  return (
    <div className="sidebar">
      <div className="left">
        <a href="/" className="logo">
          <img src={Logo} alt="logo" className="bl" />
        </a>
        <img src={garis} alt="garis" className="bl" />
      </div>
      <div className="center">
        <form onSubmit={submitSearch}>
          <input
            type="text"
            placeholder="Search Course or Lecturer"
            onChange={handleChange}
          />
        </form>
        <i className="fa fa-search " onClick={submitSearch}></i>
      </div>
      <div className="right">
        <ul>
          <li className={props.isAuthentificated ? "li-2" : "li-1"}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} size="md">
              <DropdownToggle className="sidebar-dropdown" color="none">
                <span>
                  Category <i className="fa fa-caret-down fa-lg dropbtn"></i>
                </span>
              </DropdownToggle>
              <DropdownMenu className="sidebar-dropdown-menu-item">
                {homePage !== null && homePage.category !== null &&
                  homePage.category
                    .filter((item) => item.categories.length < 12)
                    .map((item) => (
                      <DropdownItem
                        className="dropdown-item"
                        onClick={() => handleDropDownClick(item._id)}
                      >
                        {item.categories}
                      </DropdownItem>
                    ))}

                <DropdownItem onClick={() => history.push(`/other-categories`)}>
                  Other...
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>

          <li>
            <div className="user-profile">
              {props.isAuthentificated ? (
                <>
                  {props.userProfile ? (
                    <>
                      <div className="drop-img">
                        <div className="vl"></div>
                        <Link>
                          {props.userProfile.image === null ? (
                            <img
                              src={defaultPhoto}
                              alt="profile"
                              className="profile-img"
                            />
                          ) : (
                            <img
                              src={props.userProfile.image}
                              alt="profile"
                              className="profile-img"
                            />
                          )}
                          {/* <img
                        src={profile}
                        alt="profile"
                        className="profile-img"
                      /> */}
                        </Link>
                        {/* <div id="small-loader"></div> */}
                        <span> {props.userProfile.fullname}</span>
                        {props.userProfile.status === 0 ? (
                          <div className="dropdown-content-img">
                            <Link to="/student-courses" className="drop">
                              Dashboard
                            </Link>
                            <Link to="/" className="drop">
                              <div
                                onClick={() => {
                                  Cookies.remove("token");
                                  window.open("/", "_self");
                                }}
                              >
                                Sign Out
                              </div>
                            </Link>
                          </div>
                        ) : (
                          <div className="dropdown-content-img">
                            <Link to="/teacher-dashboard" className="drop">
                              Dashboard
                            </Link>
                            <Link to="/" className="drop">
                              <div
                                onClick={() => {
                                  // localStorage.removeItem("token");
                                  Cookies.remove("token");
                                  window.open("/", "_self");
                                }}
                              >
                                Sign Out
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="drop-img">
                      <div className="vl"></div>
                      <div id="small-loader-navbar"></div>
                    </div>
                  )}
                </>
              ) : (
                <div className="form-navbar">
                  <div className="for">
                    <Link to="/register">Select Role</Link>
                  </div>
                  <div className="vl"></div>
                  <div className="sidebar-login-button">
                    <Link to="/login">
                      <button>Login</button>
                    </Link>
                  </div>
                  <div className="sidebar-signup-button">
                    <Link to="/register">
                      <button>Sign Up </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
      <NotificationContainer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.users.userProfile,
    searchCourse: state.courses.searchCourse,
    isAuthentificated: state.users.isAuthentificated,
  };
};

export default connect(mapStateToProps, { getUserProfile, getCourseSearch })(
  Navbar
);
