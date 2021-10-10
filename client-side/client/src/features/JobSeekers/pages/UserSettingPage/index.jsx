import { FiLock } from "react-icons/fi";
import { schemaChangePassSignIn } from "common/constants/schema";
import { ScrollTop } from "common/functions";
import { useForm } from "react-hook-form";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";

const UserSettingPage = () => {
  ScrollTop();
  const { t } = useTranslation();

  useTitle(`${t("Settings")}`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaChangePassSignIn),
  });

  const submitChangePassHandler = (data) => {
    console.log(data);
  };

  const handleResetChangePass = () => {
    reset({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <div className={classes.userSetting}>
      <div className={classes.userSetting__wrapped}>
        <div className={classes["userSetting__wrapped--title"]}>
          {t("Job Seeker account settings")}
        </div>
        <div className={classes["userSetting__wrapped--subTitle1"]}>
          {t("Change login password")}
        </div>
        <form
          className={classes["userSetting__wrapped--changePass"]}
          onSubmit={handleSubmit(submitChangePassHandler)}
        >
          <div>
            <div>
              <label>{t("Enter current password")}:</label>
              <InputField
                type="password"
                placeholder={t("Please enter your current password")}
                {...register("oldPassword")}
                errors={errors?.oldPassword?.message}
                icon={<FiLock />}
              />
            </div>
            <div>
              <label>{t("Enter your new password")}:</label>
              <InputField
                type="password"
                placeholder={t("Please enter a new password")}
                {...register("newPassword")}
                errors={errors?.newPassword?.message}
                icon={<FiLock />}
              />
            </div>
            <div>
              <label>{t("Enter confirm a new password")}:</label>
              <InputField
                type="password"
                placeholder={t("Please enter confirm a new password")}
                {...register("confirmNewPassword")}
                errors={errors?.confirmNewPassword?.message}
                icon={<FiLock />}
              />
            </div>
            <div
              className={classes["userSetting__wrapped--changePass--actions"]}
            >
              <ButtonField
                type="submit"
                backgroundcolor="#0a426e"
                backgroundcolorhover="#324554"
                color="#fff"
              >
                {t("Save")}
              </ButtonField>
              <ButtonField
                type="button"
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                color="#fff"
                onClick={handleResetChangePass}
              >
                {t("Cancel")}
              </ButtonField>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettingPage;
