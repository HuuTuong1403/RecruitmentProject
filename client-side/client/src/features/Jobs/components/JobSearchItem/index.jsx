import { Link } from "react-router-dom";
import classes from "./style.module.scss";
import { FaBuilding } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { IoMdCalendar, IoMdTime } from "react-icons/io";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { AiOutlineHeart } from "react-icons/ai";
import notification from "components/Notification";
import { useHistory } from "react-router-dom";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";

const JobSearchItem = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const user = selectJobSeekerLocal();

  const {
    logo,
    jobTitle,
    companyName,
    salary,
    skills,
    location,
    aboutCreated,
    createdAt,
    finishDate,
    slug,
    isNew,
  } = props.job;

  const saveJobHandler = () => {
    if (user) {
      console.log("Đã lưu");
    } else {
      notification(`${t("Please sign in to perform this function")}`, "error");
      history.push("/home/sign-in");
    }
  };

  return (
    <div className={classes.searchItem}>
      <div className={classes.searchItem__figure}>
        {isNew && (
          <div className={classes["searchItem__figure--new"]}>{t("New")}</div>
        )}
        <div className={classes["searchItem__figure--image"]}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={classes["searchItem__figure--figcaption"]}>
          <div className={classes["searchItem__figure--figcaption--jobTitle"]}>
            <Link to={`/jobs/${slug}`}>{jobTitle}</Link>
            <div>
              <IoMdTime style={{ marginRight: "5px", fontSize: "18px" }} />
              {aboutCreated}
            </div>
          </div>
          <div
            className={classes["searchItem__figure--figcaption--companyName"]}
          >
            <Link to="/home">
              <FaBuilding style={{ marginRight: "5px" }} />
              {companyName}
            </Link>
            <div onClick={saveJobHandler}>
              <AiOutlineHeart style={{ marginRight: "5px" }} />
              <span>{t("Save Job")}</span>
            </div>
          </div>
          <div className={classes["searchItem__figure--figcaption--salary"]}>
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
          <div className={classes["searchItem__figure--figcaption--skill"]}>
            <div>{t("Skill")}: </div>
            {skills.map((skill, index) => {
              return (
                <div key={index}>
                  {skill} {skills.length - 1 === index ? "" : "|"}
                </div>
              );
            })}
          </div>
          <div className={classes["searchItem__figure--figcaption--date"]}>
            <div>
              <IoMdCalendar style={{ marginRight: "5px", fontSize: "18px" }} />
              {t("post date")}: {moment(createdAt).format("DD/MM/yyyy")}
            </div>
            <div>
              <IoMdCalendar style={{ marginRight: "5px", fontSize: "18px" }} />
              {t("expiration date")}: {moment(finishDate).format("DD/MM/yyyy")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchItem;
