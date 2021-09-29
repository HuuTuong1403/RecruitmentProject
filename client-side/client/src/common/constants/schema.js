import * as yup from "yup";

export const schemaSignInUser = yup
  .object({
    username: yup.string().required("error-username-required"),
    password: yup
      .string()
      .required("error-pass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "error-pass-pattern"
      ),
  })
  .required();

export const schemaSignUpUser = yup
  .object({
    fullname: yup.string().required("error-fullname-signup"),
    username: yup.string().required("error-username-signup"),
    email: yup
      .string()
      .required("error-email-required")
      .email("error-email-valid"),
    phone: yup
      .string()
      .required("error-phone-required")
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "error-phone-pattern"),
    password: yup
      .string()
      .required("error-pass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "error-pass-pattern"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "error-confirm-pass"),
  })
  .required();

export const schemaChangePass = yup
  .object({
    password: yup
      .string()
      .required("error-pass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "error-pass-pattern"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "error-confirm-pass"),
  })
  .required();

export const schemaSendMail = yup
  .object({
    email: yup
      .string()
      .required("error-email-required")
      .email("error-email-valid"),
  })
  .required();
