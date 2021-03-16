import { NotificationManager } from "react-notifications";
import { API } from "../../api/index";
import {
  GET_PROFILE_TEACHER,
  GET_STUDENTS_LIST,
  POST_STUDENT_INVITE,
  PUT_STUDENT_APPROVE,
  SEARCH_STUDENT,
  FETCH_LOADING,
  FETCH_ACCEPT_LOADING
} from "../types/TeacherTypes";
import Cookies from "js-cookie";
import axios from "axios"

const token = Cookies.get("token");

export const fetchLoading = (payload) => {
  return {
    type: FETCH_LOADING,
    payload: payload,
  };
};

export const fetchAcceptLoading = (payload) => {
  return {
    type: FETCH_ACCEPT_LOADING,
    payload: payload,
  };
};

export const getTeacherCourses = (access_token = null) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios.get(`${API}/teacher/profile`, {
    headers: {
      Authorization: access_token
        ? `Bearer ${access_token}`
        : `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data.result.dataCourse)
        dispatch({
          type: GET_PROFILE_TEACHER,
          payload: response.data.result.dataCourse,
        });
        let isLoading = false;
        dispatch(fetchLoading(isLoading));
      }
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000); let isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};

export const getStudentList = (courseId) => dispatch => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios.get(`${API}/teacher/courses/student?courseId=${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      // console.log(response);
      dispatch({
        type: GET_STUDENTS_LIST,
        payload: response.data.result,
      });
      let isLoading = false;
      dispatch(fetchLoading(isLoading));
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
      let isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};
export const postStudentInvite = (courseId, body) => dispatch => {
  axios({
    method: "post",
    url: `${API}/teacher/courses/invite?courseId=${courseId}`,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      // console.log(response);
      dispatch({
        type: POST_STUDENT_INVITE,
        payload: response.data.message,
      });
      NotificationManager.success("", `${response.data.message}`, 3000);
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
    });
};
export const putStudentApprove = (courseId, studentId) => dispatch => {
  let isAcceptLoading = true;
  dispatch(fetchAcceptLoading(isAcceptLoading));
  axios({
    method: "put",
    url: `${API}/teacher/courses/student/approve?courseId=${courseId}&studentId=${studentId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      // console.log(response);
      dispatch({
        type: PUT_STUDENT_APPROVE,
        payload: response.data,
      });
      let isAcceptLoading = false;
      dispatch(fetchAcceptLoading(isAcceptLoading));
      window.location.reload()
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
      let isAcceptLoading = false;
      dispatch(fetchAcceptLoading(isAcceptLoading));
    });
};
export const getSearchStudent = (courseId, body) => dispatch => {
  axios({
    method: "post",
    url: `${API}/teacher/courses/student/search?courseId=${courseId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: body,
  })
    .then(response => {
      // console.log(response);
      // console.log(body);
      dispatch({
        type: SEARCH_STUDENT,
        payload: response.data.result,
      });
    })
    .catch((payload) => NotificationManager.error("", payload.response.data.message, 3000));
};
