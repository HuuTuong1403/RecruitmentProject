import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import { useForm } from "react-hook-form";
import AuthComponent from "components/AuthComponent";
import InputField from "custom-fields/InputField";
import { schemaSignUpUser } from "common/constants/schema";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import { signUpGuest } from "features/Home/api/home.api";
import notification from "components/Notification";
import { Fragment, useState, useEffect } from "react";
import VerifyNotification from "features/Home/components/VerifyNotification";
import { useHistory } from "react-router-dom";
import { useTitle } from "common/hook/useTitle";

const SignUpGuest = () => {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) history.push("/home");
  });
  const history = useHistory();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  useTitle(`${t("Register for a job seeker account quickly")}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignUpUser),
  });

  const onSubmit = async (data) => {
    const result = await signUpGuest(data);
    if (result?.status === "success") {
      notification(`${t("Successful account registration")}`, "success");
      setStep(2);
    } else {
      notification(`${result.message}`, "error");
    }
  };

  return (
    <AuthComponent>
      <div className={classes.signup}>
        <div className={classes.signup__wrapped}>
          <div className={classes["signup__wrapped--content"]}>
            {t("content-signup")}
          </div>
          {step === 1 && (
            <Fragment>
              <div className={classes["signup__wrapped--title"]}>
                {t("signup")}
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes["signup__wrapped--form"]}
              >
                <InputField
                  placeholder={"Họ tên của bạn"}
                  {...register("fullname")}
                  errors={errors.fullname?.message}
                />
                <InputField
                  placeholder={"Tên đăng nhập"}
                  {...register("username")}
                  errors={errors.username?.message}
                />
                <InputField
                  type="email"
                  placeholder={"Email"}
                  {...register("email")}
                  errors={errors.email?.message}
                />
                <InputField
                  placeholder={"Phone"}
                  {...register("phone")}
                  errors={errors.phone?.message}
                />
                <InputField
                  type="password"
                  placeholder={"Password"}
                  {...register("password")}
                  errors={errors.password?.message}
                />
                <InputField
                  type="password"
                  placeholder={"Confirm Password"}
                  {...register("passwordConfirm")}
                  errors={errors.passwordConfirm?.message}
                />
                <ButtonField
                  type="submit"
                  backgroundcolor="#0a426e"
                  backgroundcolorhover="#324554"
                  color="#fff"
                  width="100%"
                >
                  {t("signup")}
                </ButtonField>
              </form>
            </Fragment>
          )}
          {step === 2 && <VerifyNotification />}
          <div className={classes["signup__wrapped--social"]}>
            <span>{t("have-account")} </span>
            <Link to="/home/sign-in">{t("signin")}</Link>
          </div>
        </div>
      </div>
    </AuthComponent>
  );
};

export default SignUpGuest;
