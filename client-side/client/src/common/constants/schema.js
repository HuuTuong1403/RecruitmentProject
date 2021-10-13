import * as yup from "yup";

export const schemaSignInUser = yup
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "error-confirm-pass"),
  })
  .required();

export const schemaChangePassForgot = yup
  .object({
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
    companyName: yup.string().required("error-companyName-required"),
    scale: yup.string().required("error-select-scale"),
    websiteCompany: yup.string().required("error-website-required"),
    province: yup.string().required("error-select-province"),
    district: yup.string().required("error-select-district"),
    ward: yup.string().required("error-select-ward"),
    address: yup.string().required("error-address"),
  })
  .required();

export const schemaSignUpStep3 = yup
  .object({
    TIN: yup.string().required("error-taxCode"),
    Type: yup.string().required("error-companyType"),
  })
  .required();

export const schemaChangePassSignIn = yup
  .object({
    oldPassword: yup
      .string()
      .required("error-currentPass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      ),
    newPassword: yup
      .string()
      .required("error-newPass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      )
      .notOneOf([yup.ref("oldPassword"), null], "error-newPassSameCurrentPass"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "error-confirm-pass"),
  })
  .required();

export const schemaChangePassEmployer = yup
  .object({
    oldPassword: yup
      .string()
      .required("error-currentPass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      ),
    newPassword: yup
      .string()
      .required("error-newPass-required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "error-pass-pattern"
      )
      .notOneOf([yup.ref("oldPassword"), null], "error-newPassSameCurrentPass"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "error-confirm-pass"),
  })
  .required();

export const schemaPostJobEmployer = yup.object({
  jobTitle: yup.string().required("error-jobTitle-postJob"),
  address: yup.string().required("error-workplace-postJob"),
  min: yup.string().required("error-minSalary-postJob"),
  max: yup.string().required("error-maxSalary-postJob"),
  description: yup.string().required("error-jobDescription-postJob"),
  requirements: yup.string().required("error-jobRequirement-postJob"),
  province: yup
    .string()
    .notOneOf(
      ["Chọn tỉnh/thành...", "Choose province..."],
      "error-select-province"
    ),
  district: yup
    .string()
    .notOneOf(
      ["Chọn quận/huyện...", "Choose district..."],
      "error-select-district"
    ),
  ward: yup
    .string()
    .notOneOf(["Chọn phường/xã...", "Choose ward..."], "error-select-ward"),
  level: yup
    .string()
    .notOneOf(["Chọn cấp bậc...", "Choose level..."], "error-select-level"),
  finishDate: yup.string().required("error-select-date-deadline"),
});
