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
