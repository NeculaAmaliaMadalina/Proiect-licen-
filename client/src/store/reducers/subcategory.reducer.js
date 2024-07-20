import {
  GET_ALL_SUBCATEGORY,
  SUBCATEGORY_ADD,
  GET_SUBCATEGORY_BY_ID,
  CLEAR_SUBCATEGORY_EDIT,
  GET_SUBCATEGORY_PAGINATE,
} from "../types";

const subcategory = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SUBCATEGORY:
      return { ...state, all: action.payload };
    case SUBCATEGORY_ADD:
      return { ...state, lastAdded: action.payload };
    case GET_SUBCATEGORY_BY_ID:
      return { ...state, byId: action.payload };
    case CLEAR_SUBCATEGORY_EDIT:
      return { ...state, byId: "" };
    case GET_SUBCATEGORY_PAGINATE:
      return { ...state, byPaginate: action.payload };
    default:
      return state;
  }
};

export default subcategory;
