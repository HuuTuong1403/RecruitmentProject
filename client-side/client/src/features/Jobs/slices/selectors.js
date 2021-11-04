export const selectedJobs = (state) => {
  return state?.job?.jobsSearch;
};

export const selectedStatus = (state) => {
  return state?.job?.status;
};

export const selectedJobDetail = (state) => {
  return state?.job?.jobDetail;
};

export const selectedSkills = (state) => {
  return state?.job?.skills;
};

export const selectedCompanyDetail = (state) => {
  return state?.job?.companyDetail;
};

export const selectedIsFilter = (state) => {
  return state?.job?.isFilter;
};

export const selectedReviews = (state) => {
  return state?.job?.reviews;
};
