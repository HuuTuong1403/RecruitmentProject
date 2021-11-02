import {
  selectJobsDetailEmployer,
  selectStatusJobDetail,
} from "features/Employers/slices/selectors";
import { Collapse, Switch } from "antd";
import {
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
} from "features/Home/slices/thunks";
import { Modal } from "antd";
import { schemaPostJobEmployer } from "common/constants/schema";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import ButtonField from "custom-fields/ButtonField";
import CKEditorField from "custom-fields/CKEditorField";
import classes from "./style.module.scss";
import DatePickerFieldRHF from "custom-fields/DatePickerFieldRHF";
import InputProfileField from "../InputProfileField";
import LabelField from "custom-fields/LabelField";
import LoadingSuspense from "components/Loading";
import moment from "moment";
import notification from "components/Notification";
import parse from "html-react-parser";
import PostJobField from "../PostJobField";
import SelectLocationField from "custom-fields/SelectLocationField";
import SelectProfileField from "../SelectProfileField";
import Select from "react-select";

const ModalUpdateJob = (props) => {
  const {
    showModal,
    onCloseModal,
    selectSkill,
    changeSkillHandler,
    skillList,
    provinces,
    districts,
    wards,
  } = props;

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const jobDetail = useSelector(selectJobsDetailEmployer);
  const [hideSalary, setHideSalary] = useState(false);
  const status = useSelector(selectStatusJobDetail);
  const { Panel } = Collapse;

  useEffect(() => {
    if (jobDetail?.salary?.min) {
      setHideSalary(true);
    }
  }, [jobDetail?.salary?.min]);

  const style = {
    fontSize: "16px",
    border: "none",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
  };

  // const dateFormat = "YYYY-MM-DDTHH:mm:ss. sssZ";

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
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

  const handleCancelEdit = () => {
    reset();
  };

  const typeSalary = [
    { value: "USD", label: "USD" },
    { value: "VND", label: "VND" },
  ];

  const optionsLevel = [
    { value: `${t("choose-level")}`, label: `${t("choose-level")}` },
    { value: "Intern", label: `${t("Internship")}` },
    { value: "Junior", label: `${t("Junior Developer")}` },
    { value: "Senior", label: `${t("Senior Developer")}` },
    { value: "Leader", label: `${t("Leader Developer")}` },
    { value: "Mid-level", label: `${t("Mid-level Manager")}` },
    { value: "Senior Leader", label: `${t("Senior Leader")}` },
  ];

  const optionsPosition = [
    { value: `${t("choose-position")}`, label: `${t("choose-position")}` },
    { value: "Network Administrator", label: `${t("Network Administrator")}` },
    { value: "Network Engineering", label: `${t("Network Engineering")}` },
    { value: "Network Leader", label: `${t("Network Leader")}` },
    { value: "Helpdesk Technician", label: `${t("Helpdesk Technician")}` },
    { value: "PC Technician", label: `${t("PC Technician")}` },
    { value: "SeviceDesk Leader", label: `${t("SeviceDesk Leader")}` },
    { value: "Developer", label: `${t("Developer")}` },
    { value: "Tester", label: `${t("Tester")}` },
    {
      value: "Application Development Leader",
      label: `${t("Application Development Leader")}`,
    },
    { value: "Database Developer", label: `${t("Database Developer")}` },
    {
      value: "Database Administrator",
      label: `${t("Database Administrator")}`,
    },
    {
      value: "Business Process Analyst",
      label: `${t("Business Process Analyst")}`,
    },
    { value: "IT Security Staff", label: `${t("IT Security Staff")}` },
    { value: "IT Manager", label: `${t("IT Manager")}` },
    {
      value: "Chief Information Officer",
      label: `${t("Chief Information Officer")}`,
    },
    {
      value: "Chief Security Officer",
      label: `${t("Chief Security Officer")}`,
    },
    {
      value: "Chief Technical Officer",
      label: `${t("Chief Technical Officer")}`,
    },
    {
      value: "Project Manager",
      label: `${t("Project Manager")}`,
    },
  ];

  const optionsWorkingTime = [
    {
      value: `${t("choose-workingTime")}`,
      label: `${t("choose-workingTime")}`,
    },
    { value: "Monday", label: `${t("Monday")}` },
    { value: "Tuesday", label: `${t("Tuesday")}` },
    { value: "Wednesday", label: `${t("Wednesday")}` },
    { value: "Thursday", label: `${t("Thursday")}` },
    { value: "Friday", label: `${t("Friday")}` },
    { value: "Saturday", label: `${t("Saturday")}` },
    { value: "Sunday", label: `${t("Sunday")}` },
  ];

  const optionsHideSalary = [
    { value: "You'll love it", label: `${t("You'll love it")}` },
    { value: "Competitive", label: `${t("Competitive")}` },
  ];

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
        <LoadingSuspense showText={false} height="40vh" />
      ) : (
        <div className={classes.modalUpdateJob}>
          <div className={classes.modalUpdateJob__wrapped}>
            {jobDetail && (
              <form onSubmit={handleSubmit(submitUpdateJob)}>
                {/* Job Title */}
                <div className={classes["modalUpdateJob__wrapped--title"]}>
                  <InputProfileField
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
                  <InputProfileField
                    fontSize="15px"
                    bold="normal"
                    placeholder={t("phd-address")}
                    defaultValue={jobDetail.location?.street}
                    {...register("street")}
                    errors={errors?.street?.message}
                  />
                </div>

                <div className={classes.bottom}>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={["1", "2", "3", "4"]}
                  >
                    {/* Address information */}
                    {jobDetail.location && (
                      <Panel
                        header={t("Address information")}
                        style={style}
                        key="1"
                      >
                        <div className={classes.bottom__form_group}>
                          {/* Province */}
                          <div>
                            <LabelField
                              label={t("Province")}
                              isCompulsory={true}
                            />
                            <SelectLocationField
                              name="city"
                              control={control}
                              defaultValue={jobDetail.location.city}
                              locationList={provinces}
                              fetchData={fetchDistrictsByProvinceAsync}
                              placeholder={t("choose-province")}
                              errors={errors?.city?.message}
                            />
                          </div>

                          {/* District */}
                          <div>
                            <LabelField
                              label={t("District")}
                              isCompulsory={true}
                            />
                            <SelectLocationField
                              name="district"
                              control={control}
                              defaultValue={jobDetail.location.district}
                              locationList={districts}
                              fetchData={fetchWardsByDistrictsAsync}
                              placeholder={t("choose-district")}
                              errors={errors?.district?.message}
                            />
                          </div>

                          {/* Ward */}
                          <div>
                            <LabelField label={t("Ward")} isCompulsory={true} />
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
                    <Panel header={t("Job information")} style={style} key="2">
                      <div className={classes.bottom__job_info}>
                        {/* Job Level */}
                        <div>
                          <LabelField label={t("Level")} isCompulsory={true} />
                          <div>
                            <SelectProfileField
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
                          <LabelField
                            label={t("Position")}
                            isCompulsory={true}
                          />
                          <div>
                            <SelectProfileField
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
                                isCompulsory={true}
                              />
                              <div>
                                <SelectProfileField
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
                                isCompulsory={true}
                              />
                              <div>
                                <SelectProfileField
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
                            isCompulsory={true}
                          />
                          <div>
                            <DatePickerFieldRHF
                              name="finishDate"
                              control={control}
                              dateFormat={"DD/MM/yyyy"}
                              disabledDate={disabledDate}
                              errors={errors?.finishDate?.message}
                              placeholder={t("choose-deadline")}
                              defaultValue={moment(
                                jobDetail.finishDate,
                                "YYYY-MM-DDTHH:mm:ss. sssZ"
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </Panel>

                    {/* Salary, skill Information */}
                    <Panel
                      header={t("Salary, skill information")}
                      style={style}
                      key="3"
                    >
                      <div>
                        <LabelField label={t("Salary")} isCompulsory={true} />
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
                              <SelectProfileField
                                name="type"
                                control={control}
                                defaultValue={
                                  jobDetail.salary.min
                                    ? jobDetail.salary?.type
                                    : "VND"
                                }
                                optionList={typeSalary}
                              />
                            </div>

                            <div>
                              <PostJobField
                                name="min"
                                control={control}
                                defaultValue={jobDetail.salary?.min}
                                errors={errors?.min?.message}
                                placeholder={t("Enter the minimum salary")}
                              />
                            </div>

                            <div>
                              <PostJobField
                                name="max"
                                control={control}
                                defaultValue={jobDetail.salary?.max}
                                errors={errors?.max?.message}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <SelectProfileField
                              name="typeHideSalary"
                              control={control}
                              defaultValue={
                                jobDetail.salary?.min
                                  ? "You'll love it"
                                  : jobDetail.salary?.type
                              }
                              optionList={optionsHideSalary}
                              placeholder={t("choose-workingTime")}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <LabelField label={t("Skill")} isCompulsory={false} />
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
                    <Panel header={t("Job details")} style={style} key="4">
                      {/* Job Description */}
                      <div className={classes.bottom}>
                        <LabelField
                          label={t("Job description")}
                          isCompulsory={true}
                        />
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
                          isCompulsory={true}
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
                        <LabelField
                          label={t("Benefits of joining the job")}
                          isCompulsory={false}
                        />
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
                        <LabelField
                          label={t("Reasons to join this job")}
                          isCompulsory={false}
                        />
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
                          isCompulsory={false}
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
                <div className={classes["modalUpdateJob__wrapped--actions"]}>
                  <div>
                    <ButtonField
                      backgroundcolor="#ff4d4f"
                      backgroundcolorhover="#ff7875"
                      onClick={handleCancelEdit}
                    >
                      {t("Cancel")}
                    </ButtonField>
                  </div>
                  <div>
                    <ButtonField
                      type="submit"
                      backgroundcolor="#0a426e"
                      backgroundcolorhover="#0a436ead"
                      loading={loading}
                    >
                      {t("Update")}
                    </ButtonField>
                  </div>
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
