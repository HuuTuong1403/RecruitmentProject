import axiosClient from "api/axiosClient";

export const getDetailJobSeeker = async () => {
  try {
    const res = await axiosClient.get(`job-seeker`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassJobSeeker = async (payload) => {
  try {
    const res = await axiosClient.patch("job-seeker/updatePassword", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileJobSeeker = async (payload) => {
  try {
    const res = await axiosClient.patch("job-seeker/updateMe", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
