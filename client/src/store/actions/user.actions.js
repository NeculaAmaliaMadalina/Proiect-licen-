import * as actions from "./index";
import axios from "axios";
import {
  getAuthHeader,
  removeTokenCookie,
  getTokenCookie,
} from "../../utils/tools";
import { Navigate } from "react-router-dom";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const userRegister = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/auth/register`, {
        email: values.email,
        password: values.password,
      });
      dispatch(actions.userAuth({ data: user.data.user, auth: true }));
      dispatch(
        actions.successGlobal("Welcome!! Check your email to verify account")
      );
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userSignIn = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/auth/signin`, {
        email: values.email,
        password: values.password,
      });
      dispatch(actions.userAuth({ data: user.data.user, auth: true }));
      dispatch(actions.successGlobal("Welcome!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userIsAuth = () => {
  return async (dispatch) => {
    try {
      const site = await axios.get(`/api/site`);
      dispatch(actions.siteGetVars(site.data));
      if (!getTokenCookie()) {
        throw new Error();
      }
      const user = await axios.get(`/api/auth/isauth`, getAuthHeader());

      dispatch(actions.userAuth({ data: user.data, auth: true }));
    } catch (error) {
      dispatch(actions.userAuth({ data: {}, auth: false }));
    }
  };
};

export const userSignOut = () => {
  return async (dispatch) => {
    removeTokenCookie();
    dispatch(actions.userSignOut());
    dispatch(actions.successGlobal("Good bye!"));
    <Navigate to="/" />;
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const user = await axios.get(`/api/users/all`);
      dispatch(actions.getAllUsers(user.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userUpdateProfile = (data) => {
  return async (dispatch, getState) => {
    try {
      const profile = await axios.patch(
        `/api/users/profile`,
        {
          data: data,
        },
        getAuthHeader()
      );

      const userData = {
        ...getState().users.data,
        firstname: profile.data.firstname,
        lastname: profile.data.lastname,
      };

      dispatch(actions.userUpdateProfile(userData));
      dispatch(actions.successGlobal("Profile updated"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const userChangeEmail = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/users/email`,
        {
          email: data.email,
          newemail: data.newemail,
        },
        getAuthHeader()
      );

      dispatch(actions.userChangeEmail(data.newemail));
      dispatch(actions.successGlobal("Profile updated"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const userAddCart = (item) => {
  return async (dispatch, getState) => {
    try {
      const cart = getState().users.cart;
      const existItem = cart.find((cartItem) => cartItem.item._id === item._id);
      if (existItem) {
        const updatedCart = cart.map((cartItem) =>
          cartItem.item._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        dispatch(actions.userAddCart([...updatedCart]));
      } else {
        const updatedCart = [...cart, { item, quantity: 1 }];
        dispatch(actions.userAddCart([...updatedCart]));
      }

      dispatch(actions.successGlobal(`You add ${item.name} to cart`));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const decreaseProductQuantity = (_id) => {
  return async (dispatch, getState) => {
    try {
      const cart = getState().users.cart;
      const index = cart.findIndex((item) => item.item._id === _id);

      if (index !== -1 && cart[index].quantity > 1) {
        const updatedCart = [...cart];
        updatedCart[index].quantity -= 1;
        dispatch(actions.updateCart(updatedCart));
        // dispatch(
        //   actions.successGlobal(
        //     `You removed 1 ${updatedCart[index].item.name} from cart`
        //   )
        // );
      }
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const IncreseProductQuantity = (_id) => {
  return async (dispatch, getState) => {
    try {
      const cart = getState().users.cart;
      const index = cart.findIndex((item) => item.item._id === _id);
      if (index !== -1) {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        dispatch(actions.updateCart(updatedCart));
        // dispatch(
        //   actions.successGlobal(
        //     `You add ${updatedCart[index].item.name} to cart`
        //   )
        // );
      }
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const removeItemFromCart = (index) => {
  return async (dispatch, getState) => {
    try {
      const cart = getState().users.cart;
      cart.splice(index, 1);
      dispatch(actions.userAddCart(cart));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const userAddFavorites = (item) => {
  return async (dispatch, getState) => {
    try {
      const favorites = getState().users.favorite;
      dispatch(actions.userAddFavorites([...favorites, item]));
      dispatch(actions.successGlobal(`You add ${item.name} to favorites`));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const removeItemFromFav = (index) => {
  return async (dispatch, getState) => {
    try {
      const favorite = getState().users.favorite;
      favorite.splice(index, 1);
      dispatch(actions.userAddFavorites(favorite));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const userIsAdmin = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/isAdmin`, getAuthHeader());
      const isAdmin = response.data.isAdmin;
      dispatch(actions.userType({ isAdmin: isAdmin, auth: true }));
    } catch (error) {
      dispatch(actions.userType({ isAdmin: {}, auth: false }));
    }
  };
};
export const forgotPassword = (values) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/auth/forgot_password`, {
        email: values.email,
      });
      dispatch(actions.sentEmail(response.data));
      dispatch(
        actions.successGlobal(
          "Reset password link has been sent to your email."
        )
      );
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const resetPassword = (token, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth/reset_password", {
        token,
        password,
      });
      dispatch(actions.resetPassword(response.data));
      dispatch(actions.successGlobal("Updated"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
