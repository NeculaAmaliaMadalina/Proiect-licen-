import axios from "axios";
import * as actions from "./index";
import { getAuthHeader } from "../../utils/tools";

export const getAllCategory = () => {
  return async (dispatch) => {
    try {
      const category = await axios.get(`/api/category/all`);
      dispatch(actions.getAllCategory(category.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const categoryAdd = (data) => {
  return async (dispatch) => {
    try {
      const category = await axios.post(
        `/api/category/category/`,
        data,
        getAuthHeader()
      );
      console.log("Response from server:", category.data);
      dispatch(actions.categoryAdd(category.data));
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const categoryEdit = (values, id) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/category/category/${id}`,
        values,
        getAuthHeader()
      );
      dispatch(actions.successGlobal("Updated!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const categoryByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const category = await axios.post(`/api/category/paginate/all`, args);
      dispatch(actions.categoryByPaginate(category.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const categoryRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/category/category/${id}`, getAuthHeader());
      dispatch(actions.categoryRemove());
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getCategoryById = (id) => {
  return async (dispatch) => {
    try {
      const category = await axios.get(`/api/category/category/${id}`);
      dispatch(actions.categoryById(category.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
