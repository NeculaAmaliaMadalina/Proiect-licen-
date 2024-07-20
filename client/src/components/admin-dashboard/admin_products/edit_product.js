import React, { useEffect, useState } from "react";
import AdminLayout from "../admin_navigation/admin_layout";
import { errorHelper } from "../../../utils/tools";
import { useFormik } from "formik";
import Loader from "../../../utils/loader";
import { useParams } from "react-router-dom";
import PicUpload from "../admin_products/upload_image";
import PicViewer from "./pic_viewer";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../store/actions/category.action";
import { getAllSubcategory } from "../../../store/actions/subcategory.action";
import {
  productEdit,
  getProductById,
} from "../../../store/actions/product.action";
import { validation, formValues, getValuesToEdit } from "./form_values";
import { clearProductEdit } from "../../../store/actions/index";
import { getAllBrands } from "../../../store/actions/brand";

import {
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";

const EditProduct = (props) => {
  const [values, setValues] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const notifications = useSelector((state) => state.notifications);
  const brands = useSelector((state) => state.brands);
  const category = useSelector((state) => state.category);
  const subcategory = useSelector((state) => state.subcategory);
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
    dispatch(productEdit(values, id));
  };

  const handlePicValue = (pic) => {
    const picArray = formik.values.images;
    picArray.push(pic.url);
    formik.setFieldValue("images", picArray);
  };

  const deletePic = (index) => {
    const picArray = formik.values.images;
    picArray.splice(index, 1);
    formik.setFieldValue("images", picArray);
  };

  useEffect(() => {
    if (notifications) {
      setLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    dispatch(getAllBrands());
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllCategory());
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllSubcategory());
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearProductEdit());
    };
  }, [dispatch]);

  useEffect(() => {
    if (products && products.byId) {
      setValues(getValuesToEdit(products.byId));
    }
  }, [products]);
  return (
    <AdminLayout title="Edit product">
      <div className="background-container">
        <div className="content-container">
          <div className="form-container">
            {loading ? (
              <Loader />
            ) : (
              <>
                <PicViewer
                  formik={formik}
                  deletePic={(index) => deletePic(index)}
                />
                <Divider className="mt-3 mb-3" />
                <PicUpload picValue={(pic) => handlePicValue(pic)} />

                <Divider className="mt-3 mb-3" />
                <form
                  className="mt-3 article_form form-container"
                  onSubmit={formik.handleSubmit}
                >
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
                    <TextField
                      style={{ width: "100%" }}
                      name="price"
                      label="Enter a description"
                      variant="outlined"
                      {...formik.getFieldProps("description")}
                      {...errorHelper(formik, "description")}
                      multiline
                      rows={5}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="price"
                      label="Enter a price"
                      variant="outlined"
                      type="number"
                      {...formik.getFieldProps("price")}
                      {...errorHelper(formik, "price")}
                    />
                  </div>
                  <div className="form-group">
                    <FormControl variant="outlined">
                      <h5>Select a brand</h5>
                      <Select
                        name="brand"
                        {...formik.getFieldProps("brand")}
                        error={
                          formik.errors.brand && formik.touched.brand
                            ? true
                            : false
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {brands && brands.all
                          ? brands.all.map((item) => (
                              <MenuItem key={item._id} value={item._id}>
                                {item.name}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                      {formik.errors.brand && formik.touched.brand ? (
                        <FormHelperText error={true}>
                          {formik.errors.brand}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="form-group">
                    <FormControl variant="outlined">
                      <h5>Select a category</h5>
                      <Select
                        name="category"
                        {...formik.getFieldProps("category")}
                        error={
                          formik.errors.category && formik.touched.category
                            ? true
                            : false
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
                  <div className="form-group">
                    <FormControl variant="outlined">
                      <h5>Select a subcategory</h5>
                      <Select
                        name="subcategory"
                        {...formik.getFieldProps("subcategory")}
                        error={
                          formik.errors.subcategory &&
                          formik.touched.subcategory
                            ? true
                            : false
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {subcategory && subcategory.all
                          ? subcategory.all.map((item) => (
                              <MenuItem key={item._id} value={item._id}>
                                {item.name}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                      {formik.errors.subcategory &&
                      formik.touched.subcategory ? (
                        <FormHelperText error={true}>
                          {formik.errors.subcategory}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="size"
                      label="Enter a size"
                      variant="outlined"
                      {...formik.getFieldProps("size")}
                      {...errorHelper(formik, "size")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="color"
                      label="Enter a color"
                      variant="outlined"
                      {...formik.getFieldProps("color")}
                      {...errorHelper(formik, "color")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="available"
                      label="How many items are available? "
                      variant="outlined"
                      type="number"
                      {...formik.getFieldProps("available")}
                      {...errorHelper(formik, "available")}
                    />
                  </div>
                  <div className="form-group">
                    <FormControl variant="outlined">
                      <h5>Do you offer free shipping? </h5>
                      <Select
                        name="shipping"
                        {...formik.getFieldProps("shipping")}
                        error={
                          formik.errors.shipping && formik.touched.shipping
                            ? true
                            : false
                        }
                      >
                        <MenuItem value={true}> Yes </MenuItem>
                        <MenuItem value={false}> No </MenuItem>
                      </Select>
                      {formik.errors.shipping && formik.touched.shipping ? (
                        <FormHelperText error={true}>
                          {formik.errors.shipping}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
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

export default EditProduct;
