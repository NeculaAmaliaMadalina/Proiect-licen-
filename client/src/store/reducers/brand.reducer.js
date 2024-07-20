import {
  GET_ALL_BRANDS,
  BRAND_ADD,
  GET_BRAND_PAGINATE,
  GET_BRAND_BY_ID,
  CLEAR_BRAND_EDIT,
  CLEAR_BRAND,
} from "../types";

const brands = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_BRANDS:
      return { ...state, all: action.payload };
    case BRAND_ADD:
      return { ...state, last: action.payload };
    case GET_BRAND_PAGINATE:
      return { ...state, byPaginate: action.payload };
    case GET_BRAND_BY_ID:
      return { ...state, byId: action.payload };
    case CLEAR_BRAND_EDIT:
      return { ...state, byId: "" };
    case CLEAR_BRAND:
      return { ...state, byId: "" };
    default:
      return state;
  }
};

export default brands;
