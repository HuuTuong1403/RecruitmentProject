import { dateFormatPicker, dateFormatSendServer } from 'common/constants/dateFormat'
import { selectedProvinces, selectedDistricts, selectedWards } from 'features/Home/slices/selectors'
import { selectPostJobData, selectEmployerDetail } from 'features/Employers/slices/selectors'
import { addDataPostJob, resetDataPostJob } from 'features/Employers/slices'
import { clearNullObject } from 'common/functions'
import { getDetailEmployerAsync } from 'features/Employers/slices/thunks'
import { postJobEmployer } from 'features/Employers/api/employer.api'
import { schemaPostJobEmployer } from 'common/constants/schema'
import { ScrollTop } from 'common/functions'
import { selectedSkills } from 'features/Jobs/slices/selectors'
import { Switch } from 'antd'
import {
  hideSalaryOptions,
  levelOptions,
  positionOptions,
  typeSalaryOptions,
  workingTimeOptions,
} from 'common/constants/options'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonField from 'custom-fields/ButtonField'
import CKEditorField from 'custom-fields/CKEditorField'
import classes from './style.module.scss'
import DatePickerField from 'custom-fields/DatePickerField'
import InputPostJobField from 'features/Employers/components/InputPostJobField'
import LabelField from 'custom-fields/LabelField'
import moment from 'moment'
import notification from 'components/Notification'
import Select from 'react-select'
import SelectPostJobField from 'features/Employers/components/SelectPostJobField'

