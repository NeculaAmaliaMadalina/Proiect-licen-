import {
  ORDER_ADD,
  GET_ORDERS_PAGINATE,
  GET_ORDER_BY_ID,
  APPLY_DISCOUNT,
  GET_ALL_ORDERS,
  GET_ALL_ORDER_DETAIL,
} from "../types";

export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_ADD:
      return { ...state, order: action.payload };
    case GET_ALL_ORDER_DETAIL:
      return { ...state, allDetail: action.payload };
    case GET_ALL_ORDERS:
      return { ...state, all: action.payload };
    case GET_ORDERS_PAGINATE:
      return { ...state, byPaginate: action.payload };
    case GET_ORDER_BY_ID:
      return { ...state, byId: action.payload };
    case APPLY_DISCOUNT:
      return {
        ...state,
        discount: action.payload,
      };
    default:
      return state;
  }
}
