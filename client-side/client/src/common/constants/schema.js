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

export const schemaSignInEmployer = yup
  .object({
    username: yup.string().required("error-username-emp-required"),
    password: yup
      .string()
      .required("error-pass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "error-pass-pattern"
      ),
  })
  .required();

export const schemaSignUpStep1 = yup
  .object({
    email: yup
      .string()
      .required("error-email-required")
      .email("error-email-valid"),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref("email"), null], "error-confirm-email"),
    phone: yup
      .string()
      .required("error-phone-required")
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "error-phone-pattern"),
  })
  .required();

export const schemaSignUpStep2 = yup
  .object({
    companyName: yup.string().required("Tên công ty không được trống"),
    scale: yup
      .string()
      .required("Vui lòng chọn số nhân viên doanh nghiệp của bạn"),
    websiteCompany: yup.string().required("Website công ty không được trống"),
    province: yup.string().required("Vui lòng chọn tỉnh/thành phố"),
    district: yup.string().required("Vui lòng chọn quận/huyện"),
    ward: yup.string().required("Vui lòng chọn phường/xã"),
    address: yup.string().required("Địa chỉ không được trống"),
  })
  .required();

export const schemaSignUpStep3 = yup
  .object({
    TIN: yup.string().required("Vui lòng nhập mã số thuế"),
    Type: yup.string().required("Vui lòng chọn loại doanh nghiệp"),
  })
  .required();
