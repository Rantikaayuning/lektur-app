import {GET_HOMEPAGE, FETCH_LOADING} from "../types/HomePage"

const initialState = {
    homePage: null,
    category: null,
    isHomeLoading: false
}

const homePageReducer = (state = initialState, action) => {
    const {type, payload, category} = action
    switch (type) {
        case GET_HOMEPAGE:
          return {
            ...state,
            homePage: payload,
            category: category,
          }
        case FETCH_LOADING:
          return {
            ...state,
            isHomeLoading: payload
          }
    default:
      return state;
    }
}

export default homePageReducer;