import {
  ALL_DISCOUNTS,
  APPLY_DISCOUNT,
  CLEAR_DISCOUNT,
  CLEAR_DISCOUNT_EDIT,
  DISCOUNT_ADD,
  GET_DISCOUNT_BY_ID,
  GET_DISCOUNT_PAGINATE,
  TOTAL_WITH_DISCOUNT,
} from "../types";
let DEFAULT_DISCOUNT_STATE = {
  discount: null,
  totalWithDiscount: 0,
};
const discount = (state = DEFAULT_DISCOUNT_STATE, action) => {
  switch (action.type) {
    case ALL_DISCOUNTS:
      return { ...state, all: action.payload };
    case DISCOUNT_ADD:
      return { ...state, last: action.payload };
    case APPLY_DISCOUNT:
      return {
        ...state,
        discount: action.payload.discount,
        totalWithDiscount: action.payload.totalWithDiscount,
      };
    case TOTAL_WITH_DISCOUNT:
      return {
        ...state,
        totalWithDiscount: action.payload,
      };
    case GET_DISCOUNT_PAGINATE:
      return { ...state, byPaginate: action.payload };
    case GET_DISCOUNT_BY_ID:
      return { ...state, byId: action.payload };
    case CLEAR_DISCOUNT_EDIT:
      return { ...state, byId: "" };
    case CLEAR_DISCOUNT:
      return { ...state, byId: "" };
    default:
      return state;
  }
};

export default discount;
