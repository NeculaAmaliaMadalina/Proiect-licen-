import axios from "axios";
import * as actions from "./index";
import { getAuthHeader } from "../../utils/tools";
export const getAllSubcategory = () => {
  return async (dispatch) => {
    try {
      const subcategory = await axios.get(`/api/subcategory/all`);
      dispatch(actions.getAllSubcategory(subcategory.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const subcategoryAdd = (data) => {
  return async (dispatch) => {
    try {
      const subcategory = await axios.post(
        `/api/subcategory/subcategory/`,
        data,
        getAuthHeader()
      );
      dispatch(actions.subcategoryAdd(subcategory.data));
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const subcategoryEdit = (values, id) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/subcategory/subcategory/${id}`,
        values,
        getAuthHeader()
      );
      dispatch(actions.successGlobal("Updated!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const subcategoryByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const subcategory = await axios.post(
        `/api/subcategory/paginate/all`,
        args
      );
      dispatch(actions.subcategoryByPaginate(subcategory.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const subcategoryRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/subcategory/subcategory/${id}`, getAuthHeader());
      dispatch(actions.subcategoryRemove());
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getSubcategoryById = (id) => {
  return async (dispatch) => {
    try {
      const subcategory = await axios.get(`/api/subcategory/subcategory/${id}`);
      dispatch(actions.subcategoryById(subcategory.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
