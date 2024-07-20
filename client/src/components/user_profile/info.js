import React from "react";
import ProfileLayout from "../../hoc/user_profile";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../utils/tools";
import ChangeEmail from "./changeEmail";

import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import { userUpdateProfile } from "../../store/actions/user.actions";

const UserInfo = ({ users }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: users.data.firstname,
      lastname: users.data.lastname,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(3, "Minim 3 caractere")
        .max(30, "Maxim 30 de caractere")
        .required("Scuze, trebuie sa introduci un nume"),
      lastname: Yup.string()
        .min(3, "Minim 3 caractere")
        .max(30, "Maxim 30 de caractere")
        .required("Scuze, trebuie sa introduci un prenume"),
    }),
    onSubmit: (values) => {
      dispatch(userUpdateProfile(values));
    },
  });

  return (
    <ProfileLayout title="Actualizează informațiile">
      <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="firstname"
            label="Introdu numele"
            variant="outlined"
            {...formik.getFieldProps("firstname")}
            {...errorHelper(formik, "firstname")}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="lastname"
            label="Introdu prenumele"
            variant="outlined"
            {...formik.getFieldProps("lastname")}
            {...errorHelper(formik, "lastname")}
          />
        </div>
        <Button
          className="mb-3"
          variant="contained"
          color="primary"
          type="submit"
        >
          Editează
        </Button>
      </form>
      <hr />
      <div>
        <ChangeEmail users={users} />
      </div>
    </ProfileLayout>
  );
};

export default UserInfo;
