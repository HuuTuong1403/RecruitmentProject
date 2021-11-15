import { AiOutlineGlobal } from "react-icons/ai";
import { dateFormatPicker } from "common/constants/dateFormat";
import { FaBuilding } from "react-icons/fa";
import { Fragment } from "react";
import { IoMdCalendar } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { Modal } from "antd";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import moment from "moment";
import parse from "html-react-parser";
import PopoverField from "custom-fields/PopoverField";

const ModalJobDetail = ({
  showModal,
  onCloseModal,
  data,
  onApprove,
  onReject,
  loading,
}) => {
  const { t } = useTranslation();
  const {
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
  } = data;

  useTitle(jobTitle);

  return (
    <Modal
      centered
      visible={showModal}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      width={1000}
      footer={null}
    >
      <div className={classes.jobDetail__top}>
        <div className={classes["jobDetail__top--wrapped"]}>
          {company?.logo && (
            <div className={classes["jobDetail__top--right"]}>
              <img src={company?.logo} alt={company?.companyName} />
            </div>
          )}
          <div className={classes["jobDetail__top--left"]}>
            {jobTitle && (
              <div className={classes["jobDetail__top--left--jobTitle"]}>
                {jobTitle}
              </div>
            )}
            {company?.companyName && (
              <div className={classes["jobDetail__top--left--companyName"]}>
                <FaBuilding style={{ marginRight: "8px" }} />
                {company?.companyName}
              </div>
            )}
            {company?.companyWebsite && (
              <a
                href={company?.companyWebsite}
                target="_blank"
                rel="noreferrer"
                className={classes["jobDetail__top--left--website"]}
              >
                <AiOutlineGlobal style={{ marginRight: "8px" }} />
                {company?.companyWebsite}
              </a>
            )}
            {finishDate && (
              <div className={classes["jobDetail__top--left--deadline"]}>
                <IoMdCalendar
                  style={{ marginRight: "8px", fontSize: "18px" }}
                />
                {`${t("Deadline to apply")}: ${moment(finishDate).format(
                  dateFormatPicker
                )}`}
              </div>
            )}
            <div className={classes["jobDetail__top--left--actions"]}>
              <PopoverField
                title={t("Confirm rejection of job postings")}
                subTitle={t("Do you want to reject this job posting?")}
                loading={loading}
                onClickOk={onReject}
                titleCancel={t("Cancel")}
                titleOk={t("Reject")}
              >
                <ButtonField
                  backgroundcolor="#ff4d4f"
                  backgroundcolorhover="#ff7875"
                  padding="5px"
                  uppercase
                >
                  {t("Reject")}
                </ButtonField>
              </PopoverField>

              <PopoverField
                title={t("Confirmation of approval for job postings")}
                subTitle={t("Do you want to approve this job posting?")}
                loading={loading}
                onClickOk={onApprove}
                titleCancel={t("Cancel")}
                titleOk={t("approve")}
              >
                <ButtonField
                  backgroundcolor="#067951"
                  backgroundcolorhover="#2baa7e"
                  padding="5px"
                  uppercase
                >
                  {t("approve")}
                </ButtonField>
              </PopoverField>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.jobDetail__content}>
        <div className={classes["jobDetail__content--wrapped"]}>
          {reason && (
            <Fragment>
              <div className={classes["jobDetail__content--wrapped--title"]}>
                {t("Reasons To Join Us")}
              </div>
              <div className={classes["jobDetail__content--wrapped--content"]}>
                {parse(parse(reason))}
              </div>
            </Fragment>
          )}
          {description && (
            <Fragment>
              <div className={classes["jobDetail__content--wrapped--title"]}>
                {t("Job description")}
              </div>
              <div className={classes["jobDetail__content--wrapped--content"]}>
                {parse(parse(description))}
              </div>
            </Fragment>
          )}
          {requirements && (
            <Fragment>
              <div className={classes["jobDetail__content--wrapped--title"]}>
                {t("Job requirements")}
              </div>
              <div className={classes["jobDetail__content--wrapped--content"]}>
                {parse(parse(requirements))}
              </div>
            </Fragment>
          )}
          {benefits && (
            <Fragment>
              <div className={classes["jobDetail__content--wrapped--title"]}>
                {t("Benefits")}
              </div>
              <div className={classes["jobDetail__content--wrapped--content"]}>
                {parse(parse(benefits))}
              </div>
            </Fragment>
          )}
          {responsibilities && (
            <Fragment>
              <div className={classes["jobDetail__content--wrapped--title"]}>
                {t("Responsibilities")}
              </div>
              <div className={classes["jobDetail__content--wrapped--content"]}>
                {parse(parse(responsibilities))}
              </div>
            </Fragment>
          )}
          {skills && (
            <Fragment>
              <div className={classes["jobDetail__content--wrapped--title"]}>
                {t("Skill")}
              </div>
              <div className={classes["container"]}>
                {skills.map((skill, index) => (
                  <div className={classes["container__card-skill"]} key={index}>
                    {skill}
                  </div>
                ))}
              </div>
            </Fragment>
          )}
          <div className={classes["jobDetail__content--wrapped--table"]}>
            <div className={classes["jobDetail__content--wrapped--table--top"]}>
              {t("Recruitment information")}
            </div>
            <div
              className={classes["jobDetail__content--wrapped--table--bottom"]}
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
            </div>
          </div>
          {location && (
            <div className={classes["jobDetail__content--map"]}>
              <div className={classes["jobDetail__content--map--title"]}>
                {t("Workplace address")}
              </div>
              <div className={classes["jobDetail__content--map--location"]}>
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
        </div>
      </div>
    </Modal>
  );
};

export default ModalJobDetail;
