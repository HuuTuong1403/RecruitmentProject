import axiosClient from "api/axiosClient";

export const issueAccountManager = async (payload) => {
  try {
    const res = await axiosClient.post(
      "system-admin/manage/system-manager",
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const issueAccountAdministrator = async (payload) => {
  try {
    const res = await axiosClient.post("system-admin/account", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
