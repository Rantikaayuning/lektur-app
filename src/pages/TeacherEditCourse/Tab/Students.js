import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Progress,
} from "reactstrap";
import searchIcon from "../../../assets/search.png";
import checklistOne from "../../../assets/checklist1.png";
import checklistTwo from "../../../assets/checklist2.png";
import checklistThree from "../../../assets/checklist3.png";
import { PopUpInvite } from "../../../components/PopUp/PopUpInvite";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetail } from "../../../redux/actions/CoursesAction";
import {
  getStudentList,
  putStudentApprove,
  getSearchStudent,
} from "../../../redux/actions/TeacherAction";
import { NotificationContainer } from "react-notifications";

const TeacherStudentsUpdate = () => {
  const [dropdownFilterOpen, setDropdownFilterOpen] = useState(false);
  const [dropdownSortOpen, setDropdownSortOpen] = useState(false);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [status, setStatus] = useState("All");
  const dispatch = useDispatch();
  const { studentsList, searchStudents, isLoading } = useSelector(
    state => state.teachers
  );
  const [filter, setFilter] = useState(studentsList);
  const [sort, setSort] = useState("Name");
  const [isSearch, setSearch] = useState(false);
  const [isFilter, setStatusFilter] = useState(false);
  const [srcStudent, setSrcStudent] = useState({
    search: "",
  });
  const toggleSort = () => setDropdownSortOpen(before => !before);
  const toggleFilter = () => setDropdownFilterOpen(prevState => !prevState);
  const handlePopUp = () => setPopUpOpen(!isPopUpOpen);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCourseDetail(id));
    dispatch(getStudentList(id));
  }, [dispatch, id]);

  function handleAccept(studentId) {
    dispatch(putStudentApprove(id, studentId));
  }

  function handleChange(status) {
    setStatus(status);
    switch (status) {
      case "Active":
        setFilter(studentsList.filter(student => student.status === 1));
        setSearch(false);
        setStatusFilter(true);
        console.log(`studen`, studentsList);
        break;
      case "Pending":
        setFilter(studentsList.filter(student => student.status === 0));
        setSearch(false);
        setStatusFilter(true);
        break;
      case "Completed":
        setFilter(studentsList.filter(student => student.status === 2));

        setSearch(false);
        setStatusFilter(true);
        break;
      case "All":
        setFilter(studentsList);
        setSearch(false);
        setStatusFilter(true);
        break;
      default:
        setFilter(studentsList);
        setSearch(false);
        setFilter(true);

        break;
    }
  }

  function handleSort(sort) {
    setSort(sort);
    switch (sort) {
      case "Name":
        console.log(`studnetlisa`, studentsList);
        return studentsList.sort((a, b) =>
          a.studentId.fullname > b.studentId.fullname ? 1 : -1
        );
      case "Score":
        return studentsList.sort((a, b) => a.score - b.score);
      default:
        return studentsList;
    }
  }
  function changeStd(e) {
    e.preventDefault();
    setSrcStudent({
      search: e.target.value,
    });
  }

  function searchStudent(e) {
    e.preventDefault();
    dispatch(getSearchStudent(id, srcStudent));
    setSrcStudent("");

    setSearch(true);
  }
  // console.log(studentsList);
  // console.log(isFilter);

  return (
    <>
      {studentsList === null || isLoading ? (
        <div id="loader"></div>
      ) : (
        <div className="teacher-assessment">
          <div className="teacher-dashboard-list">
            <Link to={`/course-teacher/course/${id}`}>
              <p>Course</p>
            </Link>
            <Link to={`/created-questions/${id}`}>
              <p>Assessment</p>
            </Link>
            <p className="open">Students</p>
          </div>
          <div className="teacher-students-menu-box">
            <div className="student-sort-box">
              <p>
                <form>
                  <input
                    type="text"
                    placeholder="Search Student Name"
                    value={srcStudent.search}
                    onChange={changeStd}
                  />
                  <span>
                    <img src={searchIcon} alt="icon" onClick={searchStudent} />
                  </span>
                </form>
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
                    <DropdownToggle
                      className="dropdown-menu-filter"
                      color="none"
                    >
                      <div className="sidebar-dropdown-choose">
                        <p>{status}</p>
                        <p>
                          <i className="fa fa-caret-down fa-lg dropbtn"></i>
                        </p>
                      </div>
                    </DropdownToggle>
                    <DropdownMenu className="sidebar-dropdown-item">
                      <DropdownItem
                        onClick={() => handleChange("All")}
                        dropDownValue="All"
                      >
                        All
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleChange("Completed")}
                        dropDownValue="Completed"
                      >
                        Completed
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleChange("Active")}
                        dropDownValue="Active"
                      >
                        Active
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleChange("Pending")}
                        dropDownValue="Pending"
                      >
                        Pending
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
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
                    <DropdownToggle
                      className="dropdown-menu-filter"
                      color="none"
                    >
                      <div className="sidebar-dropdown-choose">
                        <p>{sort}</p>
                        <p>
                          <i className="fa fa-caret-down fa-lg dropbtn"></i>
                        </p>
                      </div>
                    </DropdownToggle>
                    <DropdownMenu className="sidebar-dropdown-item">
                      <DropdownItem
                        onClick={() => handleSort("Name")}
                        dropDownValue="Name"
                      >
                        Name
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleSort("Score")}
                        dropDownValue="Score"
                      >
                        Score
                      </DropdownItem>
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
                  setPopUpOpen={setPopUpOpen}
                />
              </div>

              {isSearch
                ? searchStudents &&
                searchStudents.map(item => (
                  <div className="student-list-name">
                    <div>
                      <p>
                        <b>{item.fullname[0]}</b>
                      </p>
                      {item.status === 1 ? (
                        <p>
                          <img src={checklistTwo} alt="active" /> Active
                        </p>
                      ) : item.status === 2 ? (
                        <p>
                          <img src={checklistThree} alt="completed" />{" "}
                            Completed
                        </p>
                      ) : (
                        <p>
                          <img src={checklistOne} alt="pending" /> Pending
                        </p>
                      )}
                    </div>
                    <div className="course-status">
                      {item.status === 1 ? (
                        <div className="course-active">
                          <p>
                            <Progress
                              color="warning"
                              value={
                                (item.totalSeenCourses / item.totalcourse) *
                                100
                              }
                            />
                          </p>
                          <p>
                            {`${item.totalSeenCourses}/${item.totalcourse} Course Complete`}
                          </p>
                        </div>
                      ) : item.status === 2 ? (
                        <div className="course-completed">
                          <h3>{item.score}%</h3>
                          <p>Assessment Score</p>
                        </div>
                      ) : (
                        <div className="course-pending">
                          <p>
                            <button
                              onClick={() => handleAccept(item.studentId._id)}
                            >
                              Accept
                              </button>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
                : filter.length === 0 && isFilter === false
                  ? studentsList.map(item => (
                    <div className="student-list-name">
                      <div>
                        <p>
                          <b>{item.studentId.fullname}</b>
                        </p>
                        {item.status === 1 ? (
                          <p>
                            <img src={checklistTwo} alt="active" /> Active
                          </p>
                        ) : item.status === 2 ? (
                          <p>
                            <img src={checklistThree} alt="completed" />{" "}
                            Completed
                          </p>
                        ) : (
                          <p>
                            <img src={checklistOne} alt="pending" /> Pending
                          </p>
                        )}
                      </div>
                      <div className="course-status">
                        {item.status === 1 ? (
                          <div className="course-active">
                            <p>
                              <Progress
                                color="warning"
                                value={
                                  (item.totalSeenCourses / item.totalCourse) *
                                  100
                                }
                              />
                            </p>
                            <p>
                              {`${item.totalSeenCourses}/${item.totalCourse} Course Complete`}
                            </p>
                          </div>
                        ) : item.status === 2 ? (
                          <div className="course-completed">
                            <h3>{item.score}%</h3>
                            <p>Assessment Score</p>
                          </div>
                        ) : (
                          <div className="course-pending">
                            <p>
                              <button
                                onClick={() => handleAccept(item.studentId._id)}
                              >
                                Accept
                              </button>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                  : filter.map(item => (
                    <div className="student-list-name">
                      <div>
                        <p>
                          <b>{item.studentId.fullname}</b>
                        </p>
                        {item.status === 1 ? (
                          <p>
                            <img src={checklistTwo} alt="active" /> Active
                          </p>
                        ) : item.status === 2 ? (
                          <p>
                            <img src={checklistThree} alt="completed" />{" "}
                            Completed
                          </p>
                        ) : (
                          <p>
                            <img src={checklistOne} alt="pending" /> Pending
                          </p>
                        )}
                      </div>
                      <div className="course-status">
                        {item.status === 1 ? (
                          <div className="course-active">
                            <p>
                              <Progress
                                color="warning"
                                value={
                                  (item.totalSeenCourses / item.totalCourse) *
                                  100
                                }
                              />
                            </p>
                            <p>
                              {`${item.totalSeenCourses}/${item.totalCourse} Course Complete`}
                            </p>
                          </div>
                        ) : item.status === 2 ? (
                          <div className="course-completed">
                            <h3>{item.score}%</h3>
                            <p>Assessment Score</p>
                          </div>
                        ) : (
                          <div className="course-pending">
                            <p>
                              <button
                                onClick={() => handleAccept(item.studentId._id)}
                              >
                                Accept
                              </button>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
      <NotificationContainer />
    </>
  );
};

export default TeacherStudentsUpdate;
