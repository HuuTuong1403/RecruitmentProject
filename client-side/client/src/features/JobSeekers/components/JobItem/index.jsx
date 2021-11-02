import { BiDollarCircle } from "react-icons/bi";
import { FaBuilding } from "react-icons/fa";
import { IoMdCalendar, IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdLocationOn, MdDeleteForever } from "react-icons/md";
import { Popover } from "antd";
import { removeFavoriteJob } from "features/JobSeekers/api/jobSeeker.api";
import { removeJobOfFavorire } from "features/JobSeekers/slices";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import moment from "moment";
import notification from "components/Notification";

const JobItem = ({ data, isApplied }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    _id,
    company,
    jobTitle,
    salary,
    location,
    aboutCreated,
    finishDate,
    slug,
    isNew,
  } = data;

  const removeSaveJobHandler = async () => {
    setLoading(true);
    const result = await removeFavoriteJob(_id);
    if (result.status === "sucess") {
      dispatch(removeJobOfFavorire(_id));
      notification(`${t("Successfully unsaved job posting")}`, "success");
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
    setLoading(false);
  };

  const content = (
    <div>
      <div>{t("Are you sure to delete this saved job posting?")}</div>
      <div className={classes.jobItem__popover_actions}>
        <ButtonField
          backgroundcolor="#dd4b39"
          backgroundcolorhover="#ff7875"
          padding="2px"
          onClick={() => setShowPopover((prevState) => !prevState)}
        >
          {t("Cancel")}
        </ButtonField>
        <ButtonField
          backgroundcolor="#067951"
          backgroundcolorhover="#2baa7e"
          padding="2px"
          loading={loading}
          onClick={removeSaveJobHandler}
        >
          {t("Ok")}
        </ButtonField>
      </div>
    </div>
  );

  return (
    <div className={classes.jobItem}>
      <div className={classes.jobItem__figure}>
        {isNew && (
          <div className={classes["jobItem__figure--new"]}>{t("New")}</div>
        )}
        {company && (
          <div className={classes["jobItem__figure--image"]}>
            <Link to={`/jobs/employer/${company.companyName}`}>
              <img src={company.logo} alt="" />
            </Link>
          </div>
        )}
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
            <Link to={`/jobs/employer/${company?.companyName}`}>
              <FaBuilding style={{ marginRight: "5px" }} />
              {company?.companyName}
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
              <Popover
                content={content}
                trigger="click"
                title={t("Confirm deletion of saved job posting")}
                visible={showPopover}
                onVisibleChange={() =>
                  setShowPopover((prevState) => !prevState)
                }
              >
                <ButtonField
                  backgroundcolor="#dd4b39"
                  backgroundcolorhover="#bf0000"
                  uppercase
                  padding="5px"
                >
                  <MdDeleteForever style={{ marginRight: "5px" }} />
                  <span>{t("Delete")}</span>
                </ButtonField>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
