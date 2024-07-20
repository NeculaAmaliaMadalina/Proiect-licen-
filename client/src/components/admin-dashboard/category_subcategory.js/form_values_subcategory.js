import * as Yup from "yup";

export const formValues = {
  _id: "",
  name: "",
  category: [],
};

export const getValuesToEdit = (subcategory) => {
  return {
    _id: subcategory._id,
    name: subcategory.name,
    category: subcategory.category,
  };
};

export const validation = () =>
  Yup.object({
    _id: Yup.string().required("Sorry, the id of category is required"),
    name: Yup.string().required("Sorry, the name of category is required"),
    category: Yup.array().required("Sorry, at least one category is required"),
  });
