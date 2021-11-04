import { createReviewOfCompany } from "features/JobSeekers/api/jobSeeker.api";
import { schemaWriteReview } from "common/constants/schema";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import CKEditorField from "custom-fields/CKEditorField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import LabelField from "custom-fields/LabelField";
import notification from "components/Notification";
import RatingField from "custom-fields/RatingField";

const FormCreateReview = ({ companyDetail, companyName }) => {
  const { t } = useTranslation();
  const [reviewOT, setReviewOT] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
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
      history.goBack();
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
    <form
      onSubmit={handleSubmit(writeReviewHandler)}
      className={classes.formCreate}
    >
      <h3 className={classes.formCreate__title}>{t("Review form")}</h3>

      {/* Review Rating */}
      <div className={classes.formCreate__formGroup}>
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
      <div className={classes.formCreate__formGroup}>
        <LabelField label={t("Title review")} isCompulsory />
        <InputField
          placeholder={t("phd-title-review")}
          {...register("title")}
          errors={errors?.title?.message}
        />
      </div>

      {/* Review OT */}
      <div className={classes.formCreate__formGroup}>
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
      <div className={classes.formCreate__formGroup}>
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
      <div className={classes.formCreate__formGroup}>
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

      <div className={classes.formCreate__actions}>
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
  );
};

export default FormCreateReview;
