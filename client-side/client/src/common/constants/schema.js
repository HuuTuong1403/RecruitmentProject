import * as yup from 'yup'

export const schemaSignInUser = yup
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

export const schemaSignUpUser = yup
  .object({
    fullname: yup.string().required('error-fullname-signup'),
    username: yup.string().required('error-username-signup'),
    email: yup.string().required('error-email-required').email('error-email-valid'),
    phone: yup
      .string()
      .required('error-phone-required')
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'error-phone-pattern'),
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

export const schemaSendMail = yup
  .object({
    email: yup.string().required('error-email-required').email('error-email-valid'),
  })
  .required()

export const schemaSignInEmployer = yup
  .object({
    username: yup.string().required('error-username-emp-required'),
    password: yup
      .string()
      .required('error-pass-required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'error-pass-pattern'
      ),
  })
  .required()

export const schemaSignUpStep1 = yup
  .object({
    email: yup.string().required('error-email-required').email('error-email-valid'),
    confirmEmail: yup.string().oneOf([yup.ref('email'), null], 'error-confirm-email'),
    phone: yup
      .string()
      .required('error-phone-required')
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'error-phone-pattern'),
  })
  .required()

export const schemaSignUpStep2 = yup
  .object({
    companyName: yup.string().required('error-companyName-required'),
    scale: yup.string().required('error-select-scale'),
    websiteCompany: yup.string().required('error-website-required'),
    province: yup.string().required('error-select-province'),
    district: yup.string().required('error-select-district'),
    ward: yup.string().required('error-select-ward'),
    address: yup.string().required('error-address'),
  })
  .required()

export const schemaSignUpStep3 = yup
  .object({
    TIN: yup.string().required('error-taxCode'),
    Type: yup.string().required('error-companyType'),
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

export const schemaPostJobEmployer = yup.object({
  jobTitle: yup.string().required('error-jobTitle-postJob'),
  street: yup.string().required('error-workplace-postJob'),
  min: yup.string().required('error-minSalary-postJob').matches(/^\d+$/, 'error-salary-number'),
  max: yup
    .string()
    .required('error-maxSalary-postJob')
    .matches(/^\d+$/, 'error-salary-number')
    .notOneOf([yup.ref('min'), null], 'error-salary-minEqualMax'),
  description: yup.string().required('error-jobDescription-postJob'),
  requirements: yup.string().required('error-jobRequirement-postJob'),
  benefits: yup.string().required('error-jobBenefits-postJob'),
  city: yup
    .string()
    .notOneOf(['Chọn tỉnh/thành...', 'Choose province...'], 'error-select-province'),
  district: yup
    .string()
    .notOneOf(['Chọn quận/huyện...', 'Choose district...', ''], 'error-select-district'),
  ward: yup.string().notOneOf(['Chọn phường/xã...', 'Choose ward...', ''], 'error-select-ward'),
  level: yup.string().notOneOf(['Chọn cấp bậc...', 'Choose level...'], 'error-select-level'),
  position: yup
    .string()
    .notOneOf(['Chọn vị trí...', 'Choose position...'], 'error-select-position'),
  workingTimeStart: yup
    .string()
    .notOneOf(['Chọn thời gian làm việc...', 'Choose working time...'], 'error-select-workingTime'),
  workingTimeFinish: yup
    .string()
    .notOneOf(['Chọn thời gian làm việc...', 'Choose working time...'], 'error-select-workingTime'),
  finishDate: yup.string().required('error-select-date-deadline').nullable(),
  servicePackage: yup.string().notRequired(),
})

export const schemaApplyJob = yup.object({
  fullName: yup.string().required('error-fullname-signup'),
  phone: yup
    .string()
    .required('error-phone-required')
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'error-phone-pattern'),
})

export const schemaUpdateProfileJobSeeker = yup.object({
  fullname: yup.string().required('error-fullname-signup'),
  phone: yup
    .string()
    .required('error-phone-required')
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'error-phone-pattern'),
  DOB: yup.string().required('error-select-dob').nullable(),
  city: yup
    .string()
    .required('error-select-province')
    .notOneOf(['Chọn tỉnh/thành...', 'Choose province...'], 'error-select-province'),
  district: yup
    .string()
    .required('error-select-district')
    .notOneOf(['Chọn quận/huyện...', 'Choose district...'], 'error-select-district'),
  ward: yup
    .string()
    .required('error-select-ward')
    .notOneOf(['Chọn phường/xã...', 'Choose ward...'], 'error-select-ward'),
  street: yup.string().required('error-address'),
})

