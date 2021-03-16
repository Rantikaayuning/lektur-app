import { NotificationManager } from "react-notifications";

import { API } from "../../api/index";
import {
  GET_QUESTIONS,
  POST_QUESTIONS,
  PUT_FINAL_SCORE,
  UPDATE_QUESTION,
  FETCH_LOADING,
} from "../types/AssessmentTypes";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const fetchLoading = (payload) => {
  return {
    type: FETCH_LOADING,
    payload: payload,
  };
};

export const getQuestions = (id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios
    .get(`${API}/assessment/?courseId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_QUESTIONS,
          payload: response.data.result,
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

export const postAssessment = (body, id) => async (dispatch) => {
  axios
    .post(`${API}/assessment/create?courseId=${id}`, JSON.stringify(body), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        dispatch({
          type: POST_QUESTIONS,
          payload: response.data.result,
        });
        // alert("question created successfully");
        NotificationManager.success("", `question created`, 3000);
      }
    })
  // .catch((payload) =>
  //   console.log(payload.response.data.message)
  // );
};

export const deleteQuestion = (courseId, questionId) => () => {
  return new Promise((resolve) => {
    axios
      .delete(
        `${API}/assessment/delete?courseId=${courseId}&questionId=${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        NotificationManager.success("", `question deleted`, 3000);
      })
      .catch((err) =>
        NotificationManager.success("", `error delete question, ${err}`, 3000)
      );
  });
};

export const putFinalScore = (score, id) => (dispatch) => {
  let isLoading = true;
  dispatch(fetchLoading(isLoading));
  axios
    .put(
      `${API}/assessment/result?courseId=${id}`,
      {
        score,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      // console.log("score", score);
      dispatch({
        type: PUT_FINAL_SCORE,
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

export const updateQuestion = (body, id, questionId) => async (dispatch) => {
  axios
    .put(
      `${API}/assessment/update?courseId=${id}&questionId=${questionId}`,
      JSON.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        // console.log(body);
        // console.log(response.data);
        dispatch({
          type: UPDATE_QUESTION,
          payload: response.data,
        });
        NotificationManager.success("", `question updated`, 3000);
        // window.location.reload()
      }
    })
    .catch((payload) =>
      NotificationManager.error("", payload.response.data.message, 3000)
    );
};
