import axiosClient from "api/axiosClient";

export const fetchAlLEmployer = async () => {
  try {
    const res = await axiosClient.get("system-manager/manage/employer");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchEmployerDetail = async (payload) => {
  try {
    const res = await axiosClient.get(
      `system-manager/manage/employer/${payload}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const issueAccountEmployer = async (payload) => {
  try {
    const { id, username, password } = payload;
    const res = await axiosClient.patch(
      `system-manager/manage/employer/${id}/issue`,
      {
        username,
        password,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
