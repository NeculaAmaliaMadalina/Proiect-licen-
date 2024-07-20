import * as Yup from "yup";

export const formValues = {
  userId: "",
  orderId: "",
  bankAccount: "",
  product: "",
  returnReason: "",
  observations: "",
};

export const getValuesToEdit = (retur) => {
  return {
    userId: retur.userId._id.toString(),
    orderId: retur.orderId._id.toString(),
    bankAccount: retur.bankAccount,
    product: retur.product,
    returnReason: retur.returnReason,
    observations: retur.observations,
  };
};

export const validation = () =>
  Yup.object({
    userId: Yup.string().required("Sorry, the user id is required"),
    orderId: Yup.string().required("Sorry, the description is required"),
    bankAccount: Yup.string()
      .required("Cont Bancar este obligatoriu")
      .matches(/^RO.{22}$/),
    product: Yup.string().required("ID Produs este obligatoriu"),
    returnReason: Yup.string()
      .required("Motivul Returului este obligatoriu")
      .min(10, "Motivul Returului trebuie să aibă cel puțin 10 caractere"),
    observations: Yup.string(),
  });
