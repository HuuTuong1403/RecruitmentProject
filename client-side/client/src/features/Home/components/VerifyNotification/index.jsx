import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";

const VerifyNotification = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.verifyEmail}>
      <div className={classes.verifyEmail__title}>{t("verify-email")}</div>
      <div className={classes.verifyEmail__content}>{t("notify-verify")}</div>
    </div>
  );
};

export default VerifyNotification;
