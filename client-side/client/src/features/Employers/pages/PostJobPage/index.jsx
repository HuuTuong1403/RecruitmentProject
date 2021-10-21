import { addDataPostJob, resetDataPostJob } from "features/Employers/slices";
import {
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
} from "features/Home/slices/thunks";
import { schemaPostJobEmployer } from "common/constants/schema";
import { ScrollTop } from "common/functions";
import {
  selectedProvinces,
  selectedDistricts,
  selectedWards,
} from "features/Home/slices/selectors";
import { selectedSkills } from "features/Jobs/slices/selectors";
import { selectPostJobData } from "features/Employers/slices/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTitle } from "common/hook/useTitle";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import ButtonField from "custom-fields/ButtonField";
import CKEditorField from "custom-fields/CKEditorField";
import classes from "./style.module.scss";
import DatePickerFieldRHF from "custom-fields/DatePickerFieldRHF";
import LabelField from "custom-fields/LabelField";
import moment from "moment";
import PostJobField from "features/Employers/components/PostJobField";
import Select from "react-select";
import SelectField from "features/Employers/components/SelectField";

const PostJobPage = () => {
  ScrollTop();
  const { t } = useTranslation();
  useTitle(`${t("postjobs")}`);
  const dispatch = useDispatch();
  const postJobData = useSelector(selectPostJobData);
  const dateFormat = "DD/MM/yyyy HH:mm:ss";

  const skills = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill };
  });

  const [selectSkill, setSelectSkill] = useState(postJobData?.skills ?? []);

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

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaPostJobEmployer),
  });

  const postJobHandler = (data) => {
    console.log(data);
  };

  const handleAddData = (data) => {
    dispatch(addDataPostJob(data));
  };

  const handleResetPostJob = () => {
    reset({
      address: "",
      benefits: "",
      description: "",
      district: `${t("choose-district")}`,
      finishDate: "",
      jobTitle: "",
      level: `${t("choose-level")}`,
      max: "",
      min: "",
      province: `${t("choose-province")}`,
      reason: "",
      requirements: "",
      responsibilities: "",
      type: "VND",
      ward: `${t("choose-ward")}`,
    });
    setSelectSkill([]);
    dispatch(resetDataPostJob());
  };

  const typeSalary = [
    { value: "USD", label: "USD" },
    { value: "VND", label: "VND" },
  ];

  const levelSelect = [
    { value: "", label: `${t("choose-level")}` },
    { value: "Senior", label: "Senior" },
    { value: "Junior", label: "Junior" },
    { value: "Fresher", label: "Fresher" },
    { value: "Intern", label: "Intern" },
  ];

  const disabledDate = (current) => {
    return current && current.valueOf() <= Date.now();
  };
  const skillAdd = [];
  const changeSkillHandler = (option) => {
    setSelectSkill(option);
    option.forEach((skill) => {
      skillAdd.push({ label: skill.label, value: skill.value });
    });
    handleAddData({ skills: skillAdd });
  };

  return (
    <div className={classes.postjob}>
      <div className={classes.postjob__wrapped}>
        <div className={classes["postjob__wrapped--title"]}>
          {t("postjobs")}
        </div>
        <form onSubmit={handleSubmit(postJobHandler)}>
          {/* Job Title */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t("Job Title")} isCompulsory={true} />
            <PostJobField
              name="jobTitle"
              control={control}
              defaultValue={postJobData?.jobTitle ?? ""}
              handleAddData={handleAddData}
              errors={errors?.jobTitle?.message}
              placeholder={t("Enter job title")}
            />
          </div>

          {/* Job Description */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t("Job description")} isCompulsory={true} />
            <CKEditorField
              name="description"
              control={control}
              defaultValue={postJobData?.description}
              handleAddData={handleAddData}
              errors={errors?.description?.message}
            />
          </div>

          {/* Job Requirements */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t("Job requirements")} isCompulsory={true} />
            <CKEditorField
              name="requirements"
              control={control}
              defaultValue={postJobData?.requirements}
              handleAddData={handleAddData}
              errors={errors?.requirements?.message}
            />
          </div>

          {/* Job Benefits */}
          <div className={classes.postjob__formGroup}>
            <LabelField
              label={t("Benefits of joining the job")}
              isCompulsory={false}
            />
            <CKEditorField
              name="benefits"
              control={control}
              defaultValue={postJobData?.benefits}
              handleAddData={handleAddData}
            />
          </div>

          {/* Job Reasons */}
          <div className={classes.postjob__formGroup}>
            <LabelField
              label={t("Reasons to join this job")}
              isCompulsory={false}
            />
            <CKEditorField
              name="reason"
              control={control}
              defaultValue={postJobData?.benefits}
              handleAddData={handleAddData}
            />
          </div>

          {/* Job Responsibilities */}
          <div className={classes.postjob__formGroup}>
            <LabelField
              label={t("Responsibilities when doing this job")}
              isCompulsory={false}
            />
            <CKEditorField
              name="responsibilities"
              control={control}
              defaultValue={postJobData?.benefits}
              handleAddData={handleAddData}
            />
          </div>

          {/* Job Workplace Address */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t("Workplace address")} isCompulsory={true} />
            <div className={classes["postjob__formGroup--location"]}>
              <div>
                <PostJobField
                  name="address"
                  control={control}
                  defaultValue={postJobData?.address ?? ""}
                  handleAddData={handleAddData}
                  errors={errors?.address?.message}
                  placeholder={t("Enter workplace address")}
                />
              </div>

              <div>
                <SelectField
                  name="province"
                  control={control}
                  defaultValue={
                    postJobData?.province ?? `${t("choose-province")}`
                  }
                  locationList={provinces}
                  handleAddData={handleAddData}
                  fetchData={fetchDistrictsByProvinceAsync}
                  placeholder={t("choose-province")}
                  errors={errors?.province?.message}
                />
              </div>

              <div>
                <SelectField
                  name="district"
                  control={control}
                  defaultValue={
                    postJobData?.district ?? `${t("choose-district")}`
                  }
                  locationList={districts}
                  handleAddData={handleAddData}
                  fetchData={fetchWardsByDistrictsAsync}
                  placeholder={t("choose-district")}
                  errors={errors?.district?.message}
                />
              </div>

              <div>
                <SelectField
                  name="ward"
                  control={control}
                  defaultValue={postJobData?.ward ?? `${t("choose-ward")}`}
                  locationList={wards}
                  handleAddData={handleAddData}
                  placeholder={t("choose-ward")}
                  errors={errors?.ward?.message}
                />
              </div>
            </div>
          </div>

          {/* Job Salary */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t("Salary")} isCompulsory={true} />

            <div className={classes["postjob__formGroup--salary"]}>
              <div>
                <SelectField
                  name="type"
                  control={control}
                  defaultValue={postJobData?.type ?? "VND"}
                  locationList={typeSalary}
                  handleAddData={handleAddData}
                />
              </div>

              <div>
                <PostJobField
                  name="min"
                  control={control}
                  defaultValue={postJobData?.min ?? ""}
                  handleAddData={handleAddData}
                  errors={errors?.min?.message}
                  placeholder={t("Enter the minimum salary")}
                />
              </div>

              <div>
                <PostJobField
                  name="max"
                  control={control}
                  defaultValue={postJobData?.max ?? ""}
                  handleAddData={handleAddData}
                  errors={errors?.max?.message}
                  placeholder={t("Enter the maximum salary")}
                />
              </div>
            </div>
          </div>

          <div className={classes.postjob__formGroup}>
            <div className={classes["postjob__formGroup--level-date"]}>
              {/* Job Level */}
              <div>
                <LabelField label={t("Level")} isCompulsory={true} />
                <div>
                  <SelectField
                    name="level"
                    control={control}
                    defaultValue={postJobData?.level ?? `${t("choose-level")}`}
                    locationList={levelSelect}
                    handleAddData={handleAddData}
                    placeholder={t("choose-level")}
                    errors={errors?.level?.message}
                  />
                </div>
              </div>

              {/* Deadline to apply */}
              <div>
                <LabelField
                  label={t("Deadline to apply")}
                  isCompulsory={true}
                />
                <div>
                  <DatePickerFieldRHF
                    name="finishDate"
                    control={control}
                    dateFormat={dateFormat}
                    disabledDate={disabledDate}
                    errors={errors?.finishDate?.message}
                    handleAddData={handleAddData}
                    placeholder={t("choose-deadline")}
                    showTime={true}
                    value={
                      postJobData?.finishDate
                        ? moment(postJobData?.finishDate, dateFormat)
                        : null
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Job Skill */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t("Skill")} isCompulsory={false} />
            <Select
              isMulti
              placeholder={t("choose skills")}
              options={skills}
              value={selectSkill}
              onChange={changeSkillHandler}
            />
          </div>

          <div className={classes["postjob__wrapped--actions"]}>
            <ButtonField
              type="submit"
              backgroundcolor="#0a426e"
              backgroundcolorhover="#324554"
              color="#fff"
              radius="20px"
              uppercase="true"
              padding="8px"
            >
              {t("Submit")}
            </ButtonField>
            <ButtonField
              type="button"
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#bf0000"
              color="#fff"
              radius="20px"
              uppercase="true"
              padding="8px"
              onClick={handleResetPostJob}
            >
              {t("Cancel")}
            </ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
