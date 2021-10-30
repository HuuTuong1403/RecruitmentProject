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
