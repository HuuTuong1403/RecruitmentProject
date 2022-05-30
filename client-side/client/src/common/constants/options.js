export const scaleOptions = [
  { value: '', label: 'phd-select-scale' },
  { value: 'Ít hơn 10', label: '< 10' },
  { value: '10 - 20', label: '10 - 20' },
  { value: '25 - 99', label: '25 - 99' },
  { value: '100 - 499', label: '100 - 499' },
  { value: '500 - 999', label: '500 - 999' },
  { value: '1.000 - 4.999', label: '1.000 - 4.999' },
  { value: '5.000 - 9.999', label: '5.000 - 9.999' },
  { value: '10.000 - 19.999', label: '10.000 - 19.999' },
  { value: '20.000 - 49.999', label: '20.000 - 49.999' },
  { value: 'Hơn 50.000', label: '> 50.000' },
]

export const companyTypeOptions = [
  { value: '', label: 'phd-companyType' },
  { value: 'Outsourcing', label: 'Outsourcing' },
  { value: 'Product', label: 'Product' },
]

export const questionLevelOptions = [
  { value: '', label: '' },
  { value: 'Easy', label: 'Easy' },
  { value: 'Middle', label: 'Middle' },
  { value: 'Difficult', label: 'Difficult' },
]

export const questionTypeOptions = [
  { value: '', label: '' },
  { value: 'Single', label: 'Single' },
  { value: 'Multi-choice', label: 'Multi-choice' },
]

export const dateCreatedAtOptions = [
  { value: 'Tất cả', label: 'all' },
  { value: '1', label: '1 day ago' },
  { value: '3', label: '3 days ago' },
  { value: '7', label: '1 week ago' },
  { value: '14', label: '2 weeks ago' },
  { value: '30', label: '1 month ago' },
]

export const levelOptions = [
  { value: 'Tất cả', label: 'all' },
  { value: 'Intern', label: 'Internship' },
  { value: 'Junior', label: 'Junior Developer' },
  { value: 'Senior', label: 'Senior Developer' },
  { value: 'Leader', label: 'Leader Developer' },
  { value: 'Mid-level', label: 'Mid-level Manager' },
  { value: 'Senior Leader', label: 'Senior Leader' },
]

export const positionOptions = [
  { value: 'Tất cả', label: 'all' },
  {
    value: 'Network Administrator',
    label: 'Network Administrator',
  },
  { value: 'Network Engineering', label: 'Network Engineering' },
  { value: 'Network Leader', label: 'Network Leader' },
  { value: 'Helpdesk Technician', label: 'Helpdesk Technician' },
  { value: 'PC Technician', label: 'PC Technician' },
  { value: 'SeviceDesk Leader', label: 'SeviceDesk Leader' },
  { value: 'Developer', label: 'Developer' },
  { value: 'Tester', label: 'Tester' },
  {
    value: 'Application Development Leader',
    label: 'Application Development Leader',
  },
  { value: 'Database Developer', label: 'Database Developer' },
  {
    value: 'Database Administrator',
    label: 'Database Administrator',
  },
  {
    value: 'Business Process Analyst',
    label: 'Business Process Analyst',
  },
  { value: 'IT Security Staff', label: 'IT Security Staff' },
  { value: 'IT Manager', label: 'IT Manager' },
  {
    value: 'Chief Information Officer',
    label: 'Chief Information Officer',
  },
  {
    value: 'Chief Security Officer',
    label: 'Chief Security Officer',
  },
  {
    value: 'Chief Technical Officer',
    label: 'Chief Technical Officer',
  },
  {
    value: 'Project Manager',
    label: 'Project Manager',
  },
]

export const salaryOptions = [
  { value: 'Tất cả', label: 'all' },
  { value: '500', label: '500 USD' },
  { value: '1000', label: '1.000 USD' },
  { value: '2000', label: '2.000 USD' },
  { value: '3000', label: '3.000 USD' },
  { value: '5000', label: '5.000 USD' },
]

export const statusEventOption = [
  { value: 'Tất cả', label: 'all' },
  { value: 'NotYetOccur', label: 'NotYetOccur' },
  { value: 'Occurring', label: 'Occurring' },
  { value: 'Pausing', label: 'Pausing' },
  { value: 'Finish', label: 'Finish' },
]

export const typeSalaryOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'VND', label: 'VND' },
]

export const hideSalaryOptions = [
  { value: "You'll love it", label: "You'll love it" },
  { value: 'Competitive', label: 'Competitive' },
]

export const workingTimeOptions = [
  {
    value: 'choose-workingTime',
    label: 'choose-workingTime',
  },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
]

export const expiredJobOptions = [
  { value: false, label: 'Job postings' },
  { value: true, label: 'Job has expired' },
]

export const footerHomeList = [
  {
    titleFooter: 'jobseekers',
    contentFooter: [
      { href: '/jobs/search?createdAt=1', title: 'newjobs' },
      { href: '/jobs', title: 'searchjobs' },
      { href: '/events/search?status=NotYetOccur', title: 'Event not yet occured' },
      { href: '/events', title: 'Search events' },
    ],
  },
  {
    titleFooter: 'employers',
    contentFooter: [
      { href: '/employers/dashboard/post-job', title: 'postjobs' },
      { href: '/employers/dashboard/events/post-event', title: 'Event organization' },
    ],
  },
  {
    titleFooter: 'helpcenter',
    contentFooter: [{ href: '/', title: 'customersupport' }],
  },
  {
    titleFooter: 'jobsinprovince',
    contentFooter: [
      { href: '/jobs/search?location%city=Thành%20phố%20Hồ%20Chí%20Minh', title: 'jobsinHCM' },
      { href: '/jobs/search?location%city=Thành%20phố%20Đà%20Nẵng', title: 'jobsinDN' },
      { href: '/jobs/search?location%city=Thành%20phố%20Hà%20Nội', title: 'jobsinHN' },
      { href: '/jobs/search?location%city=Thành%20phố%20Hải%20Phòng', title: 'jobsinHP' },
    ],
  },
]

export const footerHomeEmployerList = [
  {
    titleFooter: 'contact-info',
    contentFooter: [
      { href: 'tel:+84396084832', title: 'Phone 1: (84) 396084832', isTagA: true, isPhone: true },
      { href: 'tel:+84949488160', title: 'Phone 2: (84) 949488160', isTagA: true, isPhone: true },
      {
        href: 'mailto:mst.recruitment10@gmail.com',
        title: 'mst.recruitment10@gmail.com',
        isTagA: true,
        isMail: true,
      },
    ],
  },
  {
    titleFooter: 'company',
    contentFooter: [
      { href: '/employers', title: 'about-us' },
      { href: '/employers', title: 'leadership' },
    ],
  },
  {
    titleFooter: 'help',
    contentFooter: [
      { href: '/employers', title: 'support' },
      { href: '/employers', title: 'term of use' },
      { href: '/employers', title: 'privacy policy' },
    ],
  },
  {
    titleFooter: 'dashboard',
    contentFooter: [
      { href: '/employers/dashboard/post-job', title: 'postjobs' },
      { href: '/employers/dashboard/events/post-event', title: 'Create a new event' },
      { href: '/employers/dashboard/recruit-manage/created', title: 'recruitment manager' },
      { href: '/employers/dashboard/events/created', title: 'Event management' },
      { href: '/employers/dashboard/candidate-profiles', title: 'Manage candidate profiles' },
    ],
  },
]
