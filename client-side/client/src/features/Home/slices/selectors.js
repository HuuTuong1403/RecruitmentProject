export const selectJobsHome = (state) => {
  return state?.home?.jobs;
};

export const selectedProvinces = (state) => {
  return state?.home?.provinces;
};

export const selectedDistricts = (state) => {
  return state?.home?.districts;
};

export const selectedWards = (state) => {
  return state?.home?.wards;
};

export const selectLoadingHome = (state) => state?.home?.status;
