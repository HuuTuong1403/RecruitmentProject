import { BiDollarCircle } from "react-icons/bi";
import { dateFormatPicker } from "common/constants/dateFormat";
import { FaBuilding } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import moment from "moment";

const JobActiveItem = ({ jobActive }) => {
  const { t } = useTranslation();
  const { jobTitle, company, salary, location, slug, finishDate } = jobActive;

  return (
    <div className={classes.jobActive}>
      <div className={classes.jobActive__wrapped}>
        <div className={classes["jobActive__wrapped"]}>
          <div className={classes.hideText}>
            <Link
              className={classes["jobActive__wrapped--jobTitle"]}
              to={`/jobs/${slug}`}
            >
              {jobTitle}
            </Link>
          </div>
          <div className={classes.hideText}>
            <FaBuilding style={{ marginRight: "5px" }} />
            {company.companyName}
          </div>
          <div
            className={`${classes["jobActive__wrapped--salary"]} ${classes.hideText}`}
          >
            <BiDollarCircle style={{ marginRight: "5px" }} />
            {salary.min
              ? `${salary.min} - ${salary.max} ${salary.type}`
              : t(salary.type)}
          </div>
          <div className={classes.hideText}>
            <MdLocationOn style={{ marginRight: "5px" }} />
            {location.city}
          </div>
          <div className={classes.hideText}>
            <IoMdCalendar style={{ marginRight: "5px" }} />
            {`${t("Deadline to apply")}: ${moment(finishDate).format(
              dateFormatPicker
            )}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobActiveItem;
