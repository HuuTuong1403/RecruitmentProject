import { BiDollarCircle, BiTrash } from "react-icons/bi";
import { deleteJobPost, deleteJobTrash } from "features/Employers/slices";
import { fetchJobDetailOfEmployerAsync } from "features/Employers/slices/thunks";
import { handChangeJobSlug } from "features/Employers/slices";
import { IoMdCalendar, IoMdEye, IoMdTime } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { MdRestorePage } from "react-icons/md";
import { Popover } from "antd";
import {
  selectedProvinces,
  selectedDistricts,
  selectedWards,
} from "features/Home/slices/selectors";
import { selectedSkills } from "features/Jobs/slices/selectors";
import { selectJobSlug } from "features/Employers/slices/selectors";
import { softDeleteJob, restoreJob } from "features/Employers/api/employer.api";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import ModalUpdateJob from "../ModalUpdateJob";
import moment from "moment";
import notification from "components/Notification";

const JobOfEmployerItem = ({ data, isTrash }) => {
  const {
    _id,
    jobTitle,
    company,
    slug,
    salary,
    location,
    finishDate,
    isNew,
    createdAt,
    aboutCreated,
    skills,
  } = data;

  const { t } = useTranslation();
  const [showModal, setShhowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const slugState = useSelector(selectJobSlug);
  const [loading, setLoading] = useState(false);
  const [selectSkill, setSelectSkill] = useState([]);

  const skillList = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill };
  });

  const provinces = useSelector(selectedProvinces)?.map((province) => ({
    label: province.name,
    value: province.code,
  }));
  provinces.unshift({ label: `${t("choose-province")}`, value: "" });

  const districts = useSelector(selectedDistricts)?.map((district) => ({
    label: district.name,
    value: district.code,
  }));
  districts.unshift({ label: `${t("choose-district")}`, value: "" });

  const wards = useSelector(selectedWards)?.map((ward) => ({
    label: ward.name,
    value: ward.code,
  }));
  wards.unshift({ label: `${t("choose-ward")}`, value: "" });

  const handleShowDetail = () => {
    history.push(`/jobs/${slug}`);
  };

  const onOpenModal = () => {
    setShhowModal(true);
    setSelectSkill(skillList?.filter((skill) => skills.includes(skill.label)));
    if (slugState !== slug) {
      dispatch(handChangeJobSlug(slug));
      dispatch(fetchJobDetailOfEmployerAsync(slug));
    }
  };

  const changeSkillHandler = (option) => {
    setSelectSkill(option);
  };

  const onCloseModal = () => {
    setShhowModal(false);
  };

  const handleRestoreJob = async () => {
    setLoading(true);
    const result = await restoreJob(_id);
    dispatch(deleteJobTrash(_id));
    if (result.status === "success") {
      notification(`${t("Successfully restored job postings")}`, "success");
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "success"
      );
    }
    setLoading(false);
  };

  const handleDeleteRecruit = async () => {
    setLoading(true);
    const result = await softDeleteJob(_id);
    dispatch(deleteJobPost(_id));
    if (result.status === 204) {
      notification(
        `${t("Your job posting has been moved to the trash")}`,
        "success"
      );
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "success"
      );
    }
    setLoading(false);
  };

  const content = (
    <div>
      <div>
        {isTrash
          ? t("Do you want to restore this job posting?")
          : t("Are you sure to delete this job posting?")}
      </div>
      <div className={classes.item__popover_actions}>
        <ButtonField
          backgroundcolor={isTrash ? "#dd4b39" : "#067951"}
          backgroundcolorhover={isTrash ? "#ff7875" : "#2baa7e"}
          onClick={() => setShowPopover((prevState) => !prevState)}
          padding="2px"
        >
          {t("Close")}
        </ButtonField>
        <ButtonField
          backgroundcolor={isTrash ? "#067951" : "#dd4b39"}
          backgroundcolorhover={isTrash ? "#2baa7e" : "#ff7875"}
          loading={loading}
          onClick={isTrash ? handleRestoreJob : handleDeleteRecruit}
          padding="2px"
        >
          {isTrash ? t("Restore") : t("Delete")}
        </ButtonField>
      </div>
    </div>
  );

  return (
    <div className={classes.item}>
      <div className={classes.item__wrapped}>
        {isNew && (
          <div className={classes["item__wrapped--new"]}>{t("New")}</div>
        )}
        <div className={classes.item__top}>
          <img
            className={classes["item__top--logo"]}
            src={company?.logo}
            alt={company?.logo}
          />
        </div>
        <div className={classes.item__bottom}>
          <Link
            to={`/jobs/${slug}`}
            className={`${classes.jobTitle} ${classes.hideText}`}
          >
            {jobTitle}
          </Link>
          {salary && (
            <div className={classes["item__bottom--salary"]}>
              <BiDollarCircle style={{ marginRight: "5px" }} />
              {`${t("Salary")} ${salary.min ? salary.min + ` - ` : ""}  ${
                salary.max ? salary.max : ""
              } ${salary.type}`}
            </div>
          )}
          {location && (
            <div>
              <MdLocationOn style={{ marginRight: "5px" }} />
              {location.city}
            </div>
          )}
          <div>
            <IoMdCalendar style={{ marginRight: "5px" }} />
            {`${t("post date")}: ${moment(createdAt).format("DD/MM/yyyy")}`}
          </div>
          <div>
            <IoMdCalendar style={{ marginRight: "5px" }} />
            {`${t("Deadline to apply")}: ${moment(finishDate).format(
              "DD/MM/yyyy"
            )}`}
          </div>
          <div className={classes["item__wrapped--aboutCreated"]}>
            <IoMdTime style={{ marginRight: "5px" }} />
            {`${t("Posted")} ${aboutCreated}`}
          </div>

          <ModalUpdateJob
            provinces={provinces}
            districts={districts}
            wards={wards}
            skillList={skillList}
            changeSkillHandler={changeSkillHandler}
            selectSkill={selectSkill}
            showModal={showModal}
            onCloseModal={onCloseModal}
            title={jobTitle}
          />

          {isTrash ? (
            <div className={classes["item__bottom--actionsTrash"]}>
              <ButtonField
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#ff7875"
                padding="2px"
              >
                <BiTrash className={classes.item__icon} />
                {t("Delete")}
              </ButtonField>
              <Popover
                content={content}
                trigger="click"
                title={t("Confirm to restore job postings")}
                visible={showPopover}
                onVisibleChange={() =>
                  setShowPopover((prevState) => !prevState)
                }
              >
                <ButtonField
                  backgroundcolor="#067951"
                  backgroundcolorhover="#2baa7e"
                  padding="2px"
                >
                  <MdRestorePage className={classes.item__icon} />
                  {t("Restore")}
                </ButtonField>
              </Popover>
            </div>
          ) : (
            <div className={classes["item__bottom--actions"]}>
              <ButtonField
                backgroundcolor="#0a426e"
                backgroundcolorhover="#0a436ead"
                onClick={handleShowDetail}
                padding="2px"
              >
                <IoMdEye className={classes.item__icon} />
                {t("Details")}
              </ButtonField>
              <ButtonField
                backgroundcolor="#067951"
                backgroundcolorhover="#2baa7e"
                onClick={onOpenModal}
                padding="2px"
              >
                <MdEdit className={classes.item__icon} />
                {t("Edit")}
              </ButtonField>
              <Popover
                content={content}
                trigger="click"
                title={t("Confirm deletion of job postings")}
                visible={showPopover}
                onVisibleChange={() =>
                  setShowPopover((prevState) => !prevState)
                }
              >
                <ButtonField
                  backgroundcolor="#dd4b39"
                  backgroundcolorhover="#ff7875"
                  padding="2px"
                >
                  <BiTrash className={classes.item__icon} />
                  {t("Delete")}
                </ButtonField>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobOfEmployerItem;