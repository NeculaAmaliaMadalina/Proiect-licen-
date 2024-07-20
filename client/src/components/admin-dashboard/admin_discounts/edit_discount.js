import React, { useEffect, useState } from "react";
import AdminLayout from "../admin_navigation/admin_layout";
import { errorHelper } from "../../../utils/tools";
import { useFormik } from "formik";
import Loader from "../../../utils/loader";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  discountEdit,
  getDiscountById,
} from "../../../store/actions/discount.actions";
import { getAllDiscounts } from "../../../store/actions/index";
import { validation, formValues, getValuesToEdit } from "./form_values";
import { clearDiscountEdit } from "../../../store/actions/index";

import { TextField, Button, Divider } from "@mui/material";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
const EditDiscount = (props) => {
  const [values, setValues] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const discount = useSelector((state) => state.discount);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(discountEdit(values, id));
  };

  useEffect(() => {
    dispatch(getAllDiscounts());
    if (id) {
      dispatch(getDiscountById(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (notifications) {
      setLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    return () => {
      dispatch(clearDiscountEdit());
    };
  }, [dispatch]);

  useEffect(() => {
    if (discount && discount.byId) {
      setValues(getValuesToEdit(discount.byId));
    }
  }, [discount]);
  return (
    <AdminLayout title="Edit product">
      <div className="background-container">
        <div className="content-container">
          <div className="form-container">
            {loading ? (
              <Loader />
            ) : (
              <>
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

                  <Divider className="mt-3 mb-3" />
                  <Button variant="contained" color="primary" type="submit">
                    Edit product
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

export default EditDiscount;
