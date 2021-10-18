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
