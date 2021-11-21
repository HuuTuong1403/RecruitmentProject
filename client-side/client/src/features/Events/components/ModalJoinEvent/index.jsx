import { applyJoinEvent } from 'features/JobSeekers/api/jobSeeker.api'
import { fetchAllEventJoinedAsync } from 'features/JobSeekers/slices/thunks'
import { fetchDetailEventAsync } from 'features/Events/slices/thunks'
import { Modal } from 'antd'
import { schemaJoinEvent } from 'common/constants/schema'
import { selectedProvinces, selectedDistricts, selectedWards } from 'features/Home/slices/selectors'
import { selectedSkills } from 'features/Jobs/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonField from 'custom-fields/ButtonField'
import classes from './style.module.scss'
import InputField from 'custom-fields/InputField'
import LabelField from 'custom-fields/LabelField'
import notification from 'components/Notification'
import Select from 'react-select'
import SelectLocationField from 'custom-fields/SelectLocationField'

const ModalJoinEvent = ({ showModal, onCloseModal, event, currentUser }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [selectSkill, setSelectSkill] = useState([])

  const { _id, eventName, company, slug } = event

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

  const skills = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill }
  })

  const changeSkillHandler = (option) => {
    setSelectSkill(option)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaJoinEvent),
  })

  const handleJoinEvent = async (dataJoinEvent) => {
    setLoading(true)
    const interestingField = selectSkill.map((item) => item.label)
    const { fullName, phone, ...props } = dataJoinEvent
    const data = {
      address: props,
      fullName,
      phone,
      interestingField,
    }
    const result = await applyJoinEvent({ idEvent: _id, data })
    if (result.status === 'success') {
      dispatch(fetchAllEventJoinedAsync())
      dispatch(fetchDetailEventAsync(slug))
      notification(`${t('Sign up for the event successfully')}`, 'success')
      setSelectSkill([])
      setLoading(false)
      onCloseModal()
    } else {
      setLoading(false)
      if (result.message) {
        notification(`${result.message}`, 'error')
      } else {
        notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
      }
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
      <div className={classes.modalJoinEvent}>
        <div className={classes.modalTitle}>{t('Register to participate in the event')}</div>
        <h3 className={classes.modalJoinEvent__eventName}>
          <span>{t('Join the event')}: </span>
          <span>{eventName} </span>
          <span>{t('of')} </span>
          <span>{company?.companyName}</span>
        </h3>

        <div className={classes.compulsory}>(*: {t('Compulsory')})</div>

        <form onSubmit={handleSubmit(handleJoinEvent)}>
          {/* Full name */}
          <div className={classes.modalJoinEvent__formGroup}>
            <div>
              <LabelField label={t('full name')} isCompulsory />
            </div>
            <div>
              <InputField
                placeholder={t('phd-fullname')}
                defaultValue={currentUser.fullname}
                {...register('fullName')}
                errors={errors?.fullName?.message}
              />
            </div>
          </div>

          {/* Phone */}
          <div className={classes.modalJoinEvent__formGroup}>
            <div>
              <LabelField label={t('Phone')} isCompulsory />
            </div>
            <div>
              <InputField
                placeholder={t('phd-phone-signup')}
                defaultValue={currentUser.phone}
                {...register('phone')}
                errors={errors?.phone?.message}
              />
            </div>
          </div>

          {/* Address */}
          {currentUser.address && (
            <Fragment>
              {/* Street */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('Address')} isCompulsory />
                </div>
                <div>
                  <InputField
                    placeholder={t('phd-address')}
                    defaultValue={currentUser.address.street}
                    {...register('street')}
                    errors={errors?.street?.message}
                  />
                </div>
              </div>
              {/* Ward */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('Ward')} isCompulsory />
                </div>
                <div>
                  <SelectLocationField
                    setValue={setValue}
                    name="ward"
                    control={control}
                    defaultValue={currentUser.address.ward}
                    locationList={wards}
                    placeholder={t('choose-ward')}
                    errors={errors?.ward?.message}
                  />
                </div>
              </div>

              {/* District */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('District')} isCompulsory />
                </div>
                <div>
                  <SelectLocationField
                    setValue={setValue}
                    name="district"
                    control={control}
                    defaultValue={currentUser.address.district}
                    locationList={districts}
                    placeholder={t('choose-district')}
                    errors={errors?.district?.message}
                  />
                </div>
              </div>

              {/* City */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('Province')} isCompulsory />
                </div>
                <div>
                  <SelectLocationField
                    setValue={setValue}
                    name="city"
                    control={control}
                    defaultValue={currentUser.address.city}
                    locationList={provinces}
                    placeholder={t('choose-province')}
                    errors={errors?.city?.message}
                  />
                </div>
              </div>
            </Fragment>
          )}

          {/* Interesting field */}
          <div className={classes.modalJoinEvent__formGroup}>
            <div>
              <LabelField label={t('Interesting field')} />
            </div>
            <div>
              <Select
                isMulti
                placeholder={t('Choose the field that interests you')}
                options={skills}
                value={selectSkill}
                onChange={changeSkillHandler}
              />
            </div>
          </div>

          <div className={classes.modalJoinEvent__actions}>
            <ButtonField
              backgroundcolor="#dd4b39"
              backgroundcolorhover="#bf0000"
              type="submit"
              loading={loading}
              uppercase
            >
              {t('Submit registration form')}
            </ButtonField>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalJoinEvent
