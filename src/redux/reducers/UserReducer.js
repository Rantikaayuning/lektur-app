import {
  GET_USER_PROFILE,
  LOGIN,
  SIGN_UP,
  UPDATE_USER_PROFILE,
  UPDATE_PROFILE_IMAGE,
  FETCH_USER_LOADING
} from "../types/UserLogin";
import Cookies from "js-cookie";

const initialState = {
  login: null,
  signup: null,
  status: "",
  isAuthentificated: Cookies.get("token") ? true : false,
  userProfile: null,
  updateUser: null,
  email: "",
  password: "",
  fullname: "",
  token: Cookies.get("token") || null,
  profileImage: null,
  message: null,
  isUserLoading: false
};

const userReducer = (state = initialState, action) => {
  const { type, payload, role, token, message } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        login: payload,
        status: role,
        token: token,
      };
    case SIGN_UP:
      return {
        ...state,
        signup: payload,
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: payload,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: { ...state.userProfile, ...payload },
      };
    case UPDATE_PROFILE_IMAGE:
      return{
        ...state,
        profileImage: payload,
        message: message,
      }
    case FETCH_USER_LOADING:
      return{
        ...state,
        isUserLoading: payload,
      } 
    default:
      return state;
  }
};

export default userReducer;
