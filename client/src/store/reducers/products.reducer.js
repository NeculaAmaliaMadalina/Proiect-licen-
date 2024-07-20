import {
  GET_PROD_BY_DATE,
  PRODUCT_ADD,
  CLEAR_PRODUCT_ADD,
  GET_PRODUCT_PAGINATE,
  GET_PRODUCT_BY_ID,
  CLEAR_PRODUCT_EDIT,
  GET_PRODUCT_BY_CATEGORY,
  CLEAR_PRODUCT,
  GET_PRODUCT_BY_NAME,
} from "e:/Licenta/client/src/store/types";

export default function productsReducer(state = {}, action) {
  switch (action.type) {
    case GET_PROD_BY_DATE:
      return { ...state, byDate: action.payload };
    case PRODUCT_ADD:
      return { ...state, lastAdded: action.payload };
    case CLEAR_PRODUCT_ADD:
      return { ...state, lastAdded: null };
    case GET_PRODUCT_PAGINATE:
      return { ...state, byPaginate: action.payload };
    case GET_PRODUCT_BY_ID:
      return { ...state, byId: action.payload };
    case CLEAR_PRODUCT_EDIT:
      return { ...state, byId: "" };
    case CLEAR_PRODUCT:
      return { ...state, byId: "" };
    case GET_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        byCategory: action.payload,
      };
    case GET_PRODUCT_BY_NAME:
      const { id, name } = action.payload;
      return { ...state, [id]: name };
    default:
      return state;
  }
}
