import axiosClient from "api/axiosClient";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";

export const getDetailJobSeeker = async () => {
  try {
    const user = selectJobSeekerLocal();
    const res = await axiosClient.get(`job-seeker/${user.id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
