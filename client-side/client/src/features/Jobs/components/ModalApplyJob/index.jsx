import { applyJob } from "features/JobSeekers/api/jobSeeker.api";
import { fetchAllJobApplicationAsync } from "features/JobSeekers/slices/thunks";
import { getDetailJobSeekerAsync } from "features/JobSeekers/slices/thunks";
import { Modal } from "antd";
import { schemaApplyJob } from "common/constants/schema";
import { selectedJobSeekerProfile } from "features/JobSeekers/slices/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonField from "custom-fields/ButtonField";
import classes from "./style.module.scss";
import InputField from "custom-fields/InputField";
import InputUploadCv from "features/Jobs/components/InputUploadCv";
import LabelField from "custom-fields/LabelField";
import notification from "components/Notification";
import CKEditorField from "custom-fields/CKEditorField";

const ModalApplyJob = ({ showModal, onCloseModal, job }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { _id, jobTitle, company } = job;
  const jobSeeker = useSelector(selectedJobSeekerProfile);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const cvFileRef = useRef(null);

  useEffect(() => {
    if (!jobSeeker) {
      dispatch(getDetailJobSeekerAsync());
    }
  }, [dispatch, jobSeeker]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaApplyJob),
  });

  const applyJobHandle = async (dataApplyJob) => {
    if (cvFileRef.current.files[0]) {
      setLoading(true);
      const { fullName, phone, description } = dataApplyJob;
      const data = new FormData();
      data.append("fullName", fullName);
      data.append("phone", phone);
      data.append("CV", cvFileRef.current.files[0]);
      if (description) {
        data.append("description", description);
      }
      const result = await applyJob({ idJob: _id, data });
      if (result.status === "success") {
        dispatch(fetchAllJobApplicationAsync());
        notification(
          `${t("Successful job application submission")}`,
          "success"
        );
        onCloseModal();
      } else {
        notification(
          `${t("Error! An error occurred. Please try again later")}`,
          "error"
        );
      }
    } else {
      setError("CV file cannot be empty");
    }
    setLoading(false);
  };

  return (
    <Modal
      centered
      visible={showModal}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      width={1000}
      footer={null}
    >
      <div className={classes.modalApplyJob}>
        <div className={classes.modalApplyJob__wrapped}>
          <div className={classes["modalApplyJob__wrapped--title"]}>
            {t("Submit a job application")}
          </div>
          <h3 className={classes["modalApplyJob__wrapped--jobTitle"]}>
            <span>{t("Apply for the job")}: </span>
            <span>{jobTitle} </span>
            <span>{t("at")} </span>
            <span>{company?.companyName}</span>
          </h3>
          <form onSubmit={handleSubmit(applyJobHandle)}>
            {/* Full name */}
            <div className={classes["modalApplyJob__wrapped--formGroup"]}>
              <div>
                <LabelField label={t("full name")} isCompulsory />
              </div>
              <div>
                <InputField
                  placeholder={t("phd-fullname")}
                  defaultValue={jobSeeker?.fullname}
                  {...register("fullName")}
                  errors={errors?.fullName?.message}
                />
              </div>
            </div>

            {/* Phone */}
            <div className={classes["modalApplyJob__wrapped--formGroup"]}>
              <div>
                <LabelField label={t("Phone")} isCompulsory />
              </div>
              <div>
                <InputField
                  placeholder={t("phd-phone-signup")}
                  defaultValue={jobSeeker?.phone}
                  {...register("phone")}
                  errors={errors?.phone?.message}
                />
              </div>
            </div>

            {/* CV */}
            <div className={classes["modalApplyJob__wrapped--formGroup"]}>
              <div>
                <LabelField label={t("CV")} isCompulsory />
              </div>
              <div>
                <InputUploadCv
                  error={error}
                  setError={setError}
                  ref={cvFileRef}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <LabelField
                label={t(
                  "What skills, projects or achievements make you a good candidate for this position?"
                )}
              />
              <CKEditorField
                control={control}
                name="description"
                placeholder={t(
                  "Give more specific examples to make your application more convincing..."
                )}
              />
            </div>

            <div className={classes["modalApplyJob__wrapped--actions"]}>
              <ButtonField
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                type="submit"
                loading={loading}
                uppercase
              >
                {t("Apply now")}
              </ButtonField>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalApplyJob;
