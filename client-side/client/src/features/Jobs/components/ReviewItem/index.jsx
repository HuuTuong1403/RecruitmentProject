import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineFrown,
  AiOutlineMeh,
  AiOutlineSmile,
} from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Fragment } from "react";
import { Rate } from "antd";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import moment from "moment";
import parse from "html-react-parser";

const ReviewItem = ({ review }) => {
  const { t } = useTranslation();
  const { title, rating, ot, createdAt, improvement, interesting } = review;

  const otRate = [
    "Totally unsatisfied",
    "Unsatisfied",
    "Normal",
    "Satisfied",
    "Totally satisfied",
  ];
  const otValue = otRate.indexOf(ot) + 1;

  return (
    <div className={classes.reviewItem}>
      <div className={classes.reviewItem__wrapped}>
        <div className={classes.reviewItem__top}>
          <div className={classes["reviewItem__top--title"]}>{title}</div>
          <BiDotsVerticalRounded className={classes["reviewItem__top--icon"]} />
        </div>
        <div className={classes.reviewItem__createDay}>
          {t("Posted on")} {moment(createdAt).format("DD/MM/yyyy")}
        </div>
        <div className={classes.reviewItem__title}>{t("Overall rating")}</div>
        <div className={classes.reviewItem__rating}>
          <div>
            <Rate
              style={{ fontSize: "25px", color: "#4288f5" }}
              value={rating}
              disabled
            />
          </div>
          {rating < 3 ? (
            <div>
              <AiOutlineDislike
                className={classes["reviewItem__rating--icon"]}
              />
              Không khuyến khích
            </div>
          ) : (
            <div className={classes["reviewItem__rating--active"]}>
              <AiOutlineLike className={classes["reviewItem__rating--icon"]} />
              Khuyến khích
            </div>
          )}
        </div>
        <div className={classes.reviewItem__title}>{t("OT mode")}</div>
        <Fragment>
          {otValue < 3 ? (
            <div style={{ color: "red" }} className={classes.reviewItem__ot}>
              <AiOutlineFrown className={classes["reviewItem__ot--icon"]} />
              {t(ot)}
            </div>
          ) : otValue === 3 ? (
            <div style={{ color: "orange" }} className={classes.reviewItem__ot}>
              <AiOutlineMeh className={classes["reviewItem__ot--icon"]} />
              {t(ot)}
            </div>
          ) : (
            <div style={{ color: "green" }} className={classes.reviewItem__ot}>
              <AiOutlineSmile className={classes["reviewItem__ot--icon"]} />
              {t(ot)}
            </div>
          )}
        </Fragment>
        <div className={classes.reviewItem__title}>
          {t("What I like about the company")}
        </div>
        <div className={classes.reviewItem__content}>
          {parse(parse(interesting))}
        </div>
        <div className={classes.reviewItem__title}>
          {t("Suggest improvement")}
        </div>
        <div className={classes.reviewItem__content}>
          {parse(parse(improvement))}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
