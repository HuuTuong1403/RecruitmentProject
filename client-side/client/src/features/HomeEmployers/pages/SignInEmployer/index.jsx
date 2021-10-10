import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { schemaSignInEmployer } from "common/constants/schema";
import { selectEmployerLocal } from "features/Employers/slices/selectors";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { signInEmployerAsync } from "features/HomeEmployers/slices/thunks";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  useEffect(() => {
    const employer = selectEmployerLocal();
    if (employer) history.push("/employers");
  });
  let query = new URLSearchParams(useLocation().search);
  const { t } = useTranslation();
  const user = selectJobSeekerLocal();
  const history = useHistory();
  const [isVerify, setIsVerify] = useState(query.get("isVerify") ?? null);
  const dispatch = useDispatch();

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
    const result = await dispatch(signInEmployerAsync(dataLogIn));
    const { data, status } = result.payload;
    if (status === "success") {
      const { isEmailVerified } = data?.Employer;
      if (isEmailVerified) {
        notification(`${t("Signed in successfully")}`, "success");
        history.push("/employers/dashboard");
      } else {
        setIsVerify(
          `${t(
            "The account has not been activated. Please check your email inbox for activation"
          )}`
        );
      }
    } else {
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
          {isVerify && isVerify !== "success" && (
            <div className={classes["signin_emp__wrapped--verify"]}>
              <AiOutlineCloseCircle style={{ marginRight: "5px" }} />
              {t(`${isVerify}`)}
            </div>
          )}
          {isVerify === "success" && (
            <div className={classes["signin_emp__wrapped--verified"]}>
              <AiOutlineCheckCircle style={{ marginRight: "5px" }} />
              {t(
                "Your account has been activated. Please login to use the system"
              )}
            </div>
          )}
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
