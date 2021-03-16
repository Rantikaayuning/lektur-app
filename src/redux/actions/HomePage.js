import { NotificationManager } from "react-notifications";
import { GET_HOMEPAGE, FETCH_LOADING } from "../types/HomePage";
import Axios from "axios";

export const fetchLoading = (payload) => {
  return {
    type: FETCH_LOADING,
    payload: payload
  }
}

export const getHomepage = () => (dispatch) => {
  let isHomeLoading = true;
  dispatch(fetchLoading(isHomeLoading))
  Axios.get("https://lekturapp.herokuapp.com/all")
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
        dispatch({
          type: GET_HOMEPAGE,
          payload: response.data.data,
          category: response.data.data.category,
        });
        let isHomeLoading = false;
        dispatch(fetchLoading(isHomeLoading))
      }
    })
    .catch((payload) => {
      NotificationManager.error("", payload.response.data.message, 3000);
      let isHomeLoading = false;
      dispatch(fetchLoading(isHomeLoading))
    });
};
