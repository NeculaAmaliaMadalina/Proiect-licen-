import * as actionTypes from "../types";

const initialState = {};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ERROR_GLOBAL:
      return { ...state, error: true, msg: action.payload };
    case actionTypes.SUCCESS_GLOBAL:
      return { ...state, success: true, msg: action.payload };
    case actionTypes.CLEAR_NOTIFICATION:
      return {};
    case actionTypes.REMOVE_PRODUCT:
      return { ...state, removeArticle: true };

    default:
      return state;
  }
};

export default notificationsReducer;
