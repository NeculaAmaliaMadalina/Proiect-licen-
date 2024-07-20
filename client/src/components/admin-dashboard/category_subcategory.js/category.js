import React, { useEffect, useReducer, useState } from "react";
import AdminLayout from "../admin_navigation/admin_layout";
import CategoryTable from "./category_table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryByPaginate,
  categoryRemove,
} from "../../../store/actions/category.action";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../../utils/tools";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const defaultValues = {
  keywords: "",
  category: [],
  page: 1,
};

const AdminCategory = (props) => {
  const [removeModal, setRemoveModal] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  const category = useSelector((state) => state.category);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValues, setSearchValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );

  const goToPage = (page) => {
    setSearchValues({ page: page });
  };

  const goToEdit = (id) => {
    navigate(`/admin_dashboard/admin_category/edit_category/${id}`);
  };

  const handleClose = () => {
    setRemoveModal(false);
  };
  const handleModal = (id) => {
    setToRemove(id);
    setRemoveModal(true);
  };
  const handleRemove = () => {
    dispatch(categoryRemove(toRemove));
  };
  useEffect(() => {
    console.log(searchValues);
    dispatch(categoryByPaginate(searchValues));
  }, [dispatch, searchValues, notifications]);

  useEffect(() => {
    handleClose();
    setRemoveModal(null);
    if (notifications && notifications.removeArticle) {
      dispatch(categoryByPaginate(searchValues));
    }
  }, [dispatch, notifications, searchValues]);

  const resetSearch = () => {
    setSearchValues(defaultValues);
  };

  const formik = useFormik({
    initialValues: { keywords: "" },
    validationSchema: Yup.object({
      keywords: Yup.string()
        .min(2, "You need minim 2 charater")
        .max(50, "50 is maximum"),
    }),
    onSubmit: (values, { resetForm }) => {
      setSearchValues({ keywords: values.keywords, category: [], page: 1 });
      resetForm();
    },
  });

  return (
    <AdminLayout title="Products">
      <div className="content-container">
        <div className="products_table">
          <div>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <TextField
                style={{ width: "100%" }}
                name="keywords"
                label="Search..."
                {...formik.getFieldProps("keywords")}
                {...errorHelper(formik, "keywords")}
              />
            </form>
            <Button onClick={() => resetSearch()}>Reset search</Button>
          </div>
          <hr />
          <CategoryTable
            removeModal={removeModal}
            category={category.byPaginate}
            prev={(page) => goToPage(page)}
            next={(page) => goToPage(page)}
            goToEdit={(id) => goToEdit(id)}
            handleClose={() => handleClose()}
            handleModal={(id) => handleModal(id)}
            handleRemove={() => handleRemove()}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategory;
