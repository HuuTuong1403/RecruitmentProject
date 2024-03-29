import {
  fetchAllJobApplicationAsync,
  getDetailJobSeekerAsync,
} from 'features/JobSeekers/slices/thunks'
import { applyJob } from 'features/JobSeekers/api/jobSeeker.api'
import { Modal } from 'antd'
import { schemaApplyJob } from 'common/constants/schema'
import { selectedJobSeekerProfile } from 'features/JobSeekers/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonField, WrappedInput as InputField, LabelField, CKEditorField } from 'custom-fields'
import { InputUploadCv } from 'features/Jobs/components'
import { notification } from 'components'
import classes from './style.module.scss'

export const ModalApplyJob = ({ showModal, onCloseModal, idJob, jobTitle, companyName }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const jobSeeker = useSelector(selectedJobSeekerProfile)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const cvFileRef = useRef(null)

  useEffect(() => {
    if (!jobSeeker) {
      dispatch(getDetailJobSeekerAsync())
    }
  }, [dispatch, jobSeeker])

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaApplyJob),
  })

  const applyJobHandle = async (dataApplyJob) => {
    if (cvFileRef.current.files[0]) {
      setLoading(true)
      const { fullName, phone, description } = dataApplyJob
      const data = new FormData()
      data.append('fullName', fullName)
      data.append('phone', phone)
      data.append('CV', cvFileRef.current.files[0])
      if (description) {
        data.append('description', description)
      }
      const result = await applyJob({ idJob, data })
      if (result.status === 'success') {
        dispatch(fetchAllJobApplicationAsync())
        notification(`${t('Successful job application submission')}`, 'success')
        setLoading(false)
        onCloseModal()
      } else {
        setLoading(false)
        notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
      }
    } else {
      setError('CV file cannot be empty')
    }
  }

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
        <div className={classes.modalTitle}>{t('Submit a job application')}</div>
        <h3 className={classes.modalApplyJob__jobTitle}>
          <span>{t('Apply for the job')}: </span>
          <span>{jobTitle} </span>
          <span>{t('at')} </span>
          <span>{companyName}</span>
        </h3>
        <div className={classes.compulsory}>(*: {t('Compulsory')})</div>
        <form onSubmit={handleSubmit(applyJobHandle)}>
          {/* Full name */}
          <div className={classes.modalApplyJob__formGroup}>
            <div>
              <LabelField label={t('full name')} isCompulsory />
            </div>
            <div>
              <InputField
                placeholder={t('phd-fullname')}
                defaultValue={jobSeeker?.fullname}
                {...register('fullName')}
                errors={errors?.fullName?.message}
              />
            </div>
          </div>

          {/* Phone */}
          <div className={classes.modalApplyJob__formGroup}>
            <div>
              <LabelField label={t('Phone')} isCompulsory />
            </div>
            <div>
              <InputField
                placeholder={t('phd-phone-signup')}
                defaultValue={jobSeeker?.phone}
                {...register('phone')}
                errors={errors?.phone?.message}
              />
            </div>
          </div>

          {/* CV */}
          <div className={classes.modalApplyJob__formGroup}>
            <div>
              <LabelField label={t('CV')} isCompulsory />
            </div>
            <div>
              <InputUploadCv
                error={error}
                setError={setError}
                placeholder={t('Select CV to apply')}
                ref={cvFileRef}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <LabelField
              label={t(
                'What skills, projects or achievements make you a good candidate for this position?'
              )}
            />
            <CKEditorField
              control={control}
              name="description"
              placeholder={t(
                'Give more specific examples to make your application more convincing...'
              )}
            />
          </div>

          <div className={classes.modalApplyJob__actions}>
            <ButtonField
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#bf0000"
              type="submit"
              loading={loading}
              uppercase
            >
              {t('Apply now')}
            </ButtonField>
          </div>
        </form>
      </div>
    </Modal>
  )
}
