import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineFrown,
  AiOutlineMeh,
  AiOutlineSmile,
} from "react-icons/ai";
import { BiDotsHorizontalRounded, BiTrash, BiEdit } from "react-icons/bi";
import { deleteReview } from "features/JobSeekers/api/jobSeeker.api";
import { deleteReviewOfCompany } from "features/Jobs/slices";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Rate, Menu, Dropdown } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import moment from "moment";
import notification from "components/Notification";
import parse from "html-react-parser";
import PopoverField from "custom-fields/PopoverField";

const ReviewItem = ({
  review = null,
  currentUser = null,
  companyName = "",
}) => {
  const { t } = useTranslation();
  const { _id, title, rating, ot, createdAt, improvement, interesting, user } =
    review;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const otRate = [
    "Totally unsatisfied",
    "Unsatisfied",
    "Normal",
    "Satisfied",
    "Totally satisfied",
  ];
  const otValue = otRate.indexOf(ot) + 1;

  const handleDeleteReview = async () => {
    setLoading(true);
    const result = await deleteReview(_id);
    if (result.status === 204) {
      notification(`${t("Deleting successful review")}`, "success");
      dispatch(deleteReviewOfCompany(_id));
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
    setLoading(false);
  };

  const menuOfCurrentUser = (
    <Menu>
      <Menu.Item key="0">
        <div className={classes.reviewItem__listTile}>
          <BiEdit className={classes["reviewItem__listTile--icon"]} />
          <Link
            to={`/jobs/employer/${companyName}/review?type=update&id=${_id}`}
          >
            {t("Edit review")}
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <PopoverField
          title={t("Confirm deletion of this review")}
          subTitle={t("Do you want to delete this review?")}
          titleCancel={t("Cancel")}
          titleOk={t("Delete")}
          loading={loading}
          onClickOk={handleDeleteReview}
        >
          <div className={classes.reviewItem__listTile}>
            <BiTrash className={classes["reviewItem__listTile--icon"]} />
            <span>{t("Delete review")}</span>
          </div>
        </PopoverField>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={classes.reviewItem}>
      <div className={classes.reviewItem__wrapped}>
        <div className={classes.reviewItem__top}>
          <div className={classes["reviewItem__top--title"]}>{title}</div>
          {currentUser?._id === user._id && (
            <Dropdown overlay={menuOfCurrentUser} trigger={["click"]}>
              <BiDotsHorizontalRounded
                className={classes["reviewItem__top--icon"]}
              />
            </Dropdown>
          )}
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
              {t("Not recommended")}
            </div>
          ) : (
            <div className={classes["reviewItem__rating--active"]}>
              <AiOutlineLike className={classes["reviewItem__rating--icon"]} />
              {t("Recommened")}
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
