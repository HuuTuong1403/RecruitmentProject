import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";

const LabelField = ({ label, isCompulsory = false }) => {
  const { t } = useTranslation();

  return (
    <label className={classes.labelTitle}>
      {label} {isCompulsory && <span>* {t("Compulsory")}</span>}
    </label>
  );
};

export default LabelField;
