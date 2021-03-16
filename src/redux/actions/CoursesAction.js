import { NotificationManager } from "react-notifications";

import { API } from "../../api/index";
import {
  GET_ALL_COURSES,
  GET_COURSE_DETAIL,
  POST_ENROLL_COURSE,
  GET_COURSE_STUDENT,
  GET_STUDENT_ENROLL,
  GET_TEACHER_COURSES,
  SEARCH_COURSE,
  CREATE_COURSE,
  GET_COURSE_FILLED,
  CREATE_CONTENT,
  UPLOAD_MATERIAL,
  UPLOAD_VIDEO,
  UPLOAD_IMAGE,
  GET_POPUP_CONTENT,
  GET_POPUP_MATERIAL,
  GET_CONTENT_DETAIL,
  UPDATE_COURSE,
  DOWNLOAD_CERTIFICATE,
  FETCH_LOADING,
  GET_CATEGORY,
  GET_CATEGORY_BY_ID,
} from "../types/CoursesTypes";
import Cookies from "js-cookie";
import axios from "axios";


const token = Cookies.get("token");

export const fetchLoading = (payload) => {
  return {
    type: FETCH_LOADING,
    payload: payload,
  };
};

export const getCourses = (payload) => (dispatch) => {
  axios.get(`${API}/courses/all`, payload)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_ALL_COURSES,
          payload: response.data.result.result,
        });
      }
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);

    });
};

export const getCourseDetail = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios.get(`${API}/courses/detail?courseId=${id}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_COURSE_DETAIL,
          payload: response.data.result,
          background: response.data.result.course.image,
          detailTitle: response.data.result.course.title,
          detailOverview: response.data.result.course.overview,
        });
        let isLoading = false;
        dispatch(fetchLoading(isLoading));
      }
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
      let isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};

export const postEnrollCourse = (id) => (dispatch) => {
  axios.post(`${API}/student/course/enroll?courseId=${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 201) {
        // console.log(response.data.result);
        dispatch({
          type: POST_ENROLL_COURSE,
          payload: response.data.result,
        });
      }
    })
    .catch((payload) => {
      console.log(payload.response.data.message);
    });
};

export const getStudentCourses = (payload) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios.get(
    `${API}/student/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    payload
  )
    .then((response) => {
      // if (response.status === 200) {
      dispatch({
        type: GET_COURSE_STUDENT,
        payload: response.data.result,
      });
      let isLoading = false;
      dispatch(fetchLoading(isLoading));
      // }
    })
    .catch((payload) => {
      console.log(payload.response.data.message);
      let isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};

export const getStudentEnroll = (id) => (dispatch) => {
  axios.get(`${API}/teacher/courses/student?${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_STUDENT_ENROLL,
        });
      }
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
    });
};

export const getCourseSearch = (input) => (dispatch) => {
  axios.get(`https://lekturapp.herokuapp.com/search?search=${input}`)
    .then((response) => {
      if (response.status === 200) {
        // console.log("response", response.data.result)
        dispatch({
          type: SEARCH_COURSE,
          payload: response.data.result,
        });
      }
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
    });
};

export const getTeacherCourses = (access_token = null) => (dispatch) => {
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
          type: GET_TEACHER_COURSES,
          payload: response.data.result.dataCourse,
        });
      }
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
    });
};

export const getPopUpContent = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios.get(`${API}/student/pop-up/course/content?courseId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      dispatch({
        type: GET_POPUP_CONTENT,
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

export const getPopUpMaterial = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios.get(`${API}/student/pop-up/course/materials?courseId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log("response", response)
      dispatch({
        type: GET_POPUP_MATERIAL,
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

export const getContentDetail = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios.get(`${API}/student/course/content?contentId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log("response", response)
      dispatch({
        type: GET_CONTENT_DETAIL,
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

export const updateCourse = (id, title, overview) => (dispatch) => {
  axios.put(
    `${API}/courses/update?courseId=${id}`,
    { title, overview },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      // console.log(response.data.code);
      dispatch({
        type: UPDATE_COURSE,
        payload: response.data.success,
      });
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
    });
};

export const postCourse = (title, overview, file, categoryId) => (dispatch) => {
  const form = { title, overview, file, categoryId };

  const data = new FormData();
  Object.keys(form).forEach((key) => data.append(key, form[key]));

  axios.post(`${API}/courses/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({
          type: CREATE_COURSE,
          payload: response.data.result,
          id: response.data.result._id,
          title: response.data.result.title,
          overview: response.data.result.overview,
        });
      }
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
    });
};

