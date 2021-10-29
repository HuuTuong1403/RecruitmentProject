import { FiLock } from "react-icons/fi";
import { logoutEmployer } from "features/HomeEmployers/slices";
import { schemaChangePass } from "common/constants/schema";
import { ScrollTop } from "common/functions";
import { updatePassEmployer } from "features/Employers/api/employer.api";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";
import notification from "components/Notification";

const SettingPage = () => {
  ScrollTop();

  const { t } = useTranslation();
  useTitle(`${t("Settings")}`);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaChangePass),
  });

  const submitChangePassHandler = async (dataChangePass) => {
    setLoading(true);
    const result = await updatePassEmployer(dataChangePass);
    if (result.status === 204) {
      setLoading(false);
      dispatch(logoutEmployer());
      notification(
        `${t("Change password successfully. Please re-login to the system")}`,
        "success"
      );
      history.push("/employers/sign-in");
    } else {
      setLoading(false);
      notification(result.message, "error");
    }
  };

  return (
    <div className={classes.employerSetting}>
      <div className={classes.employerSetting__wrapped}>
        <div className={classes.titleDashboard}>
          {t("Employer account settings")}
        </div>
        <div className={classes.subTitleDashboard}>
          {t("Change login password")}
        </div>
        <form
          className={classes["employerSetting__wrapped--changePass"]}
          onSubmit={handleSubmit(submitChangePassHandler)}
        >
          <div>
            <div>
              <LabelField
                label={t("Enter current password")}
                isCompulsory={true}
              />
              <InputField
                type="password"
                placeholder={t("Please enter your current password")}
                {...register("currentPassword")}
                errors={errors?.currentPassword?.message}
                icon={<FiLock />}
              />
            </div>
            <div>
              <LabelField
                label={t("Enter your new password")}
                isCompulsory={true}
              />
              <InputField
                type="password"
                placeholder={t("Please enter a new password")}
                {...register("password")}
                errors={errors?.password?.message}
                icon={<FiLock />}
              />
            </div>
            <div>
              <LabelField
                label={t("Enter confirm a new password")}
                isCompulsory={true}
              />
              <InputField
                type="password"
                placeholder={t("Please enter confirm a new password")}
                {...register("passwordConfirm")}
                errors={errors?.passwordConfirm?.message}
                icon={<FiLock />}
              />
            </div>
            <div
              className={
                classes["employerSetting__wrapped--changePass--actions"]
              }
            >
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
                {t("Save")}
              </ButtonField>
              <ButtonField
                type="button"
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                color="#fff"
                radius="20px"
                uppercase="true"
                padding="8px"
                onClick={() => reset()}
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

export default SettingPage;
