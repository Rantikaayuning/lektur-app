import API from "../../api/index";
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
import Axios from "axios";
import axios from "axios";

const token = Cookies.get("token");

export const fetchLoading = (payload) => {
  return {
    type: FETCH_LOADING,
    payload: payload,
  };
};

// let isLoading = true;
//   dispatch(fetchLoading(isLoading));

export const getCourses = (payload) => (dispatch) => {
  axios.get("https://lekturapp.herokuapp.com/api/courses/all", payload)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_ALL_COURSES,
          payload: response.data.result.result,
        });
      }
    })
    .catch(() => {
      console.log("error");
    });
};

export const getCourseDetail = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  API.get(`/courses/detail?courseId=${id}`)
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
    .catch(() => {
      console.log("error");
      let isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};

export const postEnrollCourse = (id) => (dispatch) => {
  API.post(`/student/course/enroll?courseId=${id}`, null, {
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
    .catch(() => {
      console.log("error");
    });
};

export const getStudentCourses = (payload) => (dispatch) => {
  API.get(
    "/student/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    payload
  )
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_COURSE_STUDENT,
          payload: response.data.result,
        });
      }
    })
    .catch(() => {
      console.log("error");
    });
};

export const getStudentEnroll = (id) => (dispatch) => {
  API.get(`teacher/courses/student?${id}`, {
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
    .catch(() => {
      console.log("error");
    });
};

export const getCourseSearch = (input) => (dispatch) => {
  Axios.get(`https://lekturapp.herokuapp.com/search?search=${input}`)
    .then((response) => {
      if (response.status === 200) {
        // console.log("response", response.data.result)
        dispatch({
          type: SEARCH_COURSE,
          payload: response.data.result,
        });
      }
    })
    .catch(() => {
      console.log("error");
    });
};

export const getTeacherCourses = (access_token = null) => (dispatch) => {
  API.get(`teacher/profile`, {
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
    .catch(() => {
      console.log("error");
    });
};

export const getPopUpContent = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  API.get(`student/pop-up/course/content?courseId=${id}`, {
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
    .catch(() => {
      console.log("error");
      let isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};

export const getPopUpMaterial = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  API.get(`student/pop-up/course/materials?courseId=${id}`, {
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
    .catch(() => {
      console.log("error");
      let isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};

export const getContentDetail = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  API.get(`student/course/content?contentId=${id}`, {
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
    .catch(() => {
      console.log("error");
      let isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};

export const updateCourse = (id, title, overview) => (dispatch) => {
  API.put(
    `/courses/update?courseId=${id}`,
    { title, overview },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log(response.data.code);
      dispatch({
        type: UPDATE_COURSE,
        payload: response.data.success,
      });
    })
    .catch(() => {
      console.log("error");
    });
};

export const postCourse = (title, overview, file, categoryId) => (dispatch) => {
  const form = { title, overview, file, categoryId };

  const data = new FormData();
  Object.keys(form).forEach((key) => data.append(key, form[key]));

  API.post("/courses/create", data, {
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
    .catch((error) => {
      console.log(error)
    });
};

export const getCourseFilled = (id) => (dispatch) => {
  API.get(`/courses/filled?courseId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data.result.course);
        dispatch({
          type: GET_COURSE_FILLED,
          payload: response.data.result.course,
          courseId: response.data.result.course._id,
          content: response.data.result.content,
          material: response.data.result.material,
        });
      }
    })
    .catch((error) => console.log(error));
};

export const postContent = (id, title, description, number) => (dispatch) => {
  return API.post(
    `/content/create?courseId=${id}`,
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
      console.log(response.data.result);
      dispatch({
        type: CREATE_CONTENT,
        payload: response.data.result,
        idContent: response.data.result._id,
      });
    }
  });
};

export const uploadMaterial = (idContent, material) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  API.post(
    `/content/upload/file?contentId=${idContent}`,
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
  .catch((err) => alert("Upload material failed, try again"));
};

export const uploadVideo = (idContent, video) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  API.put(`/content/upload/video?contentId=${idContent}`, video, config).then(
    (response) => {
      if (response.status === 201) {
        console.log(response.data.result.videoUrl);
        dispatch({
          type: UPLOAD_VIDEO,
          payload: response.data.result,
          key: response.data.result.videoUrl,
        });
      }
    }
  )
  .catch((err) => alert("Upload video failed, try again"));
};

export const uploadImage = (id, file) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  API.put(`/courses/header/upload?courseId=${id}`, file, config).then(
    (response) => {
      if (response.status === 201) {
        console.log(response.data.result.success);
        dispatch({
          type: UPLOAD_IMAGE,
          payload: response.data.success,
        });
      }
    }
  )
  .catch((err) => alert("Upload failed, try again"));
};

export const deleteCourse = (id) => () => {
  return new Promise((resolve) => {
    API.delete(`/courses/delete?courseId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((err) => console.log(err));
  });
};

export const getCertificate = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  API.get(`/student/certificate?courseId=${id}`, {
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
    .catch((err) => {
      console.log("error");
      isLoading = false;
      dispatch(fetchLoading(isLoading));
    });
};

export const getCategory = () => (dispatch) => {
  API.get("https://lekturapp.herokuapp.com/api/courses/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data.result);
        dispatch({
          type: GET_CATEGORY,
          payload: response.data.result,
        });
      }
    })
    .catch((error) => console.log(error));
};

export const getCategoryById = (id) => (dispatch) => {
  Axios.get(
    `https://lekturapp.herokuapp.com/category/course?categoryId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log(response.data.course);
      dispatch({
        type: GET_CATEGORY_BY_ID,
        payload: response.data.course,
      });
    })
    .catch((error) => alert(error));
};
