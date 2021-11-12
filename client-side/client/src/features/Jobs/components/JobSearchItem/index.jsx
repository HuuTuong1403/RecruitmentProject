import {
  addFavoriteJob,
  removeFavoriteJob,
} from "features/JobSeekers/api/jobSeeker.api";
import {
  addJobToFavorite,
  removeJobOfFavorire,
} from "features/JobSeekers/slices";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiDollarCircle } from "react-icons/bi";
import { dateFormatPicker } from "common/constants/dateFormat";
import { FaBuilding } from "react-icons/fa";
import { Fragment } from "react";
import { IoMdCalendar, IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { selectedIsFilter } from "features/Jobs/slices/selectors";
import {
  selectJobSeekerLocal,
  selectFavoriteJobs,
} from "features/JobSeekers/slices/selectors";
import { toggleOpenFilter } from "features/Jobs/slices";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import moment from "moment";
import notification from "components/Notification";

const JobSearchItem = ({ job }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isOpen = useSelector(selectedIsFilter);
  const user = selectJobSeekerLocal();
  const favoriteJobs = useSelector(selectFavoriteJobs);

  const {
    _id,
    company,
    jobTitle,
    salary,
    skills,
    location,
    aboutCreated,
    createdAt,
    finishDate,
    slug,
    isNew,
  } = job;

  const handleClickSkill = () => {
    if (isOpen) {
      dispatch(toggleOpenFilter());
    }
  };

  const removeSaveJobHandler = async () => {
    const result = await removeFavoriteJob(_id);
    if (result.status === "success") {
      dispatch(removeJobOfFavorire(_id));
      notification(`${t("Successfully unsaved job posting")}`, "success");
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
  };

  const saveJobHandler = async () => {
    if (user) {
      const result = await addFavoriteJob(_id);
      if (result.status === "success") {
        dispatch(addJobToFavorite(job));
        notification(`${t("Save job posting successfully")}`, "success");
      } else {
        notification(
          `${t("Error! An error occurred. Please try again later")}`,
          "error"
        );
      }
    } else {
      notification(
        `${t(
          "Please login to the job seeker account to perform this function"
        )}`,
        "error"
      );
      history.push("/home/sign-in");
    }
  };

  return (
    <div className={classes.searchItem}>
      <div className={classes.searchItem__figure}>
        {!isNew && (
          <div
            className={`${classes.isNew} ${classes["searchItem__figure--new"]}`}
          >
            {t("New")}
          </div>
        )}
        <div className={classes.imageItem}>
          <Link to={`/jobs/employer/${company?.companyName}`}>
            <img src={company?.logo} alt="" />
          </Link>
        </div>
        <div className={classes["searchItem__figure--figcaption"]}>
          <div className={classes["searchItem__figure--figcaption--jobTitle"]}>
            <Link to={`/jobs/${slug}`}>{jobTitle}</Link>
            <div>
              <IoMdTime style={{ marginRight: "5px", fontSize: "18px" }} />
              {aboutCreated
                .split(" ")
                .map((string) => t(string))
                .join(" ")}
            </div>
          </div>
          <div
            className={classes["searchItem__figure--figcaption--companyName"]}
          >
            <Link to={`/jobs/employer/${company?.companyName}`}>
              <FaBuilding style={{ marginRight: "5px" }} />
              {company?.companyName}
            </Link>
            {favoriteJobs?.some((item) => item._id === _id) ? (
              <div onClick={removeSaveJobHandler}>
                <AiFillHeart style={{ marginRight: "5px", color: "red" }} />
                <span style={{ color: "red" }}>{t("Job posting saved")}</span>
              </div>
            ) : (
              <div onClick={saveJobHandler}>
                <AiOutlineHeart style={{ marginRight: "5px" }} />
                <span>{t("Save Job")}</span>
              </div>
            )}
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
                <Fragment key={index}>
                  <Link
                    onClick={handleClickSkill}
                    to={`/jobs/search?skills=${skill}`}
                  >
                    {skill}
                  </Link>
                  <span>{skills.length - 1 === index ? "" : "|"}</span>
                </Fragment>
              );
            })}
          </div>
          <div className={classes["searchItem__figure--figcaption--date"]}>
            <div>
              <IoMdCalendar style={{ marginRight: "5px", fontSize: "18px" }} />
              {t("post date")}: {moment(createdAt).format(dateFormatPicker)}
            </div>
            <div>
              <IoMdCalendar style={{ marginRight: "5px", fontSize: "18px" }} />
              {t("expiration date")}:{" "}
              {moment(finishDate).format(dateFormatPicker)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchItem;
