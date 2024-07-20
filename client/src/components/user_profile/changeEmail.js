import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userChangeEmail } from "../../store/actions/user.actions";

import { errorHelper } from "../../utils/tools";
import Loader from "../../utils/loader";
import Modal from "react-bootstrap/Modal";

import { TextField, Button, Stepper, Step, StepLabel } from "@mui/material";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import ModalTitle from "react-bootstrap/esm/ModalTitle";
import ModalBody from "react-bootstrap/esm/ModalBody";

const ChangeEmail = ({ users }) => {
  const [loading, setLoading] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Introdu emailul curent", "Introdu noul email", "Ești sigur?"];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { email: "", newemail: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Acest câmp este obligatoriu")
        .email("Introduceți un email valid")
        .test("match", "Please check your email", (email) => {
          return email === users.data.email;
        }),
      newemail: Yup.string()
        .required("Acest câmp este obligatoriu")
        .email("Introduceți un email valid")
        .test("match", "Please check your email", (newemail) => {
          return newemail !== users.data.email;
        }),
    }),
    onSubmit: (values) => {
      setLoading(true);
      dispatch(userChangeEmail(values));
    },
  });

  const closeModal = () => setEmailModal(false);
  const openModal = () => setEmailModal(true);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const nextButton = () => (
    <Button
      className="mt-3"
      variant="contained"
      color="primary"
      onClick={handleNext}
    >
      Înainte
    </Button>
  );
  const backButton = () => (
    <Button className="mt-3 ml-2" variant="contained" onClick={handleBack}>
      Înapoi
    </Button>
  );

  useEffect(() => {
    if (notifications && notifications.success) {
      closeModal();
    }
    setLoading(false);
  }, [notifications]);

  return (
    <>
      <form className="mt-3 article_form">
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="emailstatic"
            variant="outlined"
            value={users.data.email}
            disabled
          />
        </div>
        <Button
          className="mb-3"
          variant="contained"
          color="primary"
          onClick={openModal}
        >
          Editează
        </Button>
      </form>
      <Modal size="lg" centered show={emailModal} onHide={closeModal}>
        <ModalHeader closeButton>
          <ModalTitle className="modal-title">Actualizează emailul</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
            {activeStep === 0 ? (
              <div className="form-group">
                <TextField
                  style={{ width: "100%" }}
                  name="email"
                  label="Enter your current email"
                  variant="outlined"
                  {...formik.getFieldProps("email")}
                  {...errorHelper(formik, "email")}
                />
                {formik.values.email && !formik.errors.email
                  ? nextButton()
                  : null}
              </div>
            ) : null}
            {activeStep === 1 ? (
              <div className="form-group">
                <TextField
                  style={{ width: "100%" }}
                  name="newemail"
                  label="Enter your new email"
                  variant="outlined"
                  {...formik.getFieldProps("newemail")}
                  {...errorHelper(formik, "newemail")}
                />
                {formik.values.newemail && !formik.errors.newemail
                  ? nextButton()
                  : null}
                {backButton()}
              </div>
            ) : null}
            {activeStep === 2 ? (
              <div className="form-group">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <Button
                      className="mt-3"
                      variant="contained"
                      color="primary"
                      onClick={formik.submitForm}
                    >
                      Editează email
                    </Button>
                    {backButton()}
                  </>
                )}
              </div>
            ) : null}
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ChangeEmail;
