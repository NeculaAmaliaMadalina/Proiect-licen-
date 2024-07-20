import { getAuthHeader } from "../../utils/tools";
import * as actions from "./index";
import axios from "axios";

export const orderAdd = (data) => {
  return async (dispatch) => {
    try {
      const order = await axios.post(
        `/api/order/finalizare_comanda`,
        data,
        getAuthHeader()
      );

      dispatch(actions.orderAdd(order.data));
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const applyDiscount = (code) => {
  return async (dispatch) => {
    try {
      const discount = await axios.post(`/api/discount/apply`, { code });
      const value = discount.data;
      dispatch(actions.applyDiscount(value));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const ordersByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const orders = await axios.post(`/api/order/paginate/all`, args);
      dispatch(actions.ordersByPaginate(orders.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const orderRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/order/order/${id}`, getAuthHeader());
      dispatch(actions.orderRemove());
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getOrderById = (id) => {
  return async (dispatch) => {
    try {
      const order = await axios.get(`/api/order/order/${id}`);
      dispatch(actions.productsById(order.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/order/all`);
      const orders = response.data;
      const ordersByDate = {};
      orders.forEach((order) => {
        const date = new Date(order.orderDate).toDateString();
        if (!ordersByDate[date]) {
          ordersByDate[date] = 1;
        } else {
          ordersByDate[date] += 1;
        }
      });
      dispatch(actions.getAllOrders(ordersByDate));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getAllOrderDetail = () => {
  return async (dispatch) => {
    try {
      const orders = await axios.get(`/api/order/all`);
      dispatch(actions.getAllOrderDetail(orders.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
