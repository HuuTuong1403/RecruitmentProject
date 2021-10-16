import { AiOutlineHeart } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { fetchJobDetailAsync } from "features/Jobs/slices/thunks";
import { Fragment, useEffect } from "react";
import { IoMdCalendar } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { MdLocationOn, MdOpenInBrowser } from "react-icons/md";
import {
  selectedJobDetail,
  selectedStatus,
} from "features/Jobs/slices/selectors";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import LoadingSuspense from "components/Loading";
import moment from "moment";
import notification from "components/Notification";

const JobDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = selectJobSeekerLocal();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchJobDetailAsync(slug));
  }, [dispatch, slug]);

  const jobDetail = useSelector(selectedJobDetail);
  const loading = useSelector(selectedStatus);
  const {
    workingTime,
    companyName,
    companyWebsite,
    logo,
    ot,
    scale,
    location,
    benifits,
    description,
    jobTitle,
    position,
    reason,
    requirements,
    responsibilities,
    salary,
    skills,
    level,
    finishDate,
  } = jobDetail;

  useTitle(jobTitle ?? "");

  const applyNowHandler = () => {
    if (user) {
      console.log("Đã ứng tuyển");
    } else {
      notification(`${t("Please sign in to perform this function")}`, "error");
      history.push("/home/sign-in");
    }
  };

  const saveJobHandler = () => {
    if (user) {
      console.log("Đã lưu tin");
    } else {
      notification(`${t("Please sign in to perform this function")}`, "error");
      history.push("/home/sign-in");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <LoadingSuspense height="40vh" showText={false} />
      ) : (
        <div className={classes.jobDetail}>
          <div className={classes.jobDetail__top}>
            <div className={classes["jobDetail__top--wrapped"]}>
              {logo && (
                <div>
                  <Link to="/home">
                    <img src={logo} alt={logo} />
                  </Link>
                </div>
              )}
              <div>
                <div>
                  {jobTitle && <div>{jobTitle}</div>}
                  {companyName && (
                    <div>
                      <Link to="/home">
                        <FaBuilding style={{ marginRight: "8px" }} />
                        {companyName}
                      </Link>
                    </div>
                  )}
                  {companyWebsite && (
                    <a href={companyWebsite} target="_blank" rel="noreferrer">
                      <MdOpenInBrowser style={{ marginRight: "8px" }} />
                      {companyWebsite}
                    </a>
                  )}
                  {location && (
                    <div>
                      <MdLocationOn style={{ marginRight: "8px" }} />
                      {`Quận ${location?.district}, ${location?.city}`}
                    </div>
                  )}
                  {finishDate && (
                    <div>
                      <IoMdCalendar
                        style={{ marginRight: "8px", fontSize: "18px" }}
                      />
                      {`${t("Deadline to apply")}: ${moment(finishDate).format(
                        "DD/MM/yyyy"
                      )}`}
                    </div>
                  )}
                </div>
                <div>
                  <ButtonField
                    backgroundcolor="rgba(0,0,0,.08)"
                    backgroundcolorhover="#324554"
                    color="#999"
                    type="button"
                    radius="20px"
                    uppercase="true"
                    padding="8px"
                    onClick={saveJobHandler}
                  >
                    <AiOutlineHeart style={{ marginRight: "8px" }} />
                    {t("Save Job")}
                  </ButtonField>

                  <ButtonField
                    backgroundcolor="#0a426e"
                    backgroundcolorhover="#324554"
                    color="#fff"
                    type="button"
                    radius="20px"
                    uppercase="true"
                    padding="8px"
                    onClick={applyNowHandler}
                  >
                    {t("Apply now")}
                  </ButtonField>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.jobDetail__content}>
            <div className={classes["jobDetail__content--wrapped"]}>
              <div>
                {reason && (
                  <Fragment>
                    <div
                      className={classes["jobDetail__content--wrapped--title"]}
                    >
                      {t("Top 3 Reasons To Join Us")}
                    </div>
                    <div
                      className={
                        classes["jobDetail__content--wrapped--content"]
                      }
                    >
                      {reason
                        ?.split("\n")
                        .map((str, index) =>
                          str === "" ? "" : <p key={index}>{str}</p>
                        )}
                    </div>
                  </Fragment>
                )}
                {description && (
                  <Fragment>
                    <div
                      className={classes["jobDetail__content--wrapped--title"]}
                    >
                      {t("Job description")}
                    </div>
                    <div
                      className={
                        classes["jobDetail__content--wrapped--content"]
                      }
                    >
                      {description
                        ?.split("\n")
                        .map((str, index) =>
                          str === "" ? "" : <p key={index}>{str}</p>
                        )}
                    </div>
                  </Fragment>
                )}
                {requirements && (
                  <Fragment>
                    <div
                      className={classes["jobDetail__content--wrapped--title"]}
                    >
                      {t("Job requirements")}
                    </div>
                    <div
                      className={
                        classes["jobDetail__content--wrapped--content"]
                      }
                    >
                      {requirements
                        ?.split("\n")
                        .map((str, index) =>
                          str === "" ? "" : <p key={index}>{str}</p>
                        )}
                    </div>
                  </Fragment>
                )}
                {benifits && (
                  <Fragment>
                    <div
                      className={classes["jobDetail__content--wrapped--title"]}
                    >
                      {t("Benefits")}
                    </div>
                    <div
                      className={
                        classes["jobDetail__content--wrapped--content"]
                      }
                    >
                      {benifits
                        ?.split("\n")
                        .map((str, index) =>
                          str === "" ? "" : <p key={index}>{str}</p>
                        )}
                    </div>
                  </Fragment>
                )}
                {responsibilities && (
                  <Fragment>
                    <div
                      className={classes["jobDetail__content--wrapped--title"]}
                    >
                      {t("Responsibilities")}
                    </div>
                    <div
                      className={
                        classes["jobDetail__content--wrapped--content"]
                      }
                    >
                      {responsibilities
                        ?.split("\n")
                        .map((str, index) =>
                          str === "" ? "" : <p key={index}>{str}</p>
                        )}
                    </div>
                  </Fragment>
                )}
                {skills && (
                  <Fragment>
                    <div
                      className={classes["jobDetail__content--wrapped--title"]}
                    >
                      {t("Skill")}
                    </div>
                    <div className={classes["container"]}>
                      {skills?.map((skill, index) => (
                        <div
                          className={classes["container__card-skill"]}
                          key={index}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </Fragment>
                )}
              </div>
              <div>
                <div className={classes["jobDetail__content--wrapped--table"]}>
                  <div
                    className={
                      classes["jobDetail__content--wrapped--table--top"]
                    }
                  >
                    {t("Recruitment information")}
                  </div>
                  <div
                    className={
                      classes["jobDetail__content--wrapped--table--bottom"]
                    }
                  >
                    {workingTime && (
                      <div>
                        {t("Working time")}:{" "}
                        <span>{`${workingTime?.start} - ${workingTime?.finish}`}</span>
                      </div>
                    )}
                    {position && (
                      <div>
                        {t("vacancies")}: <span>{position}</span>
                      </div>
                    )}
                    {level && (
                      <div>
                        {t("Job level")}: <span>{level}</span>
                      </div>
                    )}
                    {salary && (
                      <div>
                        {t("Salary")}:{" "}
                        <span>
                          {salary?.min
                            ? `${salary.min} - ${salary.max} ${salary.type}`
                            : `${salary?.type}`}
                        </span>
                      </div>
                    )}
                    {scale && (
                      <div>
                        {t("Quantity")}:{" "}
                        <span>
                          {scale} {t("people")}
                        </span>
                      </div>
                    )}
                    {ot && (
                      <div>
                        OT:{" "}
                        <span>
                          {ot
                            ? `${t("Extra salary for OT")}`
                            : `${t("Non-OT")}`}
                        </span>
                      </div>
                    )}
                    {location && (
                      <div>
                        {t("Work location")}: <span>{location?.city}</span>
                      </div>
                    )}
                    <div>
                      <ButtonField
                        backgroundcolor="#0a426e"
                        backgroundcolorhover="#324554"
                        color="#fff"
                        type="button"
                        width="100%"
                        radius="20px"
                        uppercase="true"
                        padding="8px"
                        onClick={applyNowHandler}
                      >
                        {t("Apply now")}
                      </ButtonField>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default JobDetail;
