export const selectedJobSeekerProfile = (state) => {
  return state?.jobSeeker?.jobSeekerProfile;
};

export const selectedStatus = (state) => {
  return state?.jobSeeker?.status;
};

export const selectJobs = (state) => {
  return state?.jobSeeker?.jobs;
};

export const selectJobSeekerLocal = () => {
  return JSON.parse(localStorage.getItem("user"));
};
