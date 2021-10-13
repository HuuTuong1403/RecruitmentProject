import axiosClient from "api/axiosClient";

export const fetchJobs = async () => {
  try {
    const res = await axiosClient.get("jobs");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProvinces = async () => {
  try {
    const res = await axiosClient.get("location/provinces");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDistricts = async ({ code }) => {
  try {
    const res = await axiosClient.get("location/districts", {
      params: { code },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWards = async ({ code }) => {
  try {
    const res = await axiosClient.get("location/wards", {
      params: { code },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const signUpGuest = async (payload) => {
  const res = await axiosClient.post("job-seeker/signup", payload);
  return res;
};

export const signInGuest = async (payload) => {
  const res = await axiosClient.post("job-seeker/login", payload);
  return res;
};

export const forgotPassJobSeeker = async (payload) => {
  const res = await axiosClient.post("job-seeker/forgotPassword", payload);
  return res;
};

export const resetPassword = async (payload, resetToken) => {
  const res = await axiosClient.patch(
    `job-seeker/resetPassword/${resetToken}`,
    payload
  );
  return res;
};
