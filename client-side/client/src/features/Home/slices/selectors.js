export const selectJobsHome = (state) => {
  return state?.home?.jobs;
};

export const selectLoadingHome = (state) => state?.home?.status;
