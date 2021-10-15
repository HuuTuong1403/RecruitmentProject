import axiosClient from "api/axiosClient";

export const signInAuth = async (payload) => {
  const res = await axiosClient.post("system-admin/login", payload);
  return res;
};
