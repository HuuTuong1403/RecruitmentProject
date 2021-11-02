import {
  addFavoriteJob,
  removeFavoriteJob,
} from "features/JobSeekers/api/jobSeeker.api";
import {
  addJobToFavorite,
  removeJobOfFavorire,
} from "features/JobSeekers/slices";
import { AiOutlineGlobal } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { fetchAllFavoriteJobAsync } from "features/JobSeekers/slices/thunks";
import { fetchJobDetailAsync } from "features/Jobs/slices/thunks";
import { Fragment, useEffect, useCallback } from "react";
import { IoMdCalendar } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { ScrollTop } from "common/functions";
import { selectFavoriteJobs } from "features/JobSeekers/slices/selectors";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import {
  selectedJobDetail,
  selectedStatus,
} from "features/Jobs/slices/selectors";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import LoadingSuspense from "components/Loading";
import moment from "moment";
import notification from "components/Notification";
import parse from "html-react-parser";

const JobDetail = () => {
  ScrollTop();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = selectJobSeekerLocal();
  const history = useHistory();
  const favoriteJobs = useSelector(selectFavoriteJobs);

  const getDetail = useCallback(async () => {
    const result = await dispatch(fetchJobDetailAsync(slug));
    if (result.error) {
      history.replace("/jobs/search?type=all");
    }
  }, [dispatch, slug, history]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchAllFavoriteJobAsync());
    }
  }, [dispatch]);

  const jobDetail = useSelector(selectedJobDetail);
  const loading = useSelector(selectedStatus);
  const {
    _id,
    workingTime,
    company,
    scale,
    location,
    benefits,
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

  const removeSaveJobHandler = async () => {
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
  };

  const saveJobHandler = async () => {
    if (user) {
      const result = await addFavoriteJob(_id);
      if (result.status === "sucess") {
        dispatch(addJobToFavorite(jobDetail));
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
    <Fragment>
      {loading ? (
        <LoadingSuspense height="40vh" showText={false} />
      ) : (
        <div className={classes.jobDetail}>
          <div className={classes.jobDetail__top}>
            <div className={classes["jobDetail__top--wrapped"]}>
              {company?.logo && (
                <div>
                  <Link to={`/jobs/employer/${company?.companyName}`}>
                    <img src={company?.logo} alt={company?.companyName} />
                  </Link>
                </div>
              )}
              <div>
                <div>
                  {jobTitle && <div>{jobTitle}</div>}
                  {company?.companyName && (
                    <div>
                      <Link to={`/jobs/employer/${company?.companyName}`}>
                        <FaBuilding style={{ marginRight: "8px" }} />
                        {company?.companyName}
                      </Link>
                    </div>
                  )}
                  {company?.companyWebsite && (
                    <a
                      href={company?.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        classes["jobDetail__top--wrapped--companyWebsite"]
                      }
                    >
                      <AiOutlineGlobal style={{ marginRight: "8px" }} />
                      {company?.companyWebsite}
                    </a>
                  )}
                  {location && (
                    <div>
                      <MdLocationOn style={{ marginRight: "8px" }} />
                      {`${location?.district}, ${location?.city}`}
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
                  {favoriteJobs?.some((item) => item._id === _id) ? (
                    <ButtonField
                      backgroundcolor="rgba(0,0,0,.08)"
                      backgroundcolorhover="#324554a2"
                      color="red"
                      uppercase
                      onClick={removeSaveJobHandler}
                    >
                      <AiFillHeart style={{ marginRight: "8px" }} />
                      {t("Job posting saved")}
                    </ButtonField>
                  ) : (
                    <ButtonField
                      backgroundcolor="rgba(0,0,0,.08)"
                      backgroundcolorhover="#324554a2"
                      color="#999"
                      uppercase
                      onClick={saveJobHandler}
                    >
                      <AiOutlineHeart style={{ marginRight: "8px" }} />
                      {t("Save Job")}
                    </ButtonField>
                  )}

                  <ButtonField
                    backgroundcolor="#0a426e"
                    backgroundcolorhover="#324554"
                    uppercase
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
                      {t("Reasons To Join Us")}
                    </div>
                    <div
                      className={
                        classes["jobDetail__content--wrapped--content"]
                      }
                    >
                      {parse(parse(reason))}
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
                      {parse(parse(description))}
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
                      {parse(parse(requirements))}
                    </div>
                  </Fragment>
                )}
                {benefits && (
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
                      {parse(parse(benefits))}
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
                      {parse(parse(responsibilities))}
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
                          <Link to={`/jobs/search?skills=${skill}`}>
                            {skill}
                          </Link>
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
                        {t("vacancies")}: <span>{t(position)}</span>
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
                    {company && (
                      <div>
                        OT:{" "}
                        <span>
                          {company?.ot
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
                        uppercase
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
