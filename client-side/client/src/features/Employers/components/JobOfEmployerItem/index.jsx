import { BiDollarCircle, BiTrash } from "react-icons/bi";
import { fetchJobDetailOfEmployerAsync } from "features/Employers/slices/thunks";
import { handChangeJobSlug } from "features/Employers/slices";
import { IoMdCalendar, IoMdEye, IoMdTime } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { selectJobSlug } from "features/Employers/slices/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import ModalUpdateJob from "../ModalUpdateJob";
import moment from "moment";

const JobOfEmployerItem = (props) => {
  const {
    jobTitle,
    company,
    slug,
    salary,
    location,
    finishDate,
    isNew,
    createdAt,
    aboutCreated,
  } = props.data;
  const { t } = useTranslation();
  const [showModal, setShhowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const slugState = useSelector(selectJobSlug);

  const handleShowDetail = () => {
    history.push(`/jobs/${slug}`);
  };

  const onOpenModal = () => {
    setShhowModal(true);
    if (slugState !== slug) {
      dispatch(handChangeJobSlug(slug));
      dispatch(fetchJobDetailOfEmployerAsync(slug));
    }
  };

  const onCloseModal = () => {
    setShhowModal(false);
  };

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
            showModal={showModal}
            onCloseModal={onCloseModal}
            title={jobTitle}
          />
          <div className={classes["item__bottom--actions"]}>
            <ButtonField
              backgroundcolor="#0a426e"
              backgroundcolorhover="#0a436ead"
              color="#fff"
              width="100%"
              radius="20px"
              padding="2px"
              onClick={handleShowDetail}
            >
              <IoMdEye className={classes.item__icon} />
              {t("Details")}
            </ButtonField>
            <ButtonField
              backgroundcolor="#067951"
              backgroundcolorhover="#2baa7e"
              color="#fff"
              width="100%"
              radius="20px"
              padding="2px"
              onClick={onOpenModal}
            >
              <MdEdit className={classes.item__icon} />
              {t("Edit")}
            </ButtonField>
            <ButtonField
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#ff7875"
              color="#fff"
              width="100%"
              radius="20px"
              padding="2px"
            >
              <BiTrash className={classes.item__icon} />
              {t("Delete")}
            </ButtonField>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOfEmployerItem;
