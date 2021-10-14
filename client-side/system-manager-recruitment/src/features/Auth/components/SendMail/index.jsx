// import notification from "components/Notification";
import { Link } from "react-router-dom";
import { schemaSendMail } from "common/constants/schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";

const SendMail = (props) => {
  const { t } = useTranslation();
  const { changeToNotify } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSendMail),
  });

  const onSubmit = async (data) => {
    console.log(data);
    changeToNotify();
  };

  return (
    <div className={classes.sendmail}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes["sendmail__form"]}
      >
        <LabelField label="Email" isCompulsory={true} />
        <InputField
          placeholder={t("phd-email")}
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
          padding="10px"
        >
          {t("confirm email")}
        </ButtonField>
      </form>

      <div>
        <Link to="/">{t("back sign in")}</Link>
      </div>
    </div>
  );
};

export default SendMail;
