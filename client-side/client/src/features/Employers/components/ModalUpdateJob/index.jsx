import {
  dateFormatISO8601WithZ,
  dateFormatPicker,
} from "common/constants/dateFormat";
import {
  hideSalaryOptions,
  levelOptions,
  positionOptions,
  typeSalaryOptions,
  workingTimeOptions,
} from "common/constants/options";
import {
  selectJobsDetailEmployer,
  selectStatusJobDetail,
} from "features/Employers/slices/selectors";
import { Collapse, Switch, Modal } from "antd";
import { schemaPostJobEmployer } from "common/constants/schema";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import ButtonField from "custom-fields/ButtonField";
import CKEditorField from "custom-fields/CKEditorField";
import classes from "./style.module.scss";
import DatePickerField from "custom-fields/DatePickerField";
import InputBorderField from "custom-fields/InputBorderField";
import InputPostJobField from "../InputPostJobField";
import LabelField from "custom-fields/LabelField";
import LoadingSuspense from "components/Loading";
import moment from "moment";
import notification from "components/Notification";
import parse from "html-react-parser";
import Select from "react-select";
import SelectField from "custom-fields/SelectField";
import SelectLocationField from "custom-fields/SelectLocationField";

const ModalUpdateJob = ({
  showModal,
  onCloseModal,
  selectSkill,
  changeSkillHandler,
  skillList,
  provinces,
  districts,
  wards,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const jobDetail = useSelector(selectJobsDetailEmployer);
  const [hideSalary, setHideSalary] = useState(false);
  const status = useSelector(selectStatusJobDetail);
  const { Panel } = Collapse;

  const optionsLevel = levelOptions.map((item, index) => ({
    value: index === 0 ? t("choose-level") : item.value,
    label: index === 0 ? t("choose-level") : t(item.label),
  }));

  const optionsPosition = positionOptions.map((item, index) => ({
    value: index === 0 ? t("choose-position") : item.value,
    label: index === 0 ? t("choose-position") : t(item.label),
  }));

  const optionsWorkingTime = workingTimeOptions.map((item, index) => ({
    value: index === 0 ? t(item.value) : item.value,
    label: t(item.label),
  }));

  useEffect(() => {
    if (jobDetail?.salary?.min) {
      setHideSalary(true);
    }
  }, [jobDetail?.salary?.min]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaPostJobEmployer),
  });

  const submitUpdateJob = async (dataUpdateJob) => {
    setLoading(true);
    console.log(dataUpdateJob);
    notification("Update success", "successs");
    setLoading(false);
  };

  const disabledDate = (current) => {
    return current && current.valueOf() <= Date.now();
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
      {status ? (
        <LoadingSuspense height="40vh" />
      ) : (
        <div className={classes.modalUpdateJob}>
          <div className={classes.modalUpdateJob__wrapped}>
            {jobDetail && (
              <form onSubmit={handleSubmit(submitUpdateJob)}>
                {/* Job Title */}
                <div className={classes["modalUpdateJob__wrapped--title"]}>
                  <InputBorderField
                    fontSize="21px"
                    bold="normal"
                    placeholder={t("Enter job title")}
                    defaultValue={jobDetail.jobTitle}
                    {...register("jobTitle")}
                    errors={errors?.jobTitle?.message}
                  />
                </div>

                {/* Job Street */}
                <div className={classes.form_group}>
                  <LabelField label={`${t("Address")}:`} />
                  <InputBorderField
                    fontSize="15px"
                    bold="normal"
                    placeholder={t("phd-address")}
                    defaultValue={jobDetail.location?.street}
                    {...register("street")}
                    errors={errors?.street?.message}
                  />
                </div>

                <div className={classes.compulsory}>(*: {t("Compulsory")})</div>

                <div className={classes.bottom}>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={["1", "2", "3", "4"]}
                  >
                    {/* Address information */}
                    {jobDetail.location && (
                      <Panel
                        header={t("Address information")}
                        className={classes.panel}
                        key="1"
                      >
                        <div className={classes.bottom__form_group}>
                          {/* Province */}
                          <div>
                            <LabelField label={t("Province")} isCompulsory />
                            <SelectLocationField
                              setValue={setValue}
                              name="city"
                              control={control}
                              defaultValue={jobDetail.location.city}
                              locationList={provinces}
                              placeholder={t("choose-province")}
                              errors={errors?.city?.message}
                            />
                          </div>

                          {/* District */}
                          <div>
                            <LabelField label={t("District")} isCompulsory />
                            <SelectLocationField
                              setValue={setValue}
                              name="district"
                              control={control}
                              defaultValue={jobDetail.location.district}
                              locationList={districts}
                              placeholder={t("choose-district")}
                              errors={errors?.district?.message}
                            />
                          </div>

                          {/* Ward */}
                          <div>
                            <LabelField label={t("Ward")} isCompulsory />
                            <SelectLocationField
                              name="ward"
                              control={control}
                              defaultValue={jobDetail.location.ward}
                              locationList={wards}
                              placeholder={t("choose-ward")}
                              errors={errors?.ward?.message}
                            />
                          </div>
                        </div>
                      </Panel>
                    )}

                    {/* Job Information */}
                    <Panel
                      header={t("Job information")}
                      className={classes.panel}
                      key="2"
                    >
                      <div className={classes.bottom__job_info}>
                        {/* Job Level */}
                        <div>
                          <LabelField label={t("Level")} isCompulsory />
                          <div>
                            <SelectField
                              name="level"
                              control={control}
                              defaultValue={jobDetail.level}
                              optionList={optionsLevel}
                              placeholder={t("choose-level")}
                              errors={errors?.level?.message}
                            />
                          </div>
                        </div>

                        {/* Job Position */}
                        <div>
                          <LabelField label={t("Position")} isCompulsory />
                          <div>
                            <SelectField
                              name="position"
                              control={control}
                              defaultValue={jobDetail.position}
                              optionList={optionsPosition}
                              placeholder={t("choose-position")}
                              errors={errors?.position?.message}
                            />
                          </div>
                        </div>

                        {jobDetail.workingTime && (
                          <Fragment>
                            {/* Job WorkingTime Start */}
                            <div>
                              <LabelField
                                label={t("Working time start")}
                                isCompulsory
                              />
                              <div>
                                <SelectField
                                  name="workingTimeStart"
                                  control={control}
                                  defaultValue={jobDetail.workingTime.start}
                                  optionList={optionsWorkingTime}
                                  placeholder={t("choose-workingTime")}
                                  errors={errors?.workingTimeStart?.message}
                                />
                              </div>
                            </div>

                            {/* Job WorkingTime Finish */}
                            <div>
                              <LabelField
                                label={t("Working time finish")}
                                isCompulsory
                              />
                              <div>
                                <SelectField
                                  name="workingTimeFinish"
                                  control={control}
                                  defaultValue={jobDetail.workingTime.finish}
                                  optionList={optionsWorkingTime}
                                  placeholder={t("choose-workingTime")}
                                  errors={errors?.workingTimeFinish?.message}
                                />
                              </div>
                            </div>
                          </Fragment>
                        )}

                        {/* Deadline to apply */}
                        <div>
                          <LabelField
                            label={t("Deadline to apply")}
                            isCompulsory
                          />
                          <div>
                            <DatePickerField
                              name="finishDate"
                              control={control}
                              dateFormat={dateFormatPicker}
                              disabledDate={disabledDate}
                              errors={errors?.finishDate?.message}
                              placeholder={t("choose-deadline")}
                              defaultValue={moment(
                                jobDetail.finishDate,
                                dateFormatISO8601WithZ
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </Panel>

                    {/* Salary, skill Information */}
                    <Panel
                      header={t("Salary, skill information")}
                      className={classes.panel}
                      key="3"
                    >
                      <div>
                        <LabelField label={t("Salary")} isCompulsory />
                        <Switch
                          style={{ marginBottom: "5px" }}
                          checkedChildren={t("Hide salary")}
                          unCheckedChildren={t("Show salary")}
                          defaultChecked={hideSalary}
                          checked={hideSalary}
                          onChange={() =>
                            setHideSalary((prevState) => !prevState)
                          }
                        />
                        {hideSalary ? (
                          <div className={classes.bottom__salary}>
                            <div>
                              <SelectField
                                name="type"
                                control={control}
                                defaultValue={
                                  jobDetail.salary.min
                                    ? jobDetail.salary?.type
                                    : "VND"
                                }
                                optionList={typeSalaryOptions}
                              />
                            </div>

                            <div>
                              <InputPostJobField
                                name="min"
                                control={control}
                                defaultValue={jobDetail.salary?.min}
                                errors={errors?.min?.message}
                                placeholder={t("Enter the minimum salary")}
                              />
                            </div>

                            <div>
                              <InputPostJobField
                                name="max"
                                control={control}
                                defaultValue={jobDetail.salary?.max}
                                errors={errors?.max?.message}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <SelectField
                              name="typeHideSalary"
                              control={control}
                              defaultValue={
                                jobDetail.salary?.min
                                  ? "You'll love it"
                                  : jobDetail.salary?.type
                              }
                              optionList={hideSalaryOptions}
                              placeholder={t("choose-workingTime")}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <LabelField label={t("Skill")} />
                        <Select
                          isMulti
                          placeholder={t("choose skills")}
                          options={skillList}
                          value={selectSkill}
                          onChange={changeSkillHandler}
                        />
                      </div>
                    </Panel>

                    {/* Job details */}
                    <Panel
                      header={t("Job details")}
                      className={classes.panel}
                      key="4"
                    >
                      {/* Job Description */}
                      <div className={classes.bottom}>
                        <LabelField label={t("Job description")} isCompulsory />
                        <CKEditorField
                          name="description"
                          control={control}
                          defaultValue={parse(jobDetail.description)}
                          errors={errors?.description?.message}
                        />
                      </div>

                      {/* Job Requirements */}
                      <div className={classes.bottom}>
                        <LabelField
                          label={t("Job requirements")}
                          isCompulsory
                        />
                        <CKEditorField
                          name="requirements"
                          control={control}
                          defaultValue={parse(jobDetail.requirements)}
                          errors={errors?.requirements?.message}
                        />
                      </div>

                      {/* Job Benefits */}
                      <div className={classes.bottom}>
                        <LabelField label={t("Benefits of joining the job")} />
                        <CKEditorField
                          name="benefits"
                          control={control}
                          defaultValue={
                            jobDetail.benefits ? parse(jobDetail.benefits) : ""
                          }
                        />
                      </div>

                      {/* Job Reasons */}
                      <div className={classes.bottom}>
                        <LabelField label={t("Reasons to join this job")} />
                        <CKEditorField
                          name="reason"
                          control={control}
                          defaultValue={
                            jobDetail.reason ? parse(jobDetail.reason) : ""
                          }
                        />
                      </div>

                      {/* Job Responsibilities */}
                      <div className={classes.bottom}>
                        <LabelField
                          label={t("Responsibilities when doing this job")}
                        />
                        <CKEditorField
                          name="responsibilities"
                          control={control}
                          defaultValue={
                            jobDetail.responsibilities
                              ? parse(jobDetail.responsibilities)
                              : ""
                          }
                        />
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                <div className={classes.actions}>
                  <ButtonField
                    type="submit"
                    backgroundcolor="#0a426e"
                    backgroundcolorhover="#0a436ead"
                    loading={loading}
                  >
                    {t("Update")}
                  </ButtonField>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalUpdateJob;
