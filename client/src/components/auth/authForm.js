import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../utils/loader";
import { errorHelper } from "../../utils/tools";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import {
  userRegister,
  userSignIn,
  forgotPassword,
} from "../../store/actions/user.actions";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";

const AuthForm = (props) => {
  const notifications = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values) => {
    if (props.formType) {
      dispatch(userRegister(values));
    } else {
      dispatch(userSignIn(values));
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, the email is required")
        .email("This is an invalid email"),
      password: Yup.string().required("Sorry, the password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      handleSubmit(values);
      try {
        const response = await axios.post(`/api/auth/signin`, values);
        const { user } = response.data;
        if (user && user.role === "user") {
          navigate(`/profile`);
        } else if (user && user.role === "admin") {
          navigate(`/admin_dashboard`);
        } else {
          navigate(`/`);
        }
        console.log(user.role);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  const handleCloseForm = () => {
    setIsForgotPassword(false);
  };

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(forgotPassword(formik.values));
    } catch (error) {
      console.error("Error submitting forgot password form:", error);
    }
  };

  return (
    <>
      <div className="auth_container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <TextField
                  style={{ width: "100%" }}
                  name="email"
                  label="Enter your email"
                  variant="outlined"
                  {...formik.getFieldProps("email")}
                  {...errorHelper(formik, "email")}
                />
              </div>
              <div className="form-group">
                <TextField
                  className="password-input"
                  style={{ width: "100%" }}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                  {...errorHelper(formik, "password")}
                />
                <IconButton
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </div>
              <div className="form-group">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="small"
                >
                  {props.formType ? "Înregistrează-te" : "Intra în cont "}
                </Button>
                {!props.formType && !isForgotPassword && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    size="small"
                    onClick={handleForgotPasswordClick}
                  >
                    Am uitat parola
                  </Button>
                )}
              </div>
            </form>
            {isForgotPassword && !props.formType && (
              <form className="mt-3" onSubmit={handleForgotPasswordSubmit}>
                <div className="form-group">
                  <TextField
                    style={{ width: "100%" }}
                    name="email"
                    label="Enter your email"
                    variant="outlined"
                    {...formik.getFieldProps("email")}
                    {...errorHelper(formik, "email")}
                  />
                </div>
                <div className="form-group">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                  >
                    Trimite email
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    size="small"
                    onClick={handleCloseForm}
                  >
                    Închide
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AuthForm;
