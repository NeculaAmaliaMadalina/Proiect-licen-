import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getTokenCookie } from "../../../utils/tools";
import Loader from "../../../utils/loader";

const PicUpload = ({ picValue }) => {
  const [loading, setLoading] = useState(false);

  const formikImage = useFormik({
    initialValues: { pic: "" },
    validationSchema: Yup.object({
      pic: Yup.mixed().required("A file is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", values.pic);

      axios
        .post(`/api/products/add_product/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getTokenCookie()}`,
          },
        })
        .then((response) => {
          picValue(response.data);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={formikImage.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="file"
              id="file"
              name="pic"
              onChange={(event) => {
                formikImage.setFieldValue("pic", event.currentTarget.files[0]);
              }}
            />
            {formikImage.errors.pic && formikImage.touched.pic ? (
              <div>{formikImage.errors.pic}</div>
            ) : null}
          </Form.Group>
          <Button variant="secondary" type="sumbit">
            Add Image
          </Button>
        </Form>
      )}
    </>
  );
};

export default PicUpload;
