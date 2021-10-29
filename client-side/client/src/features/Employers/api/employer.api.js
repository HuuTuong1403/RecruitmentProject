import axiosClient from "api/axiosClient";

export const getDetailEmployer = async () => {
  try {
    const res = await axiosClient.get("employer");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassEmployer = async (payload) => {
  try {
    const res = await axiosClient.patch("employer/updatePassword", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileEmployer = async (payload) => {
  try {
    const res = await axiosClient.patch("employer/updateMe", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postJobEmployer = async (payload) => {
  try {
    const res = await axiosClient.post("employer/jobs", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobsOfEmployer = async () => {
  try {
    const res = await axiosClient.get(`employer/jobs`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobDetailOfEmployer = async (payload) => {
  try {
    const res = await axiosClient.get(`employer/jobs/${payload}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
