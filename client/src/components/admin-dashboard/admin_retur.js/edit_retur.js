import React, { useEffect, useState } from "react";
import AdminLayout from "../admin_navigation/admin_layout";
import { errorHelper } from "../../../utils/tools";
import { useFormik } from "formik";
import Loader from "../../../utils/loader";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { returEdit, getReturById } from "../../../store/actions/retur.action";
import { getAllReturs } from "../../../store/actions/index";
import { validation, formValues, getValuesToEdit } from "./form_values";
import { clearReturEdit } from "../../../store/actions/index";

import { TextField, Button, Divider } from "@mui/material";

const EditRetur = (props) => {
  const [values, setValues] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const returs = useSelector((state) => state.returs);
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
    dispatch(returEdit(values, id));
  };

  useEffect(() => {
    dispatch(getAllReturs());
    if (id) {
      dispatch(getReturById(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (notifications) {
      setLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    return () => {
      dispatch(clearReturEdit());
    };
  }, [dispatch]);

  useEffect(() => {
    if (returs && returs.byId) {
      setValues(getValuesToEdit(returs.byId));
    }
  }, [returs]);
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
                      name="userId"
                      label="Enter a userId"
                      variant="outlined"
                      {...formik.getFieldProps("userId")}
                      {...errorHelper(formik, "userId")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="orderId"
                      label="Enter a orderId"
                      variant="outlined"
                      {...formik.getFieldProps("orderId")}
                      {...errorHelper(formik, "orderId")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="bankAccount"
                      label="Enter a bankAccount"
                      variant="outlined"
                      {...formik.getFieldProps("bankAccount")}
                      {...errorHelper(formik, "bankAccount")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="product"
                      label="Enter a product"
                      variant="outlined"
                      {...formik.getFieldProps("product")}
                      {...errorHelper(formik, "product")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="returnReason"
                      label="Enter a returnReason"
                      variant="outlined"
                      {...formik.getFieldProps("returnReason")}
                      {...errorHelper(formik, "returnReason")}
                      multiline
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="observations"
                      label="Enter a observations"
                      variant="outlined"
                      {...formik.getFieldProps("observations")}
                      {...errorHelper(formik, "observations")}
                      multiline
                      rows={3}
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

export default EditRetur;
