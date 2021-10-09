import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";

const NotFoundJob = (props) => {
  const { t } = useTranslation();

  return (
    <div className={classes.notFoundJob}>
      <div className={classes.notFoundJob__wrapped}>
        <div className={classes["notFoundJob__wrapped--notify"]}>
          {props.isApplied ? t("No applied jobs") : t("No saved jobs")}
        </div>
      </div>
    </div>
  );
};

export default NotFoundJob;
