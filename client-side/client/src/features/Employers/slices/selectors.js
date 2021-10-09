export const selectEmployerLocal = () => {
  return JSON.parse(localStorage.getItem("employer"));
};

export const selectEmployerDetail = (state) => {
  return state?.employer?.employerDetail;
};

export const selectedStatus = (state) => {
  return state?.employer?.status;
};
