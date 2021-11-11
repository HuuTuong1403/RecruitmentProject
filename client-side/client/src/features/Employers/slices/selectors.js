export const selectEmployerLocal = () => {
  return JSON.parse(localStorage.getItem("employer"));
};

export const selectEmployerDetail = (state) => {
  return state?.employer?.employerDetail;
};

export const selectedStatus = (state) => {
  return state?.employer?.status;
};

export const selectPostJobData = (state) => {
  return state?.employer?.postJobData;
};

export const selectJobsOfEmployer = (state) => {
  return state?.employer?.jobsOfEmployer;
};

export const selectJobsDetailEmployer = (state) => {
  return state?.employer?.jobDetailEmployer;
};

export const selectJobSlug = (state) => {
  return state?.employer?.jobSlug;
};

export const selectStatusJobDetail = (state) => {
  return state?.employer?.statusJobDetail;
};

export const selectJobTrash = (state) => {
  return state?.employer?.jobTrash;
};

export const selectJobsApplicationNotSaved = (state) => {
  return state?.employer?.jobsApplicationNotSaved;
};

export const selectJobsApplicationSaved = (state) => {
  return state?.employer?.jobsApplicationSaved;
};

export const selectJobsApplicationDeleted = (state) => {
  return state?.employer?.jobsApplicationDeleted;
};

export const selectTabsItem = (state) => {
  return state?.employer?.tabItem;
};

export const selectDataFilter = (state) => {
  return state?.employer?.dataFilter;
};

export const selectCountApplication = (state) => {
  return state?.employer?.applicationCount;
};

export const selectEventsOfEmployer = (state) => {
  return state?.employer?.eventsOfEmployer;
};

export const selectEventDetailEmployer = (state) => {
  return state?.employer?.eventDetailEmployer;
};
