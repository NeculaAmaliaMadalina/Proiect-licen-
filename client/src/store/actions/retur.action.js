import axios from "axios";
import * as actions from "./index";
import { getAuthHeader } from "../../utils/tools";

export const returAdd = (data) => {
  return async (dispatch) => {
    try {
      const retur = await axios.post(`/api/retur`, data, getAuthHeader());
      dispatch(actions.returAdd(retur.data));
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getAllReturs = () => {
  return async (dispatch) => {
    try {
      const retur = await axios.get(`/api/retur/all`);
      dispatch(actions.getAllReturs(retur.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const returByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const retur = await axios.post(`/api/retur/paginate/all`, args);
      dispatch(actions.returByPaginate(retur.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const returRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/retur/retur/${id}`, getAuthHeader());
      dispatch(actions.returRemove());
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const returEdit = (values, id) => {
  return async (dispatch) => {
    try {
      await axios.patch(`/api/retur/retur/${id}`, values, getAuthHeader());
      dispatch(actions.successGlobal("Updated!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
export const getReturById = (id) => {
  return async (dispatch) => {
    try {
      const retur = await axios.get(`/api/retur/retur/${id}`);
      dispatch(actions.returById(retur.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
