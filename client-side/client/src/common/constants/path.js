const rootEmployer = '/employers/dashboard/'

export const PATH = {
  employer: '/employers',
  home: '/home',
  jobs: '/jobs',
  events: '/events',
}

export const pathJobSeeker = {
  eventsJoined: '/jobseekers/events/joined',
  jobApplied: '/jobseekers/job-applied',
  jobSaved: '/jobseekers/job-saved',
  jobseekers: '/jobseekers',
  myProfile: '/jobseekers/my-profile',
  settingAccount: '/jobseekers/setting-account',
}

export const pathEmployer = {
  candidateProfileManage: rootEmployer + 'candidate-profiles',
  changePass: '/employers/forgot-pass/:token',
  createdEvent: rootEmployer + 'events/created',
  dashboard: rootEmployer,
  deletedEvent: rootEmployer + 'events/deleted',
  forgotPass: '/employers/forgot-pass',
  home: '/employers',
  deletedJob: rootEmployer + 'recruit-manage/trash',
  myProfile: rootEmployer + 'my-profile',
  order: rootEmployer + 'order',
  postEvent: rootEmployer + 'events/post-event',
  postJob: rootEmployer + 'post-job',
  createdJob: rootEmployer + 'recruit-manage/created',
  service: '/employers/service',
  settingAccount: rootEmployer + 'setting-account',
  signIn: '/employers/sign-in',
  signUp: '/employers/sign-up',
  statistic: rootEmployer + 'statistics',
  updateEvent: rootEmployer + 'events/:id/edit',
  participantEvent: rootEmployer + 'events/:id/participants',
}

export const pathEvents = {}
