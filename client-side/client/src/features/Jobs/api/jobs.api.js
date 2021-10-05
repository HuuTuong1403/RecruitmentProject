import axiosClient from "api/axiosClient";

export const fetchJobsSearch = async (payload) => {
  try {
    const res = await axiosClient.get("jobs", {
      params: payload["filter"],
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobsAll = async () => {
  try {
    const res = await axiosClient.get("jobs");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobDetail = async (payload) => {
  try {
    const res = await axiosClient.get(`jobs/${payload}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};