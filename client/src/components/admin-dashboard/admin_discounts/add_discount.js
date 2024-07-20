import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import AdminLayout from "../admin_navigation/admin_layout";
import { errorHelper } from "../../../utils/tools";
import { useFormik } from "formik";
import Loader from "../../../utils/loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { discountAdd } from "../../../store/actions/discount.actions";
import { validation, formValues } from "./form_values";
import {
  TextField,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const AddDiscount = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const discount = useSelector((state) => state.discount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(discountAdd(values));
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      navigate("/admin_dashboard");
    }
    if (notifications && notifications.error) {
      setLoading(false);
    }
  }, [notifications, navigate]);

  return (
    <AdminLayout title="Add product">
      <div className="background-container">
        <div className="content-container">
          <div className="form-container">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="title">
                  <h2>
                    <b>Add discount</b>
                  </h2>
                </div>
                <form
                  className="mt-3 article_form form-container"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="code"
                      label="Enter a code"
                      variant="outlined"
                      {...formik.getFieldProps("code")}
                      {...errorHelper(formik, "code")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="value"
                      type="number"
                      label="Enter a value"
                      variant="outlined"
                      {...formik.getFieldProps("value")}
                      {...errorHelper(formik, "value")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="type"
                      label="Enter a type"
                      variant="outlined"
                      {...formik.getFieldProps("type")}
                      {...errorHelper(formik, "type")}
                    />
                  </div>

                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="minimumAmount"
                      type="number"
                      label="Enter a minimumAmount"
                      variant="outlined"
                      {...formik.getFieldProps("minimumAmount")}
                      {...errorHelper(formik, "minimumAmount")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="validFrom"
                      label="Enter a validFrom"
                      variant="outlined"
                      {...formik.getFieldProps("validFrom")}
                      {...errorHelper(formik, "validFrom")}
                      type="date"
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="validUntil"
                      label="Enter a validUntil"
                      variant="outlined"
                      {...formik.getFieldProps("validUntil")}
                      {...errorHelper(formik, "validUntil")}
                      type="date"
                    />
                  </div>

                  <Button variant="contained" color="primary" type="submit">
                    Add discount
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddDiscount;
