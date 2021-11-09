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

export const selectFavoriteJobs = (state) => {
  return state?.jobSeeker?.favoriteJobs;
};

export const selectApplicationJobs = (state) => {
  return state?.jobSeeker?.applicationJobs;
};

export const selectJoinedEvent = (state) => {
  return state?.jobSeeker?.joinedEvent;
};
