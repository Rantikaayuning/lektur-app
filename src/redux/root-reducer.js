import { combineReducers } from "redux";
import userReducer from "./reducers/UserReducer";
import coursesReducer from "./reducers/CoursesReducer";
import teacherReducer from "./reducers/TeacherReducer";
import assessmentReducer from "./reducers/AssessmentReducer";
import homePageReducer from "./reducers/HomePage";

export default combineReducers({
    users : userReducer,
    courses : coursesReducer,
    teachers: teacherReducer,
    assessment : assessmentReducer,
    homePage : homePageReducer,
});