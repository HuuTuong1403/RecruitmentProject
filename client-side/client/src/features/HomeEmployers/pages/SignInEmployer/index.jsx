import { FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { schemaSignInEmployer } from "common/constants/schema";
import { ScrollTop } from "common/functions";
import { selectEmployerLocal } from "features/Employers/slices/selectors";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { signInEmployerAsync } from "features/HomeEmployers/slices/thunks";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthComponent from "components/AuthComponent";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import notification from "components/Notification";

const SignInEmployer = () => {
  ScrollTop();

  useEffect(() => {
    const employer = selectEmployerLocal();
    if (employer) history.push("/employers/dashboard");
  });
  const { t } = useTranslation();
  const user = selectJobSeekerLocal();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useTitle(`${t("Sign in as an employer")}`);
  useEffect(() => {
    if (user) {
      notification(`${t("Please log out of the job seeker account")}`, "error");
      history.goBack();
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignInEmployer),
  });

  const onSubmit = async (dataLogIn) => {
    setLoading(true);
    const result = await dispatch(signInEmployerAsync(dataLogIn));
    const { status } = result.payload;
    if (status === "success") {
      setLoading(false);
      notification(`${t("Signed in successfully")}`, "success");
    } else {
      setLoading(false);
      reset({
        username: "",
        password: "",
      });
      notification(
        `${t("Login information is incorrect. Please try again")}`,
        "error"
      );
    }
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
              radius="20px"
              uppercase="true"
              padding="8px"
              loading={loading}
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