export const schemaUpdateProfileEmployer = yup.object({
  companyName: yup.string().required('error-companyName-required'),
  companyWebsite: yup.string().required('error-website-required'),
  phone: yup
    .string()
    .required('error-phone-required')
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'error-phone-pattern'),
  TIN: yup.string().required('error-taxCode'),
  scale: yup.string().required('error-select-scale'),
  companyType: yup.string().required('error-companyType'),
  city: yup
    .string()
    .required('error-select-province')
    .notOneOf(['Chọn tỉnh/thành...', 'Choose province...'], 'error-select-province'),
  district: yup
    .string()
    .required('error-select-district')
    .notOneOf(['Chọn quận/huyện...', 'Choose district...'], 'error-select-district'),
  ward: yup
    .string()
    .required('error-select-ward')
    .notOneOf(['Chọn phường/xã...', 'Choose ward...'], 'error-select-ward'),
  street: yup.string().required('error-address'),
  description: yup.string().required('error-description-company'),
})

export const schemaWriteReview = yup.object({
  rating: yup
    .number()
    .required('error-rating-review')
    .test('Is positive?', 'error-rating-review', (value) => value > 0),
  title: yup.string().required('error-title-review'),
  ot: yup
    .number()
    .required('error-ot-review')
    .test('Is positive?', 'error-ot-review', (value) => value > 0),
  interesting: yup.string().required('error-textArea-review'),
  improvement: yup.string().required('error-textArea-review'),
})

export const schemaPostEvent = yup.object({
  eventName: yup.string().required('error-eventName-event'),
  topic: yup.string().required('error-topic-event'),
  eventOrganizer: yup.string().required('error-eventOrganizer-event'),
  location: yup.string().required('error-location-event'),
  street: yup.string().required('error-workplace-postJob'),
  city: yup
    .string()
    .required('error-select-province')
    .notOneOf(['Chọn tỉnh/thành...', 'Choose province...'], 'error-select-province'),
  district: yup
    .string()
    .required('error-select-district')
    .notOneOf(['Chọn quận/huyện...', 'Choose district...'], 'error-select-district'),
  ward: yup
    .string()
    .required('error-select-ward')
    .notOneOf(['Chọn phường/xã...', 'Choose ward...'], 'error-select-ward'),
  startTime: yup.string().required('error-startTime-event').nullable(),
  endTime: yup.string().required('error-endTime-event').nullable(),
  briefDescription: yup.string().required('error-briefDescription-event'),
  eventContent: yup.string().required('error-eventContent-event'),
  participantMax: yup
    .string()
    .required('error-participantMax-event')
    .matches(/^\d+$/, 'error-participantMax-number'),
})

export const schemaJoinEvent = yup.object({
  fullName: yup.string().required('error-fullname-signup'),
  phone: yup
    .string()
    .required('error-phone-required')
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'error-phone-pattern'),
  street: yup.string().required('error-address'),
  city: yup
    .string()
    .required('error-select-province')
    .notOneOf(['Chọn tỉnh/thành...', 'Choose province...'], 'error-select-province'),
  district: yup
    .string()
    .required('error-select-district')
    .notOneOf(['Chọn quận/huyện...', 'Choose district...'], 'error-select-district'),
  ward: yup
    .string()
    .required('error-select-ward')
    .notOneOf(['Chọn phường/xã...', 'Choose ward...'], 'error-select-ward'),
})

export const schemaCreateQuestion = yup.object({
  questionContent: yup.string().required('error-questionContent'),
  questionType: yup
    .string()
    .required('error-questionType')
    .notOneOf(['Chọn loại câu hỏi...', 'Choose question type...'], 'error-questionType'),
  level: yup
    .string()
    .required('error-questionLevel')
    .notOneOf(['Chọn độ khó câu hỏi...', 'Choose question level...'], 'error-questionLevel'),
  explanation: yup.string().required('error-questionExplanation'),
  tips: yup.string(),
  score: yup
    .number()
    .typeError('error-questionScore')
    .test('Is positive?', 'error-numberPositive', (value) => value >= 0),
  duration: yup
    .number()
    .typeError('error-questionDuration')
    .test('Is positive?', 'error-numberPositive', (value) => value >= 0),
})
