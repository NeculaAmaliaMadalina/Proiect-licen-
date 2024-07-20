import * as Yup from "yup";

export const formValues = {
  name: "",
  description: "",
  price: "",
  brand: [],
  category: [],
  subcategory: [],
  size: "",
  color: "",
  available: "",
  shipping: false,
  images: [],
};

export const getValuesToEdit = (product) => {
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    brand: product.brand._id,
    category: product.category._id,
    subcategory: product.subcategory._id,
    size: product.size,
    color: product.color,
    available: product.available,
    shipping: product.shipping,
    images: product.images,
  };
};

export const validation = () =>
  Yup.object({
    name: Yup.string().required("Sorry, the name is required"),
    description: Yup.string().required("Sorry, the description is required"),
    price: Yup.number()
      .required("The price is required")
      .min(1, "Sorry, the minimum price is 1")
      .max(100000, "Sorry, the maximum price is 100000"),
    brand: Yup.string().required("Sorry, the brand is required"),
    category: Yup.string().required("Sorry, the category is required"),
    subcategory: Yup.string().required("Sorry, the subcategory is required"),

    size: Yup.string().required("Sorry, the size is required"),
    color: Yup.string().required("Sorry, the color is required"),
    available: Yup.number().required("Do we have stock?"),
    shipping: Yup.boolean().required("Do we offer shipping?"),
  });
