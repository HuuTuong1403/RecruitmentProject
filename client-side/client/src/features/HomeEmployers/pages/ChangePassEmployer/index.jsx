import { resetPassEmployer } from "features/HomeEmployers/api/homeEmployer.api";
import { schemaChangePassForgot } from "common/constants/schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthComponent from "components/AuthComponent";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import notification from "components/Notification";

const ChangePassEmployer = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaChangePassForgot),
  });

  useEffect(() => {
    if (!token) {
      history.push("/employers/forgot-pass");
    }
  });

  const onSubmit = async (data) => {
    try {
      const result = await resetPassEmployer(data, token);
      if (result.status === "success") {
        notification(`${t("Password recovery successful")}`, "success");
        history.replace("/employers/sign-in");
      } else {
        notification(`${t("Token is invalid or expired")}`, "error");
      }
    } catch (error) {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
  };

  return (
    <AuthComponent>
      <div className={classes.changepassEmployer}>
        <div className={classes.changepassEmployer__wrapped}>
          <div className={classes["changepassEmployer__wrapped--content"]}>
            {t("content-change-pass")}
          </div>
          <div className={classes["changepassEmployer__wrapped--title"]}>
            {t("changepass")}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes["changepassEmployer__wrapped--form"]}
          >
            <div
              className={classes["changepassEmployer__wrapped--form--label"]}
            >
              {t("newpass")}:
            </div>
            <InputField
              type="password"
              placeholder={t("phd-new-pass")}
              {...register("password")}
              errors={errors.password?.message}
            />

            <div
              className={classes["changepassEmployer__wrapped--form--label"]}
            >
              {t("confirm-pass")}:
            </div>
            <InputField
              type="password"
              placeholder={t("phd-confirm-pass")}
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
              {t("changepass")}
            </ButtonField>
          </form>
        </div>
      </div>
    </AuthComponent>
  );
};

export default ChangePassEmployer;