import {
  dateFormatISO8601,
  dateFormatHourMinute,
} from "common/constants/dateFormat";
import { FaUsers, FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { fetchAllEventOfEmployerAsync } from "features/Employers/slices/thunks";
import { Link, useHistory } from "react-router-dom";
import {
  MdAccessTime,
  MdEventAvailable,
  MdEventBusy,
  MdEdit,
} from "react-icons/md";
import { pauseEventEmployer } from "features/Employers/api/employer.api";
import { RiFileList3Line } from "react-icons/ri";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  resetDataEvent,
  resetDataParticipants,
} from "features/Employers/slices";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import moment from "moment";
import notification from "components/Notification";
import PopoverField from "custom-fields/PopoverField";
import Slider from "react-slick";

const EventOfEmployerItem = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const {
    _id,
    aboutCreated,
    address,
    endTime,
    eventName,
    imageCover,
    images,
    isNew,
    location,
    participantMax,
    participantQuantity,
    slug,
    startTime,
    status,
    topic,
  } = data;

  const classNameStatus =
    status === "NotYetOccur"
      ? classes.statusNotYetOccur
      : status === "Occurring"
      ? classes.statusOccur
      : status === "Pausing"
      ? classes.statusPausing
      : classes.statusFinish;

  const handlePausingEvent = async () => {
    setLoading(true);
    const result = await pauseEventEmployer(_id);
    if (result.status === "success") {
      dispatch(fetchAllEventOfEmployerAsync());
      notification(
        `${t("This event has been successfully paused")}`,
        "success"
      );
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
    setLoading(false);
  };

  return (
    <div className={classes.item}>
      <div className={classes.item__wrapped}>
        {isNew && (
          <div className={classes["item__wrapped--new"]}>{t("New")}</div>
        )}
        {status && (
          <div
            className={`${classes["item__wrapped--status"]} ${classNameStatus}`}
          >
            {t("Event")} {t(status)}
          </div>
        )}
      </div>
      <div className={classes.item__top}>
        <div className={classes["item__top--wrapped"]}>
          <Slider
            className={classes["item__top--wrapped--slider"]}
            {...settings}
          >
            {[imageCover, ...images].map((image, index) => {
              return (
                <img
                  className={classes["item__top--wrapped--logo"]}
                  key={index}
                  src={image}
                  alt={image}
                />
              );
            })}
          </Slider>
        </div>
      </div>
      <div className={classes.item__bottom}>
        {/* Event name */}
        <Tooltip title={`${t("Click to see details of event")} ${eventName}`}>
          <Link
            to={`/events/view/${slug}`}
            className={classes["item__bottom--eventName"]}
          >
            {t("Event")} {eventName}
          </Link>
        </Tooltip>

        {/* Event about created */}
        <div className={classes["item__bottom--field"]}>
          <MdAccessTime className={classes.iconField} />
          {t("Posted")}{" "}
          <span>
            {aboutCreated
              .split(" ")
              .map((string) => t(string))
              .join(" ")}
          </span>
        </div>

        {/* Event Topic */}
        <div className={classes["item__bottom--field"]}>
          {t("Event topic")}: <span>{topic}</span>
        </div>

        {/* Event location */}
        <div className={classes["item__bottom--field"]}>
          {t("Held at")}:{" "}
          {address && (
            <Tooltip title={t("View location on google maps")}>
              <a
                href={`https://www.google.com/maps/place/${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                target="_blank"
                rel="noreferrer"
              >
                {location}
              </a>
            </Tooltip>
          )}
        </div>

        {/* Event participate */}
        <div className={classes["item__bottom--field"]}>
          <FaUsers className={classes.iconField} />
          <span>
            {participantQuantity}/{participantMax}{" "}
          </span>
          {t("people have registered to participate")}
        </div>

        {/* Event start time */}
        <div className={classes["item__bottom--field"]}>
          <MdEventAvailable className={classes.iconField} />
          {t("Event start time")}:{" "}
          <span>
            {`${t("Date")} ${moment(startTime, dateFormatISO8601)
              .format(dateFormatHourMinute)
              .split(" ")
              .join(` ${t("At")} `)}`}
          </span>
        </div>

        {/* Event end time */}
        <div className={classes["item__bottom--field"]}>
          <MdEventBusy className={classes.iconField} />
          {t("Event end time")}:{" "}
          <span>
            {`${t("Date")} ${moment(endTime, dateFormatISO8601)
              .format(dateFormatHourMinute)
              .split(" ")
              .join(` ${t("At")} `)}`}
          </span>
        </div>
      </div>

      <div className={classes.item__actions}>
        <ButtonField
          backgroundcolor="#0a426e"
          backgroundcolorhover="#0a436ead"
          padding="2px"
          onClick={() => {
            history.push(`/employers/dashboard/events/${_id}/participants`);
            dispatch(resetDataParticipants());
            dispatch(resetDataEvent());
          }}
        >
          <RiFileList3Line style={{ marginRight: "3px" }} />
          {t("View list")}
        </ButtonField>
        <ButtonField
          backgroundcolor="#067951"
          backgroundcolorhover="#2baa7e"
          padding="2px"
          onClick={() => {
            history.push(`/employers/dashboard/events/${_id}/edit`);
            dispatch(resetDataEvent());
          }}
        >
          <MdEdit style={{ marginRight: "3px" }} />
          {t("Edit")}
        </ButtonField>
        {status === "Pausing" ? (
          <PopoverField
            title={t("Confirm to continue of this event")}
            subTitle={t("Do you want to continue this event?")}
            loading={loading}
            onClickOk={() => {}}
            titleCancel={t("Cancel")}
            titleOk={t("Continue")}
            isSwap
          >
            <ButtonField
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#ff7875"
              padding="2px"
            >
              <FaPlayCircle style={{ marginRight: "3px" }} />
              {t("Continue")}
            </ButtonField>
          </PopoverField>
        ) : (
          <PopoverField
            title={t("Confirm to pause this event")}
            subTitle={t("Do you want to pause this event?")}
            loading={loading}
            onClickOk={handlePausingEvent}
            titleCancel={t("Cancel")}
            titleOk={t("Pausing")}
          >
            <ButtonField
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#ff7875"
              padding="2px"
            >
              <FaPauseCircle style={{ marginRight: "3px" }} />
              {t("Pausing")}
            </ButtonField>
          </PopoverField>
        )}
      </div>
    </div>
  );
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true,
  rows: 1,
  arrows: false,
};

export default EventOfEmployerItem;
