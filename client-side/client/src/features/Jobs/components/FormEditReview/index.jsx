import { fetchReviewDetailAsync } from "features/Jobs/slices/thunks";
import { schemaWriteReview } from "common/constants/schema";
import { updateReview } from "features/JobSeekers/api/jobSeeker.api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import CKEditorField from "custom-fields/CKEditorField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";
import notification from "components/Notification";
import parse from "html-react-parser";
import RatingField from "custom-fields/RatingField";

const FormEditReview = ({ review, id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [reviewOT, setReviewOT] = useState(review.ot);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaWriteReview),
  });

  const updateReviewHandler = async (dataReview) => {
    setLoading(true);
    const { title, improvement, rating, interesting } = dataReview;

    const data = {
      title,
      improvement,
      rating,
      interesting,
      ot: reviewOT,
    };
    if (
      review.rating === rating &&
      review.title === title &&
      review.ot === reviewOT &&
      parse(review.improvement) === improvement &&
      parse(review.interesting) === interesting
    ) {
      notification(`${t("Updated data unchanged")}`, "error");
    } else {
      const result = await updateReview({ id, data });
      if (result.status === "success") {
        notification(`${t("Edit successful review")}`, "success");
        dispatch(fetchReviewDetailAsync(id));
      } else {
        notification(
          `${t("Error! An error occurred. Please try again later")}`,
          "error"
        );
      }
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(updateReviewHandler)}
      className={classes.formEdit__form}
    >
      <h3 className={classes.formEdit__title}>{t("Review form")}</h3>
      <div className={classes.compulsory}>(*: {t("Compulsory")})</div>
      
      {/* Review Rating */}
      <div className={classes.formEdit__formGroup}>
        <LabelField label={t("Overall rating")} isCompulsory />
        <div>
          <RatingField
            name="rating"
            fontSize="36px"
            defaultValue={review.rating}
            allowClear
            control={control}
            errors={errors?.rating?.message}
          />
        </div>
      </div>

      {/* Review Title */}
      <div className={classes.formEdit__formGroup}>
        <LabelField label={t("Title review")} isCompulsory />
        <InputField
          placeholder={t("phd-title-review")}
          {...register("title")}
          defaultValue={review.title}
          errors={errors?.title?.message}
        />
      </div>

      {/* Review OT */}
      <div className={classes.formEdit__formGroup}>
        <LabelField label={t("OT mode")} isCompulsory />
        <div>
          <RatingField
            name="ot"
            fontSize="36px"
            isOT
            allowClear
            defaultValue={review.ot}
            setReviewOT={setReviewOT}
            control={control}
            errors={errors?.ot?.message}
          />
        </div>
      </div>

      {/* Review Interesting Of Company */}
      <div className={classes.formEdit__formGroup}>
        <LabelField
          label={t("What do you like about the company?")}
          isCompulsory
        />
        <CKEditorField
          name="interesting"
          control={control}
          defaultValue={review.interesting ? parse(review.interesting) : ""}
          placeholder={t("phd-interesting-review")}
          errors={errors?.interesting?.message}
        />
      </div>

      {/* Review Improvement Of Company */}
      <div className={classes.formEdit__formGroup}>
        <LabelField
          label={t("What the company needs to improve")}
          isCompulsory
        />
        <CKEditorField
          name="improvement"
          control={control}
          defaultValue={review.improvement ? parse(review.improvement) : ""}
          placeholder={t("phd-improvement-review")}
          errors={errors?.improvement?.message}
        />
      </div>

      <div className={classes.formEdit__actions}>
        <ButtonField
          backgroundcolor="#dd4b39"
          backgroundcolorhover="#bf0000"
          uppercase
          type="submit"
          loading={loading}
        >
          {t("Edit review")}
        </ButtonField>
      </div>
    </form>
  );
};

export default FormEditReview;
