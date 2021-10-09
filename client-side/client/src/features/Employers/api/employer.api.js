import axiosClient from "api/axiosClient";
import { selectEmployerLocal } from "../slices/selectors";

export const getDetailEmployer = async () => {
  try {
    const employer = selectEmployerLocal();
    const res = await axiosClient.get(`employer/${employer.id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
