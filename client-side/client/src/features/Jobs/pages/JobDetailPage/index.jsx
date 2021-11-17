import {
  addFavoriteJob,
  removeFavoriteJob,
} from "features/JobSeekers/api/jobSeeker.api";
import {
  addJobToFavorite,
  removeJobOfFavorire,
} from "features/JobSeekers/slices";
import {
  selectedJobDetail,
  selectedStatus,
} from "features/Jobs/slices/selectors";
import {
  selectFavoriteJobs,
  selectApplicationJobs,
} from "features/JobSeekers/slices/selectors";
import { AiOutlineHeart, AiFillHeart, AiOutlineGlobal } from "react-icons/ai";
import { dateFormatPicker } from "common/constants/dateFormat";
import { FaBuilding } from "react-icons/fa";
import {
  fetchAllFavoriteJobAsync,
  fetchAllJobApplicationAsync,
} from "features/JobSeekers/slices/thunks";
import { fetchJobDetailAsync } from "features/Jobs/slices/thunks";
import { Fragment, useEffect, useCallback, useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { ScrollTop } from "common/functions";
import { selectEmployerLocal } from "features/Employers/slices/selectors";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import LoadingSuspense from "components/Loading";
import ModalApplyJob from "features/Jobs/components/ModalApplyJob";
import ModalSignIn from "components/ModalSignIn";
import moment from "moment";
import notification from "components/Notification";
import parse from "html-react-parser";

const JobDetailPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const { slug } = useParams();
  const history = useHistory();
  const locationUrl = useLocation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const user = selectJobSeekerLocal();
  const employer = selectEmployerLocal();
  const favoriteJobs = useSelector(selectFavoriteJobs);
  const applicationJobs = useSelector(selectApplicationJobs);
  const jobDetail = useSelector(selectedJobDetail);
  const loading = useSelector(selectedStatus);

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
    if (!employer) {
      if (token) {
        dispatch(fetchAllFavoriteJobAsync());
        dispatch(fetchAllJobApplicationAsync());
      }
    }
  }, [dispatch, token, employer]);

  const {
    _id,
    workingTime,
    company,
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

  const onCloseModal = () => {
    setShowModal(false);
  };

  const haveAppliedHandler = () => {
    notification(`${t("You have applied for this job")}`, "error");
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
        dispatch(addJobToFavorite(jobDetail));
        notification(`${t("Save job posting successfully")}`, "success");
      } else {
        notification(
          `${t("Error! An error occurred. Please try again later")}`,
          "error"
        );
      }
    } else {
      if (employer) {
        notification(`${t("Please log out of the employer account")}`, "error");
      } else {
        setShowModal(true);
      }
    }
  };

  const applyJobHandler = () => {
    if (employer) {
      notification(`${t("Please log out of the employer account")}`, "error");
    } else {
      setShowModal(true);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <LoadingSuspense height="40vh" />
      ) : (
        <div className={classes.jobDetail}>
          {user ? (
            <ModalApplyJob
              showModal={showModal}
              onCloseModal={onCloseModal}
              idJob={_id}
              jobTitle={jobTitle}
              companyName={company?.companyName}
            />
          ) : (
            <ModalSignIn showModal={showModal} onCloseModal={onCloseModal} />
          )}
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
                  {finishDate && (
                    <div>
                      <IoMdCalendar
                        style={{ marginRight: "8px", fontSize: "18px" }}
                      />
                      {`${t("Deadline to apply")}: ${moment(finishDate).format(
                        dateFormatPicker
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

                  {applicationJobs?.some((item) => item?.job?._id === _id) ? (
                    <ButtonField
                      backgroundcolor="#0a426e"
                      backgroundcolorhover="#324554"
                      uppercase
                      onClick={haveAppliedHandler}
                    >
                      {t("Have applied")}
                    </ButtonField>
                  ) : (
                    <ButtonField
                      backgroundcolor="#0a426e"
                      backgroundcolorhover="#324554"
                      uppercase
                      onClick={applyJobHandler}
                    >
                      {t("Apply now")}
                    </ButtonField>
                  )}
                  <FacebookShareButton
                    url={`https://mst-recruit.web.app/${locationUrl.pathname}`}
                    quote={jobTitle} 
                    hashtag="#JobInMST"
                  >
                    <FacebookIcon size={20} />
                  </FacebookShareButton>
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
                          <Tooltip
                            title={`${t("View jobs with skill")} ${skill}`}
                          >
                            <Link to={`/jobs/search?skills=${skill}`}>
                              {skill}
                            </Link>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  </Fragment>
                )}
              </div>
              <div>
                {location && (
                  <div className={classes["jobDetail__content--map"]}>
                    <div className={classes["jobDetail__content--map--title"]}>
                      {t("Workplace address")}
                    </div>
                    <div
                      className={classes["jobDetail__content--map--location"]}
                    >
                      <MdLocationOn style={{ marginRight: "8px" }} />
                      {`${location.street}, ${location.ward}, ${location.district}, ${location.city}`}
                    </div>
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBG4gMA71lLD3zLV38JXsvM3SQ-TT39FpM&q=${location.street},${location.ward},${location.district},${location.city}&zoom=15&language=vi`}
                      className={classes["jobDetail__content--map--iframe"]}
                      title="Map"
                    ></iframe>
                  </div>
                )}
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
                        <span>{`${t(workingTime.start)} - ${t(
                          workingTime.finish
                        )}`}</span>
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
                          {salary.min
                            ? `${salary.min} - ${salary.max} ${salary.type}`
                            : t(salary.type)}
                        </span>
                      </div>
                    )}
                    {company && (
                      <div>
                        OT:{" "}
                        <span>
                          {company.ot
                            ? `${t("Extra salary for OT")}`
                            : `${t("Non-OT")}`}
                        </span>
                      </div>
                    )}
                    {location && (
                      <div>
                        {t("Work location")}: <span>{location.city}</span>
                      </div>
                    )}
                    <div>
                      {applicationJobs?.some(
                        (item) => item?.job?._id === _id
                      ) ? (
                        <ButtonField
                          backgroundcolor="#0a426e"
                          backgroundcolorhover="#324554"
                          uppercase
                          onClick={haveAppliedHandler}
                        >
                          {t("Have applied")}
                        </ButtonField>
                      ) : (
                        <ButtonField
                          backgroundcolor="#0a426e"
                          backgroundcolorhover="#324554"
                          uppercase
                          onClick={applyJobHandler}
                        >
                          {t("Apply now")}
                        </ButtonField>
                      )}
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

export default JobDetailPage;
