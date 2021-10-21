import { Avatar } from "antd";
import { getSystemManagerDetailAsync } from "features/SystemManager/slices/thunks";
import { schemaUpdateProfile } from "common/constants/schema";
import { ScrollTop } from "common/functions";
import { selectSystemManageDetail } from "features/SystemManager/slices/selectors";
import { upadteProfileSystemManager } from "features/SystemManager/api/systemManager.api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputProfileField from "features/SystemManager/components/InputProfileField";
import LabelField from "custom-fields/LabelField";
import notification from "components/Notification";
import LoadingSuspense from "components/Loading";

const ProfilePage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState();
  ScrollTop();
  useTitle(`${t("Account Management")}`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSystemManagerDetailAsync());
  }, [dispatch]);

  const systemManagerDetail = useSelector(selectSystemManageDetail);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUpdateProfile),
  });

  const handleSubmitUpdateProfile = async (dataUpdateProfile) => {
    setLoading(true);
    if (
      dataUpdateProfile.fullname === systemManagerDetail?.fullname &&
      dataUpdateProfile.email === systemManagerDetail?.email &&
      dataUpdateProfile.phone === systemManagerDetail?.phone
    ) {
      setLoading(false);
      notification(`${t("Updated data unchanged")}`, "error");
    } else {
      const result = await upadteProfileSystemManager(dataUpdateProfile);
      if (result.status === "success") {
        setLoading(false);
        notification(`${t("Update information successful")}`, "success");
        dispatch(getSystemManagerDetailAsync());
      } else {
        setLoading(false);
        notification(result.message, "error");
      }
    }
  };

  const handleCancelSubmit = () => {
    reset({ 
      fullname: systemManagerDetail?.fullname,
      email: systemManagerDetail?.email,
      phone: systemManagerDetail?.phone,
    });
  };

  return (
    <div className={classes.updateProfile}>
      <div className={classes.updateProfile__wrapped}>
        <div className={classes["updateProfile__wrapped--title"]}>
          {t("Personal information")}
        </div>
        {systemManagerDetail ? (
          <form
            className={classes.updateProfile__form}
            onSubmit={handleSubmit(handleSubmitUpdateProfile)}
          >
            <div className={classes["updateProfile__form--left"]}>
              <Avatar
                src={systemManagerDetail.avatar}
                shape="square"
                size={180}
              />
            </div>
            <div className={classes["updateProfile__form--right"]}>
              <div>
                <InputProfileField
                  fontSize="26px"
                  bold="700"
                  placeholder={t("phd-fullname")}
                  defaultValue={systemManagerDetail.fullname}
                  {...register("fullname")}
                  errors={errors?.fullname?.message}
                />
              </div>
              <div className={classes["updateProfile__form--group"]}>
                <LabelField label="Email:" />
                <InputProfileField
                  fontSize="15px"
                  bold="normal"
                  placeholder={systemManagerDetail.email ?? t("phd-email")}
                  defaultValue={systemManagerDetail.email ?? ""}
                  {...register("email")}
                  errors={errors?.email?.message}
                />
              </div>
              <div className={classes["updateProfile__form--group"]}>
                <LabelField label={`${t("phone number")}:`} />
                <InputProfileField
                  fontSize="15px"
                  bold="normal"
                  placeholder={systemManagerDetail.phone ?? t("phd-phone")}
                  defaultValue={systemManagerDetail.phone ?? ""}
                  {...register("phone")}
                  errors={errors?.phone?.message}
                />
              </div>
              <div className={classes["updateProfile__form--group"]}>
                <LabelField label={`${t("Username")}:`} />
                <div className={classes["updateProfile__form--group--text"]}>
                  {systemManagerDetail.username}
                </div>
              </div>
              <div className={classes["updateProfile__form--actions"]}>
                <ButtonField
                  type="button"
                  backgroundcolor="#dd4b39"
                  backgroundcolorhover="#bf0000"
                  color="#fff"
                  radius="20px"
                  uppercase="true"
                  padding="8px"
                  onClick={handleCancelSubmit}
                >
                  {t("Cancel")}
                </ButtonField>
                <ButtonField
                  type="submit"
                  backgroundcolor="#0a426e"
                  backgroundcolorhover="#324554"
                  color="#fff"
                  radius="20px"
                  uppercase="true"
                  padding="8px"
                  loading={loading}
                >
                  {t("Update Information")}
                </ButtonField>
              </div>
            </div>
          </form>
        ) : (
          <LoadingSuspense showText={false} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
