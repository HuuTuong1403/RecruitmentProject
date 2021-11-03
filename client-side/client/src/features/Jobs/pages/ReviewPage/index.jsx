import { Avatar } from "antd";
import { fetchCompanyDetailAsync } from "features/Jobs/slices/thunks";
import { Link } from "react-router-dom";
import { schemaWriteReview } from "common/constants/schema";
import { ScrollTop } from "common/functions";
import {
  selectedCompanyDetail,
  selectedStatus,
} from "features/Jobs/slices/selectors";
import { createReviewOfCompany } from "features/JobSeekers/api/jobSeeker.api";
import { selectJobSeekerLocal } from "features/JobSeekers/slices/selectors";
import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import CKEditorField from "custom-fields/CKEditorField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";
import LoadingSuspense from "components/Loading";
import notification from "components/Notification";
import RatingField from "custom-fields/RatingField";

const ReviewPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  const { companyName } = useParams();
  const dispatch = useDispatch();
  const user = selectJobSeekerLocal();
  const history = useHistory();
  const companyDetail = useSelector(selectedCompanyDetail);
  const status = useSelector(selectedStatus);
  const [reviewOT, setReviewOT] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaWriteReview),
  });

  useTitle(`${t("Add your review for")} ${companyName}`);

  useEffect(() => {
    if (!user) {
      notification(
        `${t(
          "Please login to the job seeker account to perform this function"
        )}`,
        "error"
      );
      history.push("/home/sign-in");
    }
  });

  const getDetail = useCallback(async () => {
    const result = await dispatch(fetchCompanyDetailAsync(companyName));
    if (result.error) {
      history.replace("/home");
    }
  }, [dispatch, companyName, history]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  const writeReviewHandler = async (dataReview) => {
    setLoading(true);
    const { title, improvement, rating, interesting } = dataReview;
    const idCompany = companyDetail._id;
    const data = {
      title,
      improvement,
      rating,
      interesting,
      ot: reviewOT,
    };
    const result = await createReviewOfCompany({ idCompany, data });
    if (result.status === "success") {
      notification(
        `${t("Submit a review to the company")} ${companyName} ${t(
          "successfully"
        )}`,
        "success"
      );
      reset({
        rating: 0,
        ot: 0,
        title: "",
        improvement: "",
        interesting: "",
      });
      setReviewOT("");
    } else {
      notification(
        `${t("Error! An error occurred. Please try again later")}`,
        "error"
      );
    }
    setLoading(false);
  };

  return (
    <div className={classes.review}>
      {status ? (
        <LoadingSuspense height="40vh" />
      ) : (
        <div className={classes.review__wrapped}>
          {companyDetail && (
            <div className={classes.review__left}>
              <h2 className={classes["review__left--title"]}>
                <div className={classes["review__left--title--subTitle"]}>
                  <div>{t("Review")}</div>
                  <div>{companyName}</div>
                  <div className={classes["review__left--title--subTitle2"]}>
                    {t(
                      "Your review will be of great help to the developer community looking for work."
                    )}
                  </div>
                </div>
                <div className={classes["review__left--title--logo"]}>
                  <Avatar size={150} shape="square" src={companyDetail.logo} />
                </div>
              </h2>

              <form
                onSubmit={handleSubmit(writeReviewHandler)}
                className={classes["review__left--form"]}
              >
                <h3 className={classes["review__left--form--title"]}>
                  {t("Review form")}
                </h3>

                {/* Review Rating */}
                <div className={classes["review__left--form--formGroup"]}>
                  <LabelField label={t("Overall rating")} isCompulsory />
                  <div>
                    <RatingField
                      name="rating"
                      fontSize="36px"
                      allowClear
                      control={control}
                      errors={errors?.rating?.message}
                    />
                  </div>
                </div>

                {/* Review Title */}
                <div className={classes["review__left--form--formGroup"]}>
                  <LabelField label={t("Title review")} isCompulsory />
                  <InputField
                    placeholder={t("phd-title-review")}
                    {...register("title")}
                    errors={errors?.title?.message}
                  />
                </div>

                {/* Review OT */}
                <div className={classes["review__left--form--formGroup"]}>
                  <LabelField label={t("OT mode")} isCompulsory />
                  <div>
                    <RatingField
                      name="ot"
                      fontSize="36px"
                      isOT
                      allowClear
                      setReviewOT={setReviewOT}
                      control={control}
                      errors={errors?.ot?.message}
                    />
                  </div>
                </div>

                {/* Review Interesting Of Company */}
                <div className={classes["review__left--form--formGroup"]}>
                  <LabelField
                    label={t("What do you like about the company?")}
                    isCompulsory
                  />
                  <CKEditorField
                    name="interesting"
                    control={control}
                    placeholder={t("phd-interesting-review")}
                    errors={errors?.interesting?.message}
                  />
                </div>

                {/* Review Improvement Of Company */}
                <div className={classes["review__left--form--formGroup"]}>
                  <LabelField
                    label={t("What the company needs to improve")}
                    isCompulsory
                  />
                  <CKEditorField
                    name="improvement"
                    control={control}
                    placeholder={t("phd-improvement-review")}
                    errors={errors?.improvement?.message}
                  />
                </div>

                <div className={classes["review__left--form--actions"]}>
                  <ButtonField
                    backgroundcolor="#dd4b39"
                    backgroundcolorhover="#bf0000"
                    uppercase
                    type="submit"
                    loading={loading}
                  >
                    {t("Review")}
                  </ButtonField>
                </div>
              </form>
            </div>
          )}
          <div className={classes.review__right}>
            <h2 className={classes["review__right--title"]}>
              {t("Guidelines & Conditions of Evaluation")}
            </h2>
            <div>
              {t(
                "All reviews must comply with the Review Guidelines & Conditions to be displayed on the website."
              )}
            </div>
            <div className={classes["review__right--list"]}>
              <div>{t("Please")}:</div>
              <ul>
                <li>{t("Do not use offensive or derogatory words")}</li>
                <li>{t("Do not provide personal information")}</li>
                <li>
                  {t(
                    "Do not provide confidential information, business secrets of the company"
                  )}
                </li>
              </ul>
            </div>
            <div>
              {t(
                "Thank you for giving the most honest reviews. See more detailed information on the Guidelines & Conditions of assessment"
              )}
            </div>
            <div className={classes["review__right--link"]}>
              <Link to="/">{t("Here")}</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
