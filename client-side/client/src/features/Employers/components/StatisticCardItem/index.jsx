import { FaUsers, FaArrowUp } from "react-icons/fa";
import classes from "./style.module.scss";
import { useTranslation } from "react-i18next";

const StatisticCardItem = ({ title, sum, countCurrent, icon }) => {
  const { t } = useTranslation();

  return (
    <div className={classes.statisticItem}>
      <div className={classes.statisticItem__top}>
        <div className={classes["statisticItem__top--left"]}>
          <div className={classes["statisticItem__top--left--title"]}>
            {t(title)}
          </div>
          <div className={classes["statisticItem__top--left--count"]}>
            {sum}
          </div>
        </div>
        <div className={classes["statisticItem__top--right"]}>
          <FaUsers className={classes["statisticItem__top--right--icon"]} />
        </div>
      </div>
      <div className={classes.statisticItem__bottom}>
        <span className={classes["statisticItem__bottom--left"]}>
          <FaArrowUp /> {countCurrent}
        </span>
        <span className={classes["statisticItem__bottom--right"]}>
          {t("Since yesterday")}
        </span>
      </div>
    </div>
  );
};

export default StatisticCardItem;
