import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../utils/tools";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { keywords: "" },
    validationSchema: Yup.object({
      keywords: Yup.string()
        .min(3, "You need minim 3 characters")
        .max(200, "Sorry, you enter too much character"),
    }),
    onSubmit: (values, { resetForm }) => {
      navigate(`/products_shop?keywords=${values.keywords}`);
      resetForm();
    },
  });
  return (
    <div className="container">
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            style={{
              width: "100%",
            }}
            placeholder="Caută..."
            name="keywords"
            variant="outlined"
            {...formik.getFieldProps("keywords")}
            {...errorHelper(formik, "keywords")}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
