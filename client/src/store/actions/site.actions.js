import * as actions from "./index";
import axios from "axios";
import { getAuthHeader } from "../../utils/tools";

export const updateSiteVars = (args) => {
  return async (dispatch) => {
    try {
      const site = await axios.patch(`/api/site`, args, getAuthHeader());

      dispatch(actions.updateSiteVars(site.data));
      dispatch(actions.successGlobal("Updated!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
