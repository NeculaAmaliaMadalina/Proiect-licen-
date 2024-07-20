import { SET_SEARCH_KEYWORDS, RESET_SEARCH } from "../types";

const initialState = {
  keywords: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_KEYWORDS:
      return {
        ...state,
        keywords: action.payload,
      };
    case RESET_SEARCH:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
