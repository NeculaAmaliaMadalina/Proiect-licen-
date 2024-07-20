import * as Yup from "yup";

export const formValues = {
  _id: "",
  name: "",
};

export const getValuesToEdit = (brands) => {
  return {
    _id: brands._id,
    name: brands.name,
  };
};

export const validation = () =>
  Yup.object({
    _id: Yup.string().required("Sorry, the id of brand is required"),
    name: Yup.string().required("Sorry, the name of brand is required"),
  });
