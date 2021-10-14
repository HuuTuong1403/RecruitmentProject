import { schemaChangePassForgot } from "common/constants/schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthComponent from "features/Auth/components/AuthComponent";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";

const ChangePassPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { token } = useParams();
  useTitle(t("change pass"));

  useEffect(() => {
    if (!token) {
      history.push("/forgot-pass");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaChangePassForgot),
  });

  const handleChangePass = (data) => {
    console.log(data);
  };

  return (
    <AuthComponent title={t("change your pass")}>
      <form
        onSubmit={handleSubmit(handleChangePass)}
        className={classes.changePass}
      >
        <div>
          <LabelField label={t("new password")} isCompulsory={true} />
          <InputField
            type="password"
            placeholder={t("phd-new-pass")}
            {...register("password")}
            errors={errors.password?.message}
          />
        </div>

        <div>
          <LabelField label={t("confirm password")} isCompulsory={true} />
          <InputField
            type="password"
            placeholder={t("phd-confirm-pass")}
            {...register("passwordConfirm")}
            errors={errors.passwordConfirm?.message}
          />
        </div>
        <div>
          <ButtonField
            type="submit"
            backgroundcolor="#0a426e"
            backgroundcolorhover="#324554"
            color="#fff"
            width="100%"
            radius="20px"
            uppercase="true"
            padding="10px"
          >
            {t("change pass")}
          </ButtonField>
        </div>
      </form>
    </AuthComponent>
  );
};

export default ChangePassPage;
