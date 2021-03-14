import {
  GET_PROFILE_TEACHER,
  GET_STUDENTS_LIST,
  POST_STUDENT_INVITE,
  PUT_STUDENT_APPROVE,
  SEARCH_STUDENT,
  FETCH_LOADING,
  FETCH_ACCEPT_LOADING
} from "../types/TeacherTypes";

const initialState = {
  teacherProfile: [],
  studentsList: [],
  studentInviteSuccess: "",
  studentAccept: null,
  searchStudents: [],
  isLoading: false,
  isAcceptLoading: false
};

const teacherReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_PROFILE_TEACHER:
      return {
        ...state,
        teacherProfile: payload,
      };
    case GET_STUDENTS_LIST:
      return {
        ...state,
        studentsList: payload,
      };
    case POST_STUDENT_INVITE:
      return {
        ...state,
        studentInviteSuccess: payload,
      };
    case PUT_STUDENT_APPROVE:
      return {
        ...state,
        studentAccept: payload,
      };
    case SEARCH_STUDENT:
      return {
        ...state,
        searchStudents: payload,
      };
    case FETCH_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case FETCH_ACCEPT_LOADING:
      return {
        ...state,
        isAcceptLoading: payload,
      };
    default:
      return state;
  }
};

export default teacherReducer;
