import { NotificationManager } from "react-notifications";

import { API } from "../../api/index";
import {
  LOGIN,
  GET_USER_PROFILE,
  SIGN_UP,
  UPDATE_USER_PROFILE,
  UPDATE_PROFILE_IMAGE,
  FETCH_USER_LOADING,
} from "../types/UserLogin";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

const token = Cookies.get("token");

export const fetchLoading = (payload) => {
  return {
    type: FETCH_USER_LOADING,
    payload: payload,
  };
};

export const postLogin = (body) => async (dispatch) => {
  let isUserLoading = true;
  dispatch(fetchLoading(isUserLoading));
  return axios
    .post(`${API}/users/login`, body)
    .then((response) => {
      dispatch({
        type: LOGIN,
        payload: response.data.message,
        token: response.data.token,
        role: jwt_decode(response.data.token).status,
      });
      let isUserLoading = false;
      dispatch(fetchLoading(isUserLoading));
      Cookies.set("token", response.data.token);
      return response.data.token;
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
      let isUserLoading = false;
      dispatch(fetchLoading(isUserLoading));
    });
};

export const postSignup = (role, payload) => async (dispatch) => {
  let isUserLoading = true;
  dispatch(fetchLoading(isUserLoading));
  axios
    .post(`${API}/users/register?status=${role}`, payload)
    .then((response) => {
      if (response.status === 201) {
        dispatch({
          type: SIGN_UP,
          payload: response.data.message,
        });
        let isUserLoading = false;
        dispatch(fetchLoading(isUserLoading));
        NotificationManager.success("", `${response.data.message} please continue to login`, 3000);
      }
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
      let isUserLoading = false;
      dispatch(fetchLoading(isUserLoading));
    });
};

export const getUserProfile = (access_token = null) => (dispatch) => {
  // console.log(access_token);
  axios
    .get(`${API}/users/profile`, {
      headers: {
        Authorization: access_token
          ? `Bearer ${access_token}`
          : `Bearer ${Cookies.get("token")}`,
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch({
        type: GET_USER_PROFILE,
        payload: response.data.result,
      });
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
    });
};

export const updateUserProfile = (fullname, email) => async (dispatch) => {
  let isUserLoading = true;
  dispatch(fetchLoading(isUserLoading));
  axios
    .put(
      `${API}/users/update`,
      {
        fullname,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      Cookies.set("token", response.data.token);
      let decoded;
      if (response.data && response.data.token !== {}) {
        // or use !_.isEmpty(response.data.token)
        decoded = jwt_decode(response.data.token);
      }
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: decoded, //response.data.result
      });
      let isUserLoading = false;
      dispatch(fetchLoading(isUserLoading));
      window.location.reload();
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
      let isUserLoading = false;
      dispatch(fetchLoading(isUserLoading));
    });
};

export const updateProfileImage = (file) => async (dispatch) => {
  const data = new FormData();
  data.append("file", file);

  axios
    .put(`${API}/users/update/image`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: UPDATE_PROFILE_IMAGE,
        payload: response.data.result.Location,
        message: response.data.message,
      });
    })
    .catch(() =>
      NotificationManager.error("", `failed to update, try again!`, 3000)
    );
};
