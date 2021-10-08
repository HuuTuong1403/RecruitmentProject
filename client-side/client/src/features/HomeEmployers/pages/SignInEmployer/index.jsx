import { FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { schemaSignInEmployer } from "common/constants/schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthComponent from "components/AuthComponent";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import ButtonField from "custom-fields/ButtonField";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import notification from "components/Notification";
import { useTitle } from "common/hook/useTitle";

const SignInEmployer = () => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  useTitle(`${t("Sign in as an employer")}`);
  useEffect(() => {
    if (user?.role === "jobseeker") {
      notification(`${t("Please log out of the job seeker account")}`, "error");
      history.goBack();
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignInEmployer),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <AuthComponent>
      <div className={classes.signin_emp}>
        <div className={classes.signin_emp__wrapped}>
          <div className={classes["signin_emp__wrapped--content"]}>
            {t("content-signin-emp")}
          </div>
          <div className={classes["signin_emp__wrapped--title"]}>
            {t("signin")}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes["signin_emp__wrapped--form"]}
          >
            <InputField
              placeholder={t("phd-username-emp-signin")}
              {...register("username")}
              errors={errors.username?.message}
              icon={<FiUser />}
            />

            <InputField
              type="password"
              placeholder={t("phd-pass-signin")}
              {...register("password")}
              errors={errors.password?.message}
              icon={<FiLock />}
            />

            <div className={classes["signin_emp__wrapped--form--link"]}>
              <Link to="/employers/forgot-pass">{t("forgotpass")}</Link>
            </div>
            <ButtonField
              type="submit"
              backgroundcolor="#0a426e"
              backgroundcolorhover="#324554"
              color="#fff"
              width="100%"
            >
              {t("signin")}
            </ButtonField>
          </form>
          <div className={classes["signin_emp__wrapped--signup"]}>
            <span>{t("no-account")} </span>
            <Link to="/employers/sign-up">{t("signup")}</Link>
          </div>
        </div>
      </div>
    </AuthComponent>
  );
};

export default SignInEmployer;
