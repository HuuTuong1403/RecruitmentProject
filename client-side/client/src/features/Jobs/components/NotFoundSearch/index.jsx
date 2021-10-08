import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";

const NotFoundSearch = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.notfound}>
      <div className={classes.notfound__wrapped}>
        <div className={classes["notfound__wrapped--notify"]}>
          {t("There are currently no jobs matching your criteria")}
        </div>
      </div>
    </div>
  );
};

export default NotFoundSearch;
