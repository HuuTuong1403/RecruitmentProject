import { Link } from "react-router-dom";
import { schemaSendMail } from "common/constants/schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import ButtonField from "custom-fields/ButtonField";

const SendMailForgot = (props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSendMail),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.sendmail}>
      <div className={classes.sendmail__wrapped}>
        <div className={classes["sendmail__wrapped--content"]}>
          {t("content-sendmail")}
        </div>
        <div className={classes["sendmail__wrapped--title"]}>
          {t("forgotpass")}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes["sendmail__wrapped--form"]}
        >
          <div className={classes["sendmail__wrapped--form--label"]}>
            {t("label-email-send")}
          </div>
          <InputField
            placeholder={t("phd-email-sendmail")}
            {...register("email")}
            errors={errors.email?.message}
          />

          <ButtonField
            type="submit"
            backgroundcolor="#0a426e"
            backgroundcolorhover="#324554"
            color="#fff"
            width="100%"
          >
            {t("confirm-email")}
          </ButtonField>
        </form>

        <div>
          <Link to="/home/sign-in">{t("back-signin")}</Link>
        </div>
      </div>
    </div>
  );
};

export default SendMailForgot;
