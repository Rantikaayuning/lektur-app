import Axios from "axios";

// const access_token = localStorage.getItem("token"); // to get the token

const API = Axios.create({
  baseURL: `/api`,
});

export default API;
