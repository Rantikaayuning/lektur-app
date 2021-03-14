import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import searchIcon from "../../../assets/search.png";
import { PopUpInvite } from "../../../components/PopUp/PopUpInvite";

const TeacherStudentsTab = () => {
  const { id } = useParams();

  const [dropdownFilterOpen, setDropdownFilterOpen] = useState(false);
  const [dropdownSortOpen, setDropdownSortOpen] = useState(false);
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const toggleSort = () => setDropdownSortOpen((before) => !before);
  const toggleFilter = () => setDropdownFilterOpen((prevState) => !prevState);
  const handlePopUp = () => setPopUpOpen(!isPopUpOpen);

  return (
    <>
      <div className="teacher-assessment">
        <div className="teacher-dashboard-list">
          <Link to={`/course-filled-teacher/${id}`}>
            <p>Course</p>
          </Link>
          <Link to={`/teacher-new-assessment/${id}`}>
            <p>Assessment</p>
          </Link>
          <p className="open">Students</p>
        </div>
        <div className="teacher-students-menu-box">
          <div className="student-sort-box">
            <p>
              <input type="text" placeholder="Search" />
              <span>
                <img src={searchIcon} alt="icon" />
              </span>
              <hr type="solid" />
            </p>
            <div className="filter-sort-container">
              <div>
                <b>Filter</b>
              </div>
              <div>
                <Dropdown
                  isOpen={dropdownFilterOpen}
                  toggle={toggleFilter}
                  size="md"
                >
                  <DropdownToggle className="dropdown-menu-filter" color="none">
                    <div className="sidebar-dropdown-choose">
                      <p>Choose one</p>
                      <p>
                        <i className="fa fa-caret-down fa-lg dropbtn"></i>
                      </p>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu className="sidebar-dropdown-item">
                    <DropdownItem>Completed</DropdownItem>
                    <DropdownItem>Active</DropdownItem>
                    <DropdownItem>Pending</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            {/* <br/><br/> */}
            <div className="filter-sort-container">
              <div>
                <b>Sort</b>
              </div>
              <div>
                <Dropdown
                  isOpen={dropdownSortOpen}
                  toggle={toggleSort}
                  size="md"
                >
                  <DropdownToggle className="dropdown-menu-filter" color="none">
                    <div className="sidebar-dropdown-choose">
                      <p>Choose one</p>
                      <p>
                        <i className="fa fa-caret-down fa-lg dropbtn"></i>
                      </p>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu className="sidebar-dropdown-item">
                    <DropdownItem>Date</DropdownItem>
                    <DropdownItem>Name</DropdownItem>
                    <DropdownItem>Score</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="student-list-box">
            <div className="student-list-header">
              <h5>
                <b>Students</b>
              </h5>
              <p>
                <button onClick={handlePopUp}>Invite</button>
              </p>
              <PopUpInvite
                show={isPopUpOpen}
                onHide={() => setPopUpOpen(false)}
                togglePopUp={handlePopUp}
              />
            </div>
            <div className="student-list-empty"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherStudentsTab;
