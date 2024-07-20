import { resetPassword } from "../actions";
import {
  AUTH_USER,
  SIGN_OUT,
  USER_TYPE,
  UPDATE_USER_PROFILE,
  USER_CHANGE_EMAIL,
  USER_ADD_CART,
  USER_ADD_FAVORITES,
  UPDATE_CART,
  UPDATE_USER_HISTORY,
  GET_ALL_USERS,
  RESET_PASSWORD,
  SEND_EMAIL,
} from "../types";

let DEFAULT_USER_STATE = {
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    history: [],
    verified: null,
  },
  auth: null,
  cart: JSON.parse(localStorage.getItem("userCart")) || [],
  favorite: JSON.parse(localStorage.getItem("userFavorites")) || [],
  isAdmin: false,
  all: [],
  resetPasswordEmail: null,
  resetPassword: null,
};

export default function usersReducer(state = DEFAULT_USER_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        auth: action.payload.auth,
      };
    case USER_TYPE:
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
        auth: action.payload.auth,
      };
    case SIGN_OUT:
      localStorage.removeItem("userFavorites");
      localStorage.removeItem("userCart");
      return {
        ...state,
        data: { ...DEFAULT_USER_STATE.data },
        auth: false,
        isAdmin: false,
        favorite: [],
        cart: [],
      };
    case GET_ALL_USERS:
      return { ...state, all: action.payload };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        data: { ...action.payload },
      };
    case USER_CHANGE_EMAIL:
      return {
        ...state,
        data: { ...state.data, email: action.payload },
      };
    case USER_ADD_CART:
      const updatedCart = action.payload;
      localStorage.setItem("userCart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };
    case UPDATE_CART:
      const updatedCartFromUpdate = action.payload;
      localStorage.setItem("userCart", JSON.stringify(updatedCartFromUpdate));
      return {
        ...state,
        cart: updatedCartFromUpdate,
      };
    case USER_ADD_FAVORITES:
      const updatedFavorites = action.payload;
      localStorage.setItem("userFavorites", JSON.stringify(updatedFavorites));
      return {
        ...state,
        favorite: updatedFavorites,
      };
    case UPDATE_USER_HISTORY:
      return {
        ...state,
        history: [...action.payload],
      };
    case SEND_EMAIL:
      return {
        ...state,
        resetPasswordEmail: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      };
    default:
      return state;
  }
}
