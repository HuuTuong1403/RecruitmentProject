import axiosClient from "api/axiosClient";

export const getDetailJobSeeker = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axiosClient.get(`job-seeker/${user.id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
