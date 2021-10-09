import axiosClient from "api/axiosClient";

export const signUpEmployer = async (payload) => {
  const res = await axiosClient.post("employer", payload);
  return res;
};

export const signInEmployer = async (payload) => {
  const res = await axiosClient.post("employer/login", payload);
  return res;
};
