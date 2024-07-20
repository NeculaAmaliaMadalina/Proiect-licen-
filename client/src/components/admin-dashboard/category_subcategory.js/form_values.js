import * as Yup from "yup";

export const formValues = {
  _id: "",
  name: "",
};

export const getValuesToEdit = (category) => {
  return {
    _id: category._id,
    name: category.name,
  };
};

export const validation = () =>
  Yup.object({
    _id: Yup.string().required("Sorry, the id of category is required"),
    name: Yup.string().required("Sorry, the name of category is required"),
  });
