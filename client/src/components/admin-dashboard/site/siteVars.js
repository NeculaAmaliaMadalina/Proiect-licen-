import React from "react";
import AdminLayout from "../admin_navigation/admin_layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../../utils/tools";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { updateSiteVars } from "../../../store/actions/site.actions";

const SiteVars = () => {
  const site = useSelector((state) => state.site);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      address: site.vars.address,
      phone: site.vars.phone,
      hours: site.vars.hours,
      email: site.vars.email,
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .min(3, "You need minim 3 characters")
        .required("The address is required"),
      phone: Yup.string()
        .max(50, "You need maximum 50 characters")
        .required("The phone is required"),
      hours: Yup.string()
        .max(50, "You need maximum 50 characters")
        .required("The hours is required"),
      email: Yup.string()
        .email("You need to add a valid email")
        .required("The email is required"),
    }),
    onSubmit: (values) => {
      dispatch(
        updateSiteVars({
          _id: site.vars._id,
          ...values,
        })
      );
    },
  });
  return (
    <AdminLayout title="Manage site information">
      <div className="background-container">
        <div className="content-container">
          <div className="form-container">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <TextField
                  style={{ width: "100%" }}
                  name="address"
                  label="Enter the address"
                  variant="outlined"
                  {...formik.getFieldProps("address")}
                  {...errorHelper(formik, "address")}
                />
              </div>
              <div className="form-group">
                <TextField
                  style={{ width: "100%" }}
                  name="phone"
                  label="Enter the phone"
                  variant="outlined"
                  {...formik.getFieldProps("phone")}
                  {...errorHelper(formik, "phone")}
                />
              </div>
              <div className="form-group">
                <TextField
                  style={{ width: "100%" }}
                  name="hours"
                  label="Enter the hours"
                  variant="outlined"
                  {...formik.getFieldProps("hours")}
                  {...errorHelper(formik, "hours")}
                />
              </div>
              <div className="form-group">
                <TextField
                  style={{ width: "100%" }}
                  name="email"
                  label="Enter the email"
                  variant="outlined"
                  {...formik.getFieldProps("email")}
                  {...errorHelper(formik, "email")}
                />
              </div>
              <Button variant="contained" color="primary" type="submit">
                Edit information
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SiteVars;
