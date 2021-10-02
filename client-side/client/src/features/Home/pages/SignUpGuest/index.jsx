import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import { useForm } from "react-hook-form";
import AuthComponent from "components/AuthComponent";
import InputField from "custom-fields/InputField";
import { schemaSignUpUser } from "common/constants/schema";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";

const SignUpGuest = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignUpUser),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <AuthComponent>
      <div className={classes.signup}>
        <div className={classes.signup__wrapped}>
          <div className={classes["signup__wrapped--content"]}>
            {t("content-signup")}
          </div>
          <div className={classes["signup__wrapped--title"]}>{t("signup")}</div>
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
              {...register("confirmPassword")}
              errors={errors.confirmPassword?.message}
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
