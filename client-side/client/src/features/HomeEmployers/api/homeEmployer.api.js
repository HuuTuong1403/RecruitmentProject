import axiosClient from "api/axiosClient";

export const signUpEmployer = async (payload) => {
  const res = await axiosClient.post("employer", payload);
  return res;
};
