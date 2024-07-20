import {
  GET_ALL_CATEGORY,
  CATEGORY_ADD,
  GET_CATEGORY_PAGINATE,
  GET_CATEGORY_BY_ID,
  CLEAR_CATEGORY_EDIT,
} from "../types";

const initialState = {
  all: [],
  byPaginate: [],
  lastAdded: null,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return { ...state, all: action.payload };
    case CATEGORY_ADD:
      return { ...state, last: action.payload };
    case GET_CATEGORY_BY_ID:
      return { ...state, byId: action.payload };
    case CLEAR_CATEGORY_EDIT:
      return { ...state, byId: "" };
    case GET_CATEGORY_PAGINATE:
      return { ...state, byPaginate: action.payload };
    default:
      return state;
  }
};

export default category;
