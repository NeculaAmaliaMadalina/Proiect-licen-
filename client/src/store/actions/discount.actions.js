import axios from "axios";
import * as actions from "./index";
import { getAuthHeader } from "../../utils/tools";

export const getAllDiscounts = () => {
  return async (dispatch) => {
    try {
      const discount = await axios.get(`/api/discount/all`);
      dispatch(actions.getAllDiscounts(discount.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
// export const getDiscountNameById = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`/api/discount/${id}`);
//       const discount = response.data;
//       return discount.code;
//     } catch (error) {
//       dispatch(actions.errorGlobal(error.response.data.message));
//     }
//   };
// };
export const discountAdd = (data) => {
  return async (dispatch) => {
    try {
      const discount = await axios.post(`/api/discount`, data, getAuthHeader());
      dispatch(actions.discountAdd(discount.data));
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const discountByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const discount = await axios.post(`/api/discount/paginate/all`, args);
      dispatch(actions.discountByPaginate(discount.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const discountRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/discount/${id}`, getAuthHeader());
      dispatch(actions.discountRemove());
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const discountEdit = (values, id) => {
  return async (dispatch) => {
    try {
      await axios.patch(`/api/discount/${id}`, values, getAuthHeader());
      dispatch(actions.successGlobal("Updated!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const applyDiscountByCode = (code) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        "/api/discount/apply",
        { code },
        getAuthHeader()
      );
      const state = getState();
      const cartTotal = state.users.cart.reduce(
        (total, product) => total + product.quantity * product.item.price,
        0
      );
      const discountValue = response.data.value;
      let totalWithDiscount = cartTotal - discountValue;

      if (totalWithDiscount < 250) {
        totalWithDiscount += 20;
      }

      dispatch(actions.discountApplied(response.data, totalWithDiscount));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getDiscountById = (id) => {
  return async (dispatch) => {
    try {
      const discount = await axios.get(`/api/discount/${id}`);
      dispatch(actions.discountById(discount.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
