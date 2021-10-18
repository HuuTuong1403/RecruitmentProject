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

export const schemaPostJobEmployer = yup.object({
  jobTitle: yup.string().required("error-jobTitle-postJob"),
  address: yup.string().required("error-workplace-postJob"),
  min: yup
    .string()
    .required("error-minSalary-postJob")
    .matches(/^\d+$/, "error-salary-number"),
  max: yup
    .string()
    .required("error-maxSalary-postJob")
    .matches(/^\d+$/, "error-salary-number")
    .notOneOf([yup.ref("min"), null], "error-salary-minEqualMax"),
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
  finishDate: yup.string().required("error-select-date-deadline").nullable(),
});

export const schemaUpdateProfileJobSeeker = yup.object({
  fullname: yup.string().required("error-fullname-signup"),
  phone: yup
    .string()
    .required("error-phone-required")
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "error-phone-pattern"),
  DOB: yup.string().required("error-select-dob").nullable(),
  city: yup
    .string()
    .required("error-select-province")
    .notOneOf(
      ["Chọn tỉnh/thành...", "Choose province..."],
      "error-select-province"
    ),
  district: yup
    .string()
    .required("error-select-district")
    .notOneOf(
      ["Chọn quận/huyện...", "Choose district..."],
      "error-select-district"
    ),
  ward: yup
    .string()
    .required("error-select-ward")
    .notOneOf(["Chọn phường/xã...", "Choose ward..."], "error-select-ward"),
  street: yup.string().required("error-address"),
});

export const schemaUpdateProfileEmployer = yup.object({
  companyName: yup.string().required("error-companyName-required"),
  companyWebsite: yup.string().required("error-website-required"),
  phone: yup
    .string()
    .required("error-phone-required")
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "error-phone-pattern"),
  TIN: yup.string().required("error-taxCode"),
  scale: yup.string().required("error-select-scale"),
  companyType: yup.string().required("error-companyType"),
  city: yup
    .string()
    .required("error-select-province")
    .notOneOf(
      ["Chọn tỉnh/thành...", "Choose province..."],
      "error-select-province"
    ),
  district: yup
    .string()
    .required("error-select-district")
    .notOneOf(
      ["Chọn quận/huyện...", "Choose district..."],
      "error-select-district"
    ),
  ward: yup
    .string()
    .required("error-select-ward")
    .notOneOf(["Chọn phường/xã...", "Choose ward..."], "error-select-ward"),
  street: yup.string().required("error-address"),
  description: yup.string().required("error-description-company"),
});
