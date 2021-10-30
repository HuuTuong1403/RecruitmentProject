import { forgotPassEmployer } from "features/HomeEmployers/api/homeEmployer.api";
import { Link } from "react-router-dom";
import { schemaSendMail } from "common/constants/schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";
import notification from "components/Notification";

const SendMailForgotEmployer = (props) => {
  const { t } = useTranslation();
  const { changeToNotify } = props;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSendMail),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await forgotPassEmployer(data);
      if (result.status === "success") {
        setLoading(false);
        notification(
          `${t("Password recovery request has been sent successfully")}`,
          "success"
        );
        changeToNotify();
      } else {
        setLoading(false);
        notification(`${t("Email address not found in system")}`, "error");
      }
    } catch (error) {
      setLoading(false);
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
  };

  return (
    <div className={classes.sendmailEmployer}>
      <div className={classes.sendmailEmployer__wrapped}>
        <div className={classes["sendmailEmployer__wrapped--content"]}>
          {t("content-sendmail")}
        </div>
        <div className={classes["sendmailEmployer__wrapped--title"]}>
          {t("forgotpass")}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes["sendmailEmployer__wrapped--form"]}
        >
          <LabelField label={t("label-email-send")} isCompulsory={true} />
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
            radius="20px"
            uppercase="true"
            padding="8px"
            loading={loading}
          >
            {t("confirm-email")}
          </ButtonField>
        </form>

        <div>
          <Link to="/employers/sign-in">{t("back-signin")}</Link>
        </div>
      </div>
    </div>
  );
};

export default SendMailForgotEmployer;
