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

export const getSystemManagerDetail = async () => {
  try {
    const res = await axiosClient.get("system-manager");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updatePasswordSystemManager = async (payload) => {
  try {
    const res = axiosClient.patch("system-manager/updatePassword", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const upadteProfileSystemManager = async (payload) => {
  try {
    const res = await axiosClient.patch("system-manager/updateMe", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllJob = async () => {
  try {
    const res = await axiosClient.get("system-manager/jobs/view/all");
    return res;
  } catch (error) {
    console.log(error);
  }
};
