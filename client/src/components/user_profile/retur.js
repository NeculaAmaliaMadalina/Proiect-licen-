import React from "react";
import ProfileLayout from "../../hoc/user_profile";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorHelper } from "../../utils/tools";

import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import { returAdd } from "../../store/actions/retur.action";

const AddRetur = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.data._id);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: userId,
      orderId: "",
      bankAccount: "",
      product: "",
      returnReason: "",
      observations: "",
    },
    validationSchema: Yup.object({
      orderId: Yup.string().required("ID Comandă este obligatoriu"),
      bankAccount: Yup.string()
        .required("Cont Bancar este obligatoriu")
        .matches(/^RO.{22}$/),
      product: Yup.string().required("ID Produs este obligatoriu"),
      returnReason: Yup.string()
        .required("Motivul Returului este obligatoriu")
        .min(10, "Motivul Returului trebuie să aibă cel puțin 10 caractere"),
      observations: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(returAdd(values));
      resetForm();
    },
  });

  return (
    <ProfileLayout title="Adaugă retur">
      <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="orderId"
            label="Introdu numărul comenzii"
            variant="outlined"
            {...formik.getFieldProps("orderId")}
            {...errorHelper(formik, "orderId")}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="bankAccount"
            label="Introdu contul bancar"
            variant="outlined"
            {...formik.getFieldProps("bankAccount")}
            {...errorHelper(formik, "bankAccount")}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="product"
            label="Introdu id-ul produsului (îl găsești în factură)"
            variant="outlined"
            {...formik.getFieldProps("product")}
            {...errorHelper(formik, "product")}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="returnReason"
            label="EIntrodu motivul returului"
            variant="outlined"
            rows={2}
            {...formik.getFieldProps("returnReason")}
            {...errorHelper(formik, "returnReason")}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="observations"
            label="Observații"
            variant="outlined"
            rows={2}
            {...formik.getFieldProps("observations")}
            {...errorHelper(formik, "observations")}
          />
        </div>
        <Button
          className="mb-3"
          variant="contained"
          color="primary"
          type="submit"
        >
          Trimite retur
        </Button>
      </form>
    </ProfileLayout>
  );
};

export default AddRetur;
