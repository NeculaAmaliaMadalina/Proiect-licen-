import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import AdminLayout from "../admin_navigation/admin_layout";
import { errorHelper } from "../../../utils/tools";
import { useFormik } from "formik";
import Loader from "../../../utils/loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryAdd,
  getAllCategory,
} from "../../../store/actions/category.action";
import { getAllSubcategory } from "../../../store/actions/subcategory.action";
import { subcategoryAdd } from "../../../store/actions/subcategory.action";
import { brandAdd } from "../../../store/actions/brand";
import {
  TextField,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const AddCategory = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formikCategory = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Sorry, the name of category is required"),
    }),
    onSubmit: (values) => {
      handleSubmitCategory(values);
    },
  });
  const formikBrand = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Sorry, the name of brand is required"),
    }),
    onSubmit: (values) => {
      handleSubmitBrand(values);
    },
  });
  const formikSubcategory = useFormik({
    initialValues: {
      name: "",
      category: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Sorry, the name of subcategory is required"),
      category: Yup.array().required(
        "Sorry, at least one category is required"
      ),
    }),
    onSubmit: (values) => {
      handleSubmitSubcategory(values);
    },
  });

  const handleSubmitCategory = (values) => {
    setLoading(true);
    dispatch(categoryAdd({ name: values.name }));
  };
  const handleSubmitBrand = (values) => {
    setLoading(true);
    dispatch(brandAdd({ name: values.name }));
  };

  const handleSubmitSubcategory = (values) => {
    setLoading(true);
    const categoryIds = values.category;
    dispatch(subcategoryAdd({ name: values.name, category: categoryIds }));
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllSubcategory());
  }, [dispatch]);
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
                    <b>Add category</b>
                  </h2>
                </div>
                <form
                  className="mt-3 article_form form-container"
                  onSubmit={formikCategory.handleSubmit}
                >
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="name"
                      label="Enter a category"
                      variant="outlined"
                      {...formikCategory.getFieldProps("name")}
                      {...errorHelper(formikCategory, "name")}
                    />
                  </div>
                  <Button variant="contained" color="primary" type="submit">
                    Add category
                  </Button>
                </form>

                <div className="title">
                  <h2>
                    <b>Add subcategories</b>
                  </h2>
                </div>
                <form
                  className="mt-3 article_form form-container"
                  onSubmit={formikSubcategory.handleSubmit}
                >
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="name"
                      label="Enter a subcategory"
                      variant="outlined"
                      {...formikSubcategory.getFieldProps("name")}
                      {...errorHelper(formikSubcategory, "name")}
                    />
                  </div>
                  <div className="form-group">
                    <FormControl variant="outlined">
                      <h5>Select a category</h5>
                      <Select
                        name="category"
                        multiple
                        {...formikSubcategory.getFieldProps("category")}
                        error={
                          formikSubcategory.errors.category &&
                          formikSubcategory.touched.category
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
                      {formikSubcategory.errors.category &&
                      formikSubcategory.touched.category ? (
                        <FormHelperText error={true}>
                          {formikSubcategory.errors.category}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>
                  <Button variant="contained" color="primary" type="submit">
                    Add subcategory
                  </Button>
                </form>
                <div className="title">
                  <h2>
                    <b>Add brand</b>
                  </h2>
                </div>
                <form
                  className="mt-3 article_form form-container"
                  onSubmit={formikBrand.handleSubmit}
                >
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="name"
                      label="Enter a brand"
                      variant="outlined"
                      {...formikBrand.getFieldProps("name")}
                      {...errorHelper(formikBrand, "name")}
                    />
                  </div>
                  <Button variant="contained" color="primary" type="submit">
                    Add brand
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

export default AddCategory;
