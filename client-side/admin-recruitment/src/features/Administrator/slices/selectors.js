export const selectAdminLocal = () => {
  return JSON.parse(localStorage.getItem("admin"));
};
