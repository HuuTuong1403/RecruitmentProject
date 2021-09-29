import { FaGoogle } from "react-icons/fa";
import { FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { schemaSignInUser } from "common/constants/schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthComponent from "features/Home/components/AuthComponent";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";

const SignInGuest = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignInUser),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AuthComponent>
      <div className={classes.signin}>
        <div className={classes.signin__wrapped}>
          <div className={classes["signin__wrapped--content"]}>
            {t("content-signin")}
          </div>
          <div className={classes["signin__wrapped--title"]}>{t("signin")}</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes["signin__wrapped--form"]}
          >
            <InputField
              placeholder={t("phd-username-signin")}
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

            <div className={classes["signin__wrapped--form--link"]}>
              <Link to="/">{t("forgotpass")}</Link>
            </div>

            <button type="submit">{t("signin")}</button>
          </form>

          <div className={classes["signin__wrapped--social"]}>
            <div className={classes["signin__wrapped--social--line"]}>
              <span>{t("or-signin")}</span>
            </div>
            <div className={classes["signin__wrapped--social--google"]}>
              <button>
                <FaGoogle />
                <span> {t("signin-google")}</span>
              </button>
            </div>
            <div className={classes["signin__wrapped--social--signup"]}>
              <span>{t("no-account")} </span>
              <Link to="/home/sign-up">{t("signup")}</Link>
            </div>
          </div>
        </div>
      </div>
    </AuthComponent>
  );
};

export default SignInGuest;
