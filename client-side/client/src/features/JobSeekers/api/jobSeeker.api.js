import axiosClient from "api/axiosClient";

export const getDetailJobSeeker = async () => {
  try {
    const res = await axiosClient.get(`job-seeker`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
