import * as Yup from "yup";

export const formValues = {
  code: "",
  value: "",
  type: "",
  minimumAmount: "",
  validFrom: "",
  validUntil: "",
};

export const getValuesToEdit = (discount) => {
  return {
    code: discount.code,
    value: discount.value,
    type: discount.type,
    minimumAmount: discount.minimumAmount,
    validFrom: discount.validFrom,
    validUntil: discount.validUntil,
  };
};

export const validation = () =>
  Yup.object({
    code: Yup.string().required("Sorry, code is required"),
    value: Yup.number().required("Sorry, the value is required"),
    type: Yup.string()
      .required("Type is required")
      .oneOf(
        ["fixed", "percentage"],
        "Type must be either 'fixed' or 'percentage'"
      ),
    minimumAmount: Yup.number().required("Minimum amount is required"),
    validFrom: Yup.date()
      .required("Valid from is required")
      .min(new Date(), "Valid from date must be in the future"),
    validUntil: Yup.date()
      .required("Valid until is required")
      .min(
        Yup.ref("validFrom"),
        "Valid until date must be after valid from date"
      ),
  });
