import {
  CLEAR_RETUR,
  CLEAR_RETUR_EDIT,
  GET_ALL_RETURS,
  GET_RETUR_BY_ID,
  GET_RETUR_PAGINATE,
  RETUR_ADD,
} from "../types";

const returs = (state = {}, action) => {
  switch (action.type) {
    case RETUR_ADD:
      return { ...state, last: action.payload };
    case GET_ALL_RETURS:
      return { ...state, all: action.payload };
    case GET_RETUR_PAGINATE:
      return { ...state, byPaginate: action.payload };
    case GET_RETUR_BY_ID:
      return { ...state, byId: action.payload };
    case CLEAR_RETUR_EDIT:
      return { ...state, byId: "" };
    case CLEAR_RETUR:
      return { ...state, byId: "" };
    default:
      return state;
  }
};

export default returs;
