import axios from "axios";
import * as actions from "./index";
import { getAuthHeader } from "../../utils/tools";

export const getAllBrands = () => {
  return async (dispatch) => {
    try {
      const brands = await axios.get(`/api/brands/all`);
      dispatch(actions.getAllBrands(brands.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const brandAdd = (data) => {
  return async (dispatch) => {
    try {
      const brand = await axios.post(
        `/api/brands/brand`,
        data,
        getAuthHeader()
      );
      console.log("Response from server:", brand.data);
      dispatch(actions.brandAdd(brand.data));
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const brandByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const brand = await axios.post(`/api/brands/paginate/all`, args);
      dispatch(actions.brandByPaginate(brand.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const brandRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/brands/brand/${id}`, getAuthHeader());
      dispatch(actions.brandRemove());
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const brandEdit = (values, id) => {
  return async (dispatch) => {
    try {
      await axios.patch(`/api/brands/brand/${id}`, values, getAuthHeader());
      dispatch(actions.successGlobal("Updated!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getBrandById = (id) => {
  return async (dispatch) => {
    try {
      const brand = await axios.get(`/api/brands/brand/${id}`);
      dispatch(actions.brandById(brand.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
