import { getAuthHeader } from "../../utils/tools";
import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const productsByDate = ({ limit, order, sortBy }) => {
  return async (dispatch) => {
    try {
      const products = await axios.get(`/api/products/all`, {
        params: {
          limit,
          order,
          sortBy,
        },
      });

      dispatch(actions.productsByDate(products.data));
    } catch (error) {
      console.log(error);
      dispatch(actions.errorGlobal("Sorry something happen, try again"));
    }
  };
};

export const productAdd = (data) => {
  return async (dispatch) => {
    try {
      const product = await axios.post(`/api/products/`, data, getAuthHeader());

      dispatch(actions.productAdd(product.data));
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const productsByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const products = await axios.post(`/api/products/paginate/all`, args);
      dispatch(actions.productsByPaginate(products.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const productRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/product/${id}`, getAuthHeader());
      dispatch(actions.productRemove());
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const product = await axios.get(`/api/products/product/${id}`);
      dispatch(actions.productsById(product.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const getProductName = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/all`);
      const products = response.data;

      const product = products.find((product) => product._id === productId);

      if (product) {
        const { _id, name } = product;
        dispatch(actions.productsByName(_id, name));
      } else {
        dispatch(actions.errorGlobal("Product not found"));
      }
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getProductByCategory = (categoryId, searchParams) => {
  return async (dispatch) => {
    try {
      const product = await axios.get(`/api/products/${categoryId}`, {
        params: searchParams,
      });
      dispatch(actions.productsByCategory(product.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const productEdit = (values, id) => {
  return async (dispatch) => {
    try {
      await axios.patch(`/api/products/product/${id}`, values, getAuthHeader());
      dispatch(actions.successGlobal("Updated!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
