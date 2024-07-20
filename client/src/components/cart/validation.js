import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Numele este obligatoriu"),
  email: Yup.string()
    .email("Invalid email")
    .required("Emailul este obligatoriu"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Numărul de telefon este invalid")
    .required("Numărul este obligatoriu"),
  address: Yup.string().required("Adresa este obligatorie"),
  country: Yup.string().required("Țara este obligatorie"),
  city: Yup.string().required("Localitatea este obligatorie"),
  method: Yup.string().required("Metoda de plată este obligatorie"),
  number: Yup.string().when("method", {
    is: "card",
    then: () =>
      Yup.string()
        .matches(/^\d{16}$/, {
          message: "Numărul cardului trebuie să aibă 16 cifre",
          excludeEmptyString: true,
        })
        .required("Numărul cardului este obligatoriu"),
  }),
  nameOnCard: Yup.string().when("method", {
    is: "card",
    then: () =>
      Yup.string()
        .required("Numele este obligatoriu")
        .min(3, "Sunt obligatorii cel puțin 3 caractere."),
  }),
  expiry: Yup.string().when("method", {
    is: "card",
    then: () =>
      Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
          message: "Trebuie să introduceți data în format LL/AA",
          excludeEmptyString: true,
        })
        .required("Data este obligatorie"),
  }),
  cvc: Yup.string().when("method", {
    is: "card",
    then: () =>
      Yup.string()
        .matches(/^\d{3,4}$/, {
          message: "CVC trebuie să aibă 3 sau 4 cifre",
          excludeEmptyString: true,
        })
        .required("CVC este obligatoriu"),
  }),
});

export default validationSchema;
