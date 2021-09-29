import classes from "./style.module.scss";
import { schemaChangePass } from "common/constants/schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "custom-fields/InputField";
import { useHistory, useLocation, Redirect } from "react-router-dom";

const ChangePassForgot = () => {
  const { t } = useTranslation();
  const history = useHistory();
  let query = new URLSearchParams(useLocation().search);
  const email = query.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaChangePass),
  });

  const onSubmit = (data) => {
    history.replace("/home/sign-in");
    console.log(data);
  };

  if (!email) {
    return <Redirect to="/home/forgot-pass" />;
  }

  return (
    <div className={classes.changepass}>
      <div className={classes.changepass__wrapped}>
        <div className={classes["changepass__wrapped--content"]}>
          {t("content-change-pass")}
        </div>
        <div className={classes["changepass__wrapped--title"]}>
          {t("changepass")}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes["changepass__wrapped--form"]}
        >
          <div className={classes["changepass__wrapped--form--label"]}>
            Email:
          </div>
          <InputField readOnly value={email} {...register("email")} />

          <div className={classes["changepass__wrapped--form--label"]}>
            {t("newpass")}:
          </div>
          <InputField
            type="password"
            placeholder={t("phd-new-pass")}
            {...register("password")}
            errors={errors.password?.message}
          />

          <div className={classes["changepass__wrapped--form--label"]}>
            {t("confirm-pass")}:
          </div>
          <InputField
            type="password"
            placeholder={t("phd-confirm-pass")}
            {...register("confirmPassword")}
            errors={errors.confirmPassword?.message}
          />

          <button type="submit">{t("changepass")}</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassForgot;
