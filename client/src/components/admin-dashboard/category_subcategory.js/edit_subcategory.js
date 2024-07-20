import React, { useEffect, useState } from "react";
import AdminLayout from "../admin_navigation/admin_layout";
import { errorHelper } from "../../../utils/tools";
import { useFormik } from "formik";
import Loader from "../../../utils/loader";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllSubcategory } from "../../../store/actions/subcategory.action";
import { getAllCategory } from "../../../store/actions/category.action";
import {
  subcategoryEdit,
  getSubcategoryById,
} from "../../../store/actions/subcategory.action";

import {
  validation,
  formValues,
  getValuesToEdit,
} from "./form_values_subcategory";

import {
  TextField,
  Button,
  Divider,
  Select,
  FormHelperText,
  MenuItem,
  FormControl,
} from "@mui/material";
import { clearSubcategoryEdit } from "../../../store/actions/index";

const EditSubcategory = (props) => {
  const [values, setValues] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const subcategory = useSelector((state) => state.subcategory);
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
    dispatch(subcategoryEdit(values, id));
  };
  console.log(values._id);
  console.log(values.name);
  console.log(values.category);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (notifications) {
      setLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    dispatch(getAllSubcategory());
    if (id) {
      dispatch(getSubcategoryById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (subcategory && subcategory.byId) {
      setValues(getValuesToEdit(subcategory.byId));
    }
  }, [subcategory]);
  useEffect(() => {
    return () => {
      dispatch(clearSubcategoryEdit());
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
                  <div className="form-group">
                    <FormControl variant="outlined">
                      <h5>Select a category</h5>
                      <Select
                        name="category"
                        multiple
                        {...formik.getFieldProps("category")}
                        error={
                          formik.errors.category && formik.touched.category
                        }
                        renderValue={(selected) =>
                          selected
                            .map(
                              (categoryId) =>
                                category.all.find(
                                  (cat) => cat._id === categoryId
                                )?.name
                            )
                            .join(", ")
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {category && category.all
                          ? category.all.map((item) => (
                              <MenuItem key={item._id} value={item._id}>
                                {item.name}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                      {formik.errors.category && formik.touched.category ? (
                        <FormHelperText error={true}>
                          {formik.errors.category}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
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

export default EditSubcategory;
