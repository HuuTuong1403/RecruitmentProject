import * as yup from 'yup'

export const schemaSignIn = yup
  .object({
    username: yup.string().required('error-username-required'),
    password: yup
      .string()
      .required('error-pass-required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'error-pass-pattern'
      ),
  })
  .required()

export const schemaSendMail = yup
  .object({
    email: yup.string().required('error-email-required').email('error-email-valid'),
  })
  .required()

export const schemaChangePassForgot = yup
  .object({
    password: yup
      .string()
      .required('error-pass-required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'error-pass-pattern'
      ),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'error-confirm-pass'),
  })
  .required()

export const schemaSignUpEmployer = yup
  .object({
    username: yup.string().required('error-username-required'),
    password: yup
      .string()
      .required('error-pass-required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'error-pass-pattern'
      ),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'error-confirm-pass'),
  })
  .required()

export const schemaChangePass = yup
  .object({
    currentPassword: yup
      .string()
      .required('error-currentPass-required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'error-pass-pattern'
      ),
    password: yup
      .string()
      .required('error-newPass-required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'error-pass-pattern'
      )
      .notOneOf([yup.ref('currentPassword'), null], 'error-newPassSameCurrentPass'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'error-confirm-pass'),
  })
  .required()

export const schemaUpdateProfile = yup
  .object({
    fullname: yup.string().required('error-fullname'),
    email: yup.string().required('error-email-required').email('error-email-valid'),
    phone: yup
      .string()
      .required('error-phone-required')
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'error-phone-pattern'),
  })
  .required()

export const schemaCreateService = yup
  .object({
    serviceName: yup.string().required('error-serviceName'),
    description: yup.string().required('error-serviceDesc'),
    price: yup.number().typeError('error-servicePriceNum').required('error-servicePrice'),
    tagName: yup.string().required('error-tagName'),
    tagValue: yup.string().required('error-tagValue'),
  })
  .required()

export const schemaCreatePackageService = yup
  .object({
    servicePackageCode: yup.string().required('error-servicePackageCode'),
    packageName: yup.string().required('error-packageName'),
    postType: yup
      .string()
      .notOneOf(['Chọn loại bài đăng...', 'Choose post type...'], 'error-select-postType')
      .required('error-postType'),
    services: yup.array().required('error-service').nullable(true),
    postQuantity: yup
      .number()
      .typeError('error-postQuantityNum')
      .required('error-postQuantity')
      .test(
        'error-postQuantityGreaterThan0',
        'Post quantity must greater than 0',
        (val) => val > 0
      ),
    description: yup.string().required('error-packageDescription'),
    VND: yup.number().typeError('error-packagePriceNum').required('error-packagePrice'),
  })
  .required()
