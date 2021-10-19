import * as yup from "yup";

export const schemaSignIn = yup
  .object({
    username: yup.string().required("error-username-required"),
    password: yup
      .string()
      .required("error-pass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      ),
  })
  .required();

export const schemaIssueAccountManager = yup
  .object({
    username: yup.string().required("error-username-required"),
    fullname: yup.string().required("error-fullname-required"),
    password: yup
      .string()
      .required("error-pass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "error-confirm-pass"),
  })
  .required();

export const schemaIssueAccountAdmin = yup
  .object({
    email: yup
      .string()
      .required("error-email-required")
      .email("error-email-valid"),
    username: yup.string().required("error-username-required"),
    fullname: yup.string().required("error-fullname-required"),
    password: yup
      .string()
      .required("error-pass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "error-confirm-pass"),
  })
  .required();

export const schemaChangePass = yup
  .object({
    currentPassword: yup
      .string()
      .required("error-currentPass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      ),
    password: yup
      .string()
      .required("error-newPass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      )
      .notOneOf(
        [yup.ref("currentPassword"), null],
        "error-newPassSameCurrentPass"
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "error-confirm-pass"),
  })
  .required();

export const schemaUpdateProfile = yup
  .object({
    fullname: yup.string().required("error-fullname"),
    email: yup
      .string()
      .required("error-email-required")
      .email("error-email-valid"),
    phone: yup
      .string()
      .required("error-phone-required")
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "error-phone-pattern"),
  })
  .required();
