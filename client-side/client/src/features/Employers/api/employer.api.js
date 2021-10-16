import axiosClient from "api/axiosClient";

export const getDetailEmployer = async () => {
  try {
    const res = await axiosClient.get(`employer`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
