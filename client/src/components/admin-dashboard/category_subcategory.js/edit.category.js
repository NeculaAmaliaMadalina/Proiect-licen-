import React, { useEffect, useState } from "react";
import AdminLayout from "../admin_navigation/admin_layout";
import { errorHelper } from "../../../utils/tools";
import { useFormik } from "formik";
import Loader from "../../../utils/loader";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../store/actions/category.action";
import {
  categoryEdit,
  getCategoryById,
} from "../../../store/actions/category.action";
import { validation, formValues, getValuesToEdit } from "./form_values";

import { TextField, Button, Divider } from "@mui/material";
import { clearCategoryEdit } from "../../../store/actions/index";

const EditCategory = (props) => {
  const [values, setValues] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const category = useSelector((state) => state.category);
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
    dispatch(categoryEdit(values, id));
  };

  useEffect(() => {
    if (notifications) {
      setLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    dispatch(getAllCategory());
    if (id) {
      dispatch(getCategoryById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (category && category.byId) {
      setValues(getValuesToEdit(category.byId));
    }
  }, [category]);
  useEffect(() => {
    return () => {
      dispatch(clearCategoryEdit());
    };
  }, [dispatch]);
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
                      name="_id"
                      label="Enter the id"
                      variant="outlined"
                      {...formik.getFieldProps("_id")}
                      {...errorHelper(formik, "_id")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="name"
                      label="Enter a name"
                      variant="outlined"
                      {...formik.getFieldProps("name")}
                      {...errorHelper(formik, "name")}
                    />
                  </div>
                  <Divider className="mt-3 mb-3" />
                  <Button variant="contained" color="primary" type="submit">
                    Edit category
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

export default EditCategory;
