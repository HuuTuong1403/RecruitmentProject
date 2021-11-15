import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";

const LabelField = ({ label, isCompulsory }) => {
  const { t } = useTranslation();
  return isCompulsory ? (
    <Tooltip title={t("Compulsory")}>
      <label className={classes.labelTitle}>
        {label} <span>*</span>
      </label>
    </Tooltip>
  ) : (
    <label className={classes.labelTitle}>{label}</label>
  );
};

export default LabelField;
