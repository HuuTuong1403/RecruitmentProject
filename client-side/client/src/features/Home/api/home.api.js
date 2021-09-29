import axiosClient from "api/axiosClient";

export const fetchJobs = async () => {
  try {
    const res = await axiosClient.get("jobs");
    return res;
  } catch (error) {
    console.log(error);
  }
};