const PostJobPage = () => {
  ScrollTop()
  const { t } = useTranslation()
  useTitle(`${t('postjobs')}`)
  const dispatch = useDispatch()
  const postJobData = useSelector(selectPostJobData)
  const skillAdd = []
  const [loading, setLoading] = useState(false)
  const [hideSalary, setHideSalary] = useState(true)
  const employerDetail = useSelector(selectEmployerDetail)

  useEffect(() => {
    if (!employerDetail) {
      dispatch(getDetailEmployerAsync())
    }
  }, [dispatch, employerDetail])

  const skills = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill }
  })

  const [selectSkill, setSelectSkill] = useState(postJobData?.skills ?? [])

  const optionsLevel = levelOptions.map((item, index) => ({
    value: index === 0 ? t('choose-level') : item.value,
    label: index === 0 ? t('choose-level') : t(item.label),
  }))

  const optionsPosition = positionOptions.map((item, index) => ({
    value: index === 0 ? t('choose-position') : item.value,
    label: index === 0 ? t('choose-position') : t(item.label),
  }))

  const optionsWorkingTime = workingTimeOptions.map((item, index) => ({
    value: index === 0 ? t(item.value) : item.value,
    label: t(item.label),
  }))

  const optionsHideSalary = hideSalaryOptions.map((item) => ({
    value: item.value,
    label: t(item.label),
  }))

  const provinces = useSelector(selectedProvinces)?.map((province) => ({
    label: province.name,
    value: province.code,
  }))
  provinces.unshift({ label: `${t('choose-province')}`, value: '' })

  const districts = useSelector(selectedDistricts)?.map((district) => ({
    label: district.name,
    value: district.code,
  }))
  districts.unshift({ label: `${t('choose-district')}`, value: '' })

  const wards = useSelector(selectedWards)?.map((ward) => ({
    label: ward.name,
    value: ward.code,
  }))
  wards.unshift({ label: `${t('choose-ward')}`, value: '' })

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaPostJobEmployer),
  })

  const postJobHandler = async (dataPostJob) => {
    const {
      jobTitle,
      street,
      min,
      max,
      description,
      requirements,
      city,
      district,
      ward,
      level,
      position,
      workingTimeStart,
      workingTimeFinish,
      finishDate,
      benefits,
      reason,
      typeHideSalary,
      responsibilities,
      type,
    } = dataPostJob

    const payload = {
      workingTime: {
        start: workingTimeStart,
        finish: workingTimeFinish,
      },
      location: {
        city,
        district,
        ward,
        street,
      },
      benefits,
      description,
      jobTitle,
      position,
      reason,
      requirements,
      responsibilities,
      salary: clearNullObject({
        min: hideSalary ? min : null,
        max: hideSalary ? max : null,
        type: hideSalary ? type : typeHideSalary,
      }),
      skills: selectSkill.map((item) => item.label),
      level,
      finishDate: moment(finishDate, dateFormatPicker).format(dateFormatSendServer),
    }

    setLoading(true)
    const result = await postJobEmployer(payload)
    if (result.status === 'success') {
      setLoading(false)
      notification(`${t('Post job successfully')}`, 'success')
      handleResetPostJob()
    } else {
      setLoading(false)
      notification(result.message, 'error')
    }
  }

  const handleAddData = (data) => {
    dispatch(addDataPostJob(data))
  }

  const handleResetPostJob = () => {
    reset({
      street: employerDetail?.address?.street,
      benefits: '',
      description: '',
      district: employerDetail?.address?.district,
      finishDate: '',
      jobTitle: '',
      level: `${t('choose-level')}`,
      position: `${t('choose-position')}`,
      max: '',
      min: '',
      city: employerDetail?.address?.city,
      reason: '',
      requirements: '',
      responsibilities: '',
      type: 'VND',
      typeHideSalary: "You'll love it",
      ward: employerDetail?.address?.ward,
    })
    setSelectSkill([])
    dispatch(resetDataPostJob())
  }

  const disabledDate = (current) => {
    return current && current.valueOf() <= Date.now()
  }

  const changeSkillHandler = (option) => {
    setSelectSkill(option)
    option.forEach((skill) => {
      skillAdd.push({ label: skill.label, value: skill.value })
    })
    handleAddData({ skills: skillAdd })
  }

  return (
    <div className={classes.postjob}>
      <div className={classes.postjob__wrapped}>
        <div className={classes.titleDashboard}>
          {t('postjobs')} <span>(*: {t('Compulsory')})</span>
        </div>
        <form onSubmit={handleSubmit(postJobHandler)}>
          {/* Job Title */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t('Job Title')} isCompulsory />
            <InputPostJobField
              name="jobTitle"
              control={control}
              defaultValue={postJobData?.jobTitle ?? ''}
              handleAddData={handleAddData}
              errors={errors?.jobTitle?.message}
              placeholder={t('Enter job title')}
            />
          </div>

          <div className={classes.postjob__formGroup}>
            <div className={classes['postjob__formGroup--level-date']}>
              {/* Job Level */}
              <div>
                <LabelField label={t('Level')} isCompulsory />
                <div>
                  <SelectPostJobField
                    name="level"
                    control={control}
                    defaultValue={postJobData?.level ?? `${t('choose-level')}`}
                    list={optionsLevel}
                    handleAddData={handleAddData}
                    placeholder={t('choose-level')}
                    errors={errors?.level?.message}
                  />
                </div>
              </div>

              {/* Job Position */}
              <div>
                <LabelField label={t('Position')} isCompulsory />
                <div>
                  <SelectPostJobField
                    name="position"
                    control={control}
                    defaultValue={postJobData?.position ?? `${t('choose-position')}`}
                    list={optionsPosition}
                    handleAddData={handleAddData}
                    placeholder={t('choose-position')}
                    errors={errors?.position?.message}
                  />
                </div>
              </div>

              {/* Job WorkingTime Start */}
              <div>
                <LabelField label={t('Working time start')} isCompulsory />
                <div>
                  <SelectPostJobField
                    name="workingTimeStart"
                    control={control}
                    defaultValue={postJobData?.workingTimeStart ?? `${t('choose-workingTime')}`}
                    list={optionsWorkingTime}
                    handleAddData={handleAddData}
                    placeholder={t('choose-workingTime')}
                    errors={errors?.workingTimeStart?.message}
                  />
                </div>
              </div>

              {/* Job WorkingTime Finish */}
              <div>
                <LabelField label={t('Working time finish')} isCompulsory />
                <div>
                  <SelectPostJobField
                    name="workingTimeFinish"
                    control={control}
                    defaultValue={postJobData?.workingTimeFinish ?? `${t('choose-workingTime')}`}
                    list={optionsWorkingTime}
                    handleAddData={handleAddData}
                    placeholder={t('choose-workingTime')}
                    errors={errors?.workingTimeFinish?.message}
                  />
                </div>
              </div>

              {/* Deadline to apply */}
              <div>
                <LabelField label={t('Deadline to apply')} isCompulsory />
                <div>
                  <DatePickerField
                    name="finishDate"
                    control={control}
                    dateFormat={dateFormatPicker}
                    disabledDate={disabledDate}
                    errors={errors?.finishDate?.message}
                    handleAddData={handleAddData}
                    placeholder={t('choose-deadline')}
                    defaultValue={
                      postJobData?.finishDate
                        ? moment(postJobData?.finishDate, dateFormatPicker)
                        : null
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Job Workplace Address */}
          {employerDetail && employerDetail.address && (
            <div className={classes.postjob__formGroup}>
              <LabelField label={t('Workplace address')} isCompulsory />
              <div className={classes['postjob__formGroup--location']}>
                {/* Job Workplace Street */}
                <div>
                  <InputPostJobField
                    name="street"
                    control={control}
                    defaultValue={postJobData?.street ?? employerDetail.address.street}
                    handleAddData={handleAddData}
                    errors={errors?.street?.message}
                    placeholder={t('Enter workplace address')}
                  />
                </div>

                {/* Job Workplace City */}
                <div>
                  <SelectPostJobField
                    name="city"
                    control={control}
                    defaultValue={postJobData?.city ?? employerDetail.address.city}
                    setValue={setValue}
                    isLocation={true}
                    list={provinces}
                    handleAddData={handleAddData}
                    placeholder={t('choose-province')}
                    errors={errors?.city?.message}
                  />
                </div>

                {/* Job Workplace District */}
                <div>
                  <SelectPostJobField
                    name="district"
                    control={control}
                    defaultValue={postJobData?.district ?? employerDetail.address.district}
                    setValue={setValue}
                    isLocation={true}
                    list={districts}
                    handleAddData={handleAddData}
                    placeholder={t('choose-district')}
                    errors={errors?.district?.message}
                  />
                </div>

                {/* Job Workplace Ward */}
                <div>
                  <SelectPostJobField
                    name="ward"
                    control={control}
                    defaultValue={postJobData?.ward ?? employerDetail.address.ward}
                    list={wards}
                    isLocation={true}
                    handleAddData={handleAddData}
                    placeholder={t('choose-ward')}
                    errors={errors?.ward?.message}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Job Salary */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t('Salary')} isCompulsory />
            <Switch
              style={{ marginBottom: '5px' }}
              checkedChildren={t('Hide salary')}
              unCheckedChildren={t('Show salary')}
              defaultChecked={hideSalary}
              checked={hideSalary}
              onChange={() => setHideSalary((prevState) => !prevState)}
            />
            {hideSalary ? (
              <div className={classes['postjob__formGroup--salary']}>
                <div>
                  <SelectPostJobField
                    name="type"
                    control={control}
                    defaultValue={postJobData?.type ?? 'VND'}
                    list={typeSalaryOptions}
                    handleAddData={handleAddData}
                  />
                </div>

                <div>
                  <InputPostJobField
                    name="min"
                    control={control}
                    defaultValue={postJobData?.min ?? 1}
                    handleAddData={handleAddData}
                    errors={errors?.min?.message}
                    placeholder={t('Enter the minimum salary')}
                  />
                </div>

                <div>
                  <InputPostJobField
                    name="max"
                    control={control}
                    defaultValue={postJobData?.max ?? 10}
                    handleAddData={handleAddData}
                    errors={errors?.max?.message}
                    placeholder={t('Enter the maximum salary')}
                  />
                </div>
              </div>
            ) : (
              <div>
                <SelectPostJobField
                  name="typeHideSalary"
                  control={control}
                  defaultValue={postJobData?.typeHideSalary ?? "You'll love it"}
                  list={optionsHideSalary}
                  handleAddData={handleAddData}
                />
              </div>
            )}
          </div>

          {/* Job Skill */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t('Skill')} />
            <Select
              isMulti
              placeholder={t('choose skills')}
              options={skills}
              value={selectSkill}
              onChange={changeSkillHandler}
            />
          </div>

          {/* Job Description */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t('Job description')} isCompulsory />
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
            <LabelField label={t('Job requirements')} isCompulsory />
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
            <LabelField label={t('Benefits of joining the job')} />
            <CKEditorField
              name="benefits"
              control={control}
              defaultValue={postJobData?.benefits}
              handleAddData={handleAddData}
            />
          </div>

          {/* Job Reasons */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t('Reasons to join this job')} />
            <CKEditorField
              name="reason"
              control={control}
              defaultValue={postJobData?.reason}
              handleAddData={handleAddData}
            />
          </div>

          {/* Job Responsibilities */}
          <div className={classes.postjob__formGroup}>
            <LabelField label={t('Responsibilities when doing this job')} />
            <CKEditorField
              name="responsibilities"
              control={control}
              defaultValue={postJobData?.responsibilities}
              handleAddData={handleAddData}
            />
          </div>

          <div className={classes['postjob__wrapped--actions']}>
            <ButtonField
              type="button"
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#bf0000"
              uppercase
              onClick={handleResetPostJob}
            >
              {t('Cancel')}
            </ButtonField>
            <ButtonField
              type="submit"
              backgroundcolor="#0a426e"
              backgroundcolorhover="#324554"
              uppercase
              loading={loading}
            >
              {t('Post job')}
            </ButtonField>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostJobPage
