import { getAdministratorDetailAsync } from "features/Administrator/slices/thunks";
import { schemaUpdateProfile } from "common/constants/schema";
import { ScrollTop } from "common/functions";
import { selectAdminDetail } from "features/Administrator/slices/selectors";
import { updateProfileAdministrator } from "features/Administrator/api/admin.api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import AvatarUpload from "components/AvatarUpload";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputProfileField from "features/Administrator/components/InputProfileField";
import LabelField from "custom-fields/LabelField";
import LoadingSuspense from "components/Loading";
import notification from "components/Notification";

const ProfilePage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const [loading, setLoading] = useState();
  const [avatar, setAvatar] = useState(null);

  useTitle(`${t("Account Management")}`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdministratorDetailAsync());
  }, [dispatch]);

  const administratorDetail = useSelector(selectAdminDetail);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUpdateProfile),
  });

  const changeAvatar = (file) => {
    setAvatar(file);
  };

  const handleSubmitUpdateProfile = async (dataUpdateProfile) => {
    setLoading(true);
    const { fullname, email, phone } = dataUpdateProfile;
    if (
      !avatar &&
      fullname === administratorDetail?.fullname &&
      email === administratorDetail?.email &&
      phone === administratorDetail?.phone
    ) {
      setLoading(false);
      notification(`${t("Updated data unchanged")}`, "error");
    } else {
      const payload = new FormData();
      payload.append("fullname", fullname);
      payload.append("email", email);
      payload.append("phone", phone);
      payload.append("photo-avatar", avatar);

      const result = await updateProfileAdministrator(payload);
      if (result.status === "success") {
        setLoading(false);
        notification(`${t("Update information successful")}`, "success");
        dispatch(getAdministratorDetailAsync());
        setAvatar(null);
      } else {
        setLoading(false);
        notification(result.message, "error");
      }
    }
  };

  const handleCancelSubmit = () => {
    reset({
      fullname: administratorDetail?.fullname,
      email: administratorDetail?.email,
      phone: administratorDetail?.phone,
    });
  };

  return (
    <div className={classes.updateProfile}>
      <div className={classes.updateProfile__wrapped}>
        <div className={classes["updateProfile__wrapped--title"]}>
          {t("Personal information")}
        </div>
        {administratorDetail ? (
          <form
            className={classes.updateProfile__form}
            onSubmit={handleSubmit(handleSubmitUpdateProfile)}
          >
            <div className={classes["updateProfile__form--left"]}>
              <AvatarUpload
                changeAvatar={changeAvatar}
                src={administratorDetail.avatar}
                shape="circle"
                size={180}
              />
            </div>
            <div className={classes["updateProfile__form--right"]}>
              <div>
                <InputProfileField
                  fontSize="26px"
                  bold="700"
                  placeholder={t("phd-fullname")}
                  defaultValue={administratorDetail.fullname}
                  {...register("fullname")}
                  errors={errors?.fullname?.message}
                />
              </div>
              <div className={classes["updateProfile__form--group"]}>
                <LabelField label="Email:" />
                <InputProfileField
                  fontSize="15px"
                  bold="normal"
                  placeholder={administratorDetail.email ?? t("phd-email")}
                  defaultValue={administratorDetail.email ?? ""}
                  {...register("email")}
                  errors={errors?.email?.message}
                />
              </div>
              <div className={classes["updateProfile__form--group"]}>
                <LabelField label={`${t("phone number")}:`} />
                <InputProfileField
                  fontSize="15px"
                  bold="normal"
                  placeholder={administratorDetail.phone ?? t("phd-phone")}
                  defaultValue={administratorDetail.phone ?? ""}
                  {...register("phone")}
                  errors={errors?.phone?.message}
                />
              </div>
              <div className={classes["updateProfile__form--group"]}>
                <LabelField label={`${t("Username")}:`} />
                <div className={classes["updateProfile__form--group--text"]}>
                  {administratorDetail.username}
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
