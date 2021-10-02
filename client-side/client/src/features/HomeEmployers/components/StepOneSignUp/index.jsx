import InputField from "custom-fields/InputField";
import ButtonField from "custom-fields/ButtonField";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { schemaSignUpStep1 } from "common/constants/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "./style.module.scss";
import { MdPhone } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectInfoSignUp } from "features/HomeEmployers/slices/selectors";

const StepOneSignUp = (props) => {
  const { t } = useTranslation();
  const { onSubmit } = props;

  const infoSignUp = useSelector(selectInfoSignUp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignUpStep1),
  });

  return (
    <Fragment>
      <div className={classes.stepone}>{t("Bước 1: Thông tin liên hệ")}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="email"
          placeholder={t("phd-email-sendmail")}
          {...register("email")}
          defaultValue={infoSignUp?.email}
          errors={errors.email?.message}
          icon={<IoMdMail />}
        />
        <InputField
          type="email"
          placeholder={t("phd-email-confirm")}
          {...register("confirmEmail")}
          defaultValue={infoSignUp?.confirmEmail}
          errors={errors.confirmEmail?.message}
          icon={<IoMdMail />}
        />
        <InputField
          placeholder={t("phd-phone-signup")}
          {...register("phone")}
          defaultValue={infoSignUp?.phone}
          errors={errors.phone?.message}
          icon={<MdPhone />}
        />
        <ButtonField
          type="submit"
          backgroundcolor="#0a426e"
          backgroundcolorhover="#324554"
          color="#fff"
          width="100%"
        >
          {t("next")}
        </ButtonField>
      </form>
    </Fragment>
  );
};

export default StepOneSignUp;
