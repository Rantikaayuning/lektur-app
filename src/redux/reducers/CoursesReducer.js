import {
  GET_ALL_COURSES,
  GET_COURSE_DETAIL,
  GET_COURSE_STUDENT,
  POST_ENROLL_COURSE,
  GET_STUDENT_ENROLL,
  GET_TEACHER_COURSES,
  SEARCH_COURSE,
  CREATE_COURSE,
  GET_COURSE_FILLED,
  CREATE_CONTENT,
  UPLOAD_MATERIAL,
  UPLOAD_VIDEO,
  GET_POPUP_CONTENT,
  GET_POPUP_MATERIAL,
  GET_CONTENT_DETAIL,
  UPLOAD_IMAGE,
  UPDATE_COURSE,
  DOWNLOAD_CERTIFICATE,
  FETCH_LOADING,
  GET_CATEGORY,
  GET_CATEGORY_BY_ID,
} from "../types/CoursesTypes";

const initialState = {
  courses: [],
  courseDetail: null,
  enrollCourse: null,
  studentCourses: [],
  studentEnrollList: [],
  teacherCourses: [],
  studentAssessment: [],
  searchCourse: "",
  createCourses: null,
  id: null,
  getTitle: null,
  getOverview: null,
  courseFilled: null,
  content: null,
  idContent: null,
  material: null,
  videoMaterial: null,
  image: null,
  background: null,
  popUpContent: {},
  popUpMaterial: [],
  contentDetail: {},
  detailTitle: null,
  detailOverview: null,
  courseId: null,
  certificateData: [],
  isLoading: false,
  categories: null,
  categoryById: [],
  materialKey:null,
  videoKey: null,
};

const coursesReducer = (state = initialState, action) => {
  const {
    type,
    payload,
    background,
    id,
    material,
    content,
    detailTitle,
    detailOverview,
    title,
    overview,
    idContent,
    courseId,
    key
  } = action;
  switch (type) {
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: payload,
      };
    case GET_COURSE_DETAIL:
      return {
        ...state,
        courseDetail: payload,
        background: background,
        detailTitle: detailTitle,
        detailOverview: detailOverview,
      };
    case POST_ENROLL_COURSE:
      return {
        ...state,
        enrollCourse: payload,
      };
    case GET_COURSE_STUDENT:
      return {
        ...state,
        studentCourses: payload,
      };
    case GET_STUDENT_ENROLL:
      return {
        ...state,
        studentEnrollList: payload,
      };
    case GET_TEACHER_COURSES:
      return {
        ...state,
        teacherCourses: payload,
      };
    case SEARCH_COURSE:
      return {
        ...state,
        searchCourse: payload,
      };
    case CREATE_COURSE:
      return {
        ...state,
        createCourses: payload,
        id: id,
        getTitle: title,
        getOverview: overview,
      };
    case GET_COURSE_FILLED:
      return {
        ...state,
        courseFilled: payload,
        courseId: courseId,
        contentFilled: content,
        materialFilled: material,
      };
    case CREATE_CONTENT:
      return {
        ...state,
        content: payload,
        idContent: idContent,
      };
    case UPLOAD_MATERIAL:
      return {
        ...state,
        material: payload,
        materialKey: key,
      };
    case UPLOAD_VIDEO:
      return {
        ...state,
        videoMaterial: payload,
        videoKey: key,
      };
    case GET_POPUP_CONTENT:
      return {
        ...state,
        popUpContent: payload,
      };
    case GET_POPUP_MATERIAL:
      return {
        ...state,
        popUpMaterial: payload,
      };
    case GET_CONTENT_DETAIL:
      return {
        ...state,
        contentDetail: payload,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        image: payload,
      };
    case UPDATE_COURSE:
      return {
        ...state,
        update: payload,
      };
    case DOWNLOAD_CERTIFICATE:
      return {
        ...state,
        certificateData: payload,
      };
    case FETCH_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        categories: payload,
      };
    case GET_CATEGORY_BY_ID:
      return {
        ...state,
        courses: payload,
        categoryById: payload,
      };
    default:
      return state;
  }
};

export default coursesReducer;
