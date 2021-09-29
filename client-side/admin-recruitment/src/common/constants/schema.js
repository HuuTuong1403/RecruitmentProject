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
    username: yup.string().required("error-username-required"),
    password: yup
      .string()
      .required("error-pass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "error-pass-pattern"
      ),
    rePassword: yup
      .string()
      .required("error-pass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "error-pass-pattern"
      ),
  })
  .required();
