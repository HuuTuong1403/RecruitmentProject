import { BiDollarCircle } from "react-icons/bi";
import { FaBuilding } from "react-icons/fa";
import { IoMdCalendar, IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdLocationOn, MdDeleteForever } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import moment from "moment";

const JobItem = (props) => {
  const { t } = useTranslation();
  const { isApplied } = props;
  const {
    logo,
    jobTitle,
    companyName,
    salary,
    location,
    aboutCreated,
    finishDate,
    slug,
    // isNew,
  } = props.job;

  return (
    <div className={classes.jobItem}>
      <div className={classes.jobItem__figure}>
        {/* {isNew && (
          <div className={classes["jobItem__figure--new"]}>{t("New")}</div>
        )} */}
        <div className={classes["jobItem__figure--image"]}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={classes["jobItem__figure--figcaption"]}>
          {!isApplied ? (
            <div className={classes["jobItem__figure--figcaption--jobTitle"]}>
              <Link to={`/jobs/${slug}`}>{jobTitle}</Link>

              <div>
                <IoMdTime style={{ marginRight: "5px", fontSize: "18px" }} />
                {aboutCreated}
              </div>
            </div>
          ) : (
            <div
              className={
                classes["jobItem__figure--figcaption--jobTitleApplied"]
              }
            >
              <Link to={`/jobs/${slug}`}>{jobTitle}</Link>
            </div>
          )}
          <div className={classes["jobItem__figure--figcaption--companyName"]}>
            <Link to="/home">
              <FaBuilding style={{ marginRight: "5px" }} />
              {companyName}
            </Link>
          </div>
          {!isApplied ? (
            <div className={classes["jobItem__figure--figcaption--salary"]}>
              <div>
                <BiDollarCircle style={{ marginRight: "5px" }} />
                {`${t("Salary")}`}:{" "}
                {salary.min
                  ? `${salary.min} - ${salary.max} ${salary.type}`
                  : `${salary.type}`}
              </div>
              <div>
                <MdLocationOn style={{ marginRight: "5px" }} />
                {location.city}
              </div>
            </div>
          ) : (
            <div className={classes["jobItem__figure--figcaption--city"]}>
              <MdLocationOn style={{ marginRight: "5px" }} />
              {location.city}
            </div>
          )}
          <div className={classes["jobItem__figure--figcaption--date"]}>
            {!isApplied ? (
              <div>
                <IoMdCalendar
                  style={{ marginRight: "5px", fontSize: "18px" }}
                />
                {t("expiration date")}:{" "}
                {moment(finishDate).format("DD/MM/yyyy")}
              </div>
            ) : (
              <div
                className={
                  classes["jobItem__figure--figcaption--date--applied"]
                }
              >
                <IoMdCalendar
                  style={{ marginRight: "5px", fontSize: "18px" }}
                />
                {t("Submission date")}:{" "}
                {moment(finishDate).format("DD/MM/yyyy")}
              </div>
            )}
          </div>
          <div className={classes["jobItem__figure--figcaption--action"]}>
            {!isApplied && (
              <ButtonField
                type="button"
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                color="#fff"
                width="20%"
                radius="20px"
                uppercase="true"
                padding="8px"
              >
                <MdDeleteForever style={{ marginRight: "5px" }} />
                <span>{t("Unsave")}</span>
              </ButtonField>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