export const getCourseFilled = (id) => (dispatch) => {
  axios.get(`${API}/courses/filled?courseId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data.result.course);
        dispatch({
          type: GET_COURSE_FILLED,
          payload: response.data.result.course,
          courseId: response.data.result.course._id,
          content: response.data.result.content,
          material: response.data.result.material,
        });
      }
    })
    .catch((payload) => NotificationManager.error("", payload.response.data.message, 3000));
};

export const postContent = (id, title, description, number) => (dispatch) => {
  return axios.post(
    `${API}/content/create?courseId=${id}`,
    {
      title,
      description,
      number,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((response) => {
    if (response.status === 200) {
      // console.log(response.data.result);
      dispatch({
        type: CREATE_CONTENT,
        payload: response.data.result,
        idContent: response.data.result._id,
      });
    }
  }).catch((payload) => NotificationManager.error("", payload.response.data.message, 3000))
};

export const uploadMaterial = (idContent, material) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios.post(
    `${API}/content/upload/file?contentId=${idContent}`,
    material,
    config,

  ).then((response) => {
    if (response.status === 201) {
      dispatch({
        type: UPLOAD_MATERIAL,
        payload: response.data.result,
        key: response.data.result.Key,
      });
    }
  })
    .catch(() =>
      NotificationManager.error("", `failed to upload material, try again!`, 3000))
};

export const uploadVideo = (idContent, video) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios.put(`${API}/content/upload/video?contentId=${idContent}`, video, config).then(
    (response) => {
      if (response.status === 201) {
        // console.log(response.data.result.videoUrl);
        dispatch({
          type: UPLOAD_VIDEO,
          payload: response.data.result,
          // key: response.data.result.videoUrl,
          key: response.data.code
        });
      }
    }
  )
    .catch(() =>
      NotificationManager.error("", `failed to upload video, try again!`, 3000))
};

export const uploadImage = (id, file) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios.put(`${API}/courses/header/upload?courseId=${id}`, file, config).then(
    (response) => {
      if (response.status === 201) {
        // console.log(response.data.result.success);
        dispatch({
          type: UPLOAD_IMAGE,
          payload: response.data.success,
        });
      }
    }
  )
    .catch(() =>
      NotificationManager.error("", `upload failed, try again!`, 3000))
};

export const deleteCourse = (id) => () => {
  return new Promise((resolve) => {
    axios.delete(`${API}/courses/delete?courseId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((payload) => NotificationManager.error("", payload.response.data.message, 3000));
  });
};

export const getCertificate = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios.get(`${API}/student/certificate?courseId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log(response.data.result)
      dispatch({
        type: DOWNLOAD_CERTIFICATE,
        payload: response.data.result,
      });
      isLoading = false;
      dispatch(fetchLoading(isLoading));
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
      isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};

export const getCategory = () => (dispatch) => {
  axios.get(`${API}/courses/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data.result);
        dispatch({
          type: GET_CATEGORY,
          payload: response.data.result,
        });
      }
    })
    .catch((payload) => console.log(payload.response.data.message)); //
};

export const getCategoryById = (id) => (dispatch) => {
  axios.get(
    `https://lekturapp.herokuapp.com/category/course?categoryId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      // console.log(response.data.course);
      dispatch({
        type: GET_CATEGORY_BY_ID,
        payload: response.data.course,
      });
    })
    .catch((payload) => NotificationManager.error("", payload.response.data.message, 3000));
};
