import { schemaChangePassJobSeeker } from "common/constants/schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthComponent from "components/AuthComponent";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";

const ChangePassForgot = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaChangePassJobSeeker),
  });

  useEffect(() => {
    if (!token) {
      history.push("/home/forgot-pass");
    }
  });

  const onSubmit = (data) => {
    history.replace("/home/sign-in");
    console.log(data);
  };

  return (
    <AuthComponent>
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

export default ChangePassForgot;
