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
import { ButtonField, WrappedInput as InputField, LabelField, SelectField } from 'custom-fields'
import { notification } from 'components'
import classes from './style.module.scss'
import Select from 'react-select'
import { formatArrayForSelect } from 'common/functions'

export const ModalJoinEvent = ({ showModal, onCloseModal, event, currentUser }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [selectSkill, setSelectSkill] = useState([])

  const { _id, eventName, company, slug } = event

  const provinces = formatArrayForSelect(useSelector(selectedProvinces), 'Province', t, true, {
    name: 'choose-province',
    code: '',
  })

  const districts = formatArrayForSelect(useSelector(selectedDistricts), 'District', t, true, {
    name: 'choose-district',
    code: '',
  })

  const wards = formatArrayForSelect(useSelector(selectedWards), 'Wards', t, true, {
    name: 'choose-ward',
    code: '',
  })

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
          {currentUser.address ? (
            <Fragment>
              {/* Field address if current user have address information */}
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
                  <SelectField
                    setValue={setValue}
                    name="ward"
                    control={control}
                    defaultValue={currentUser.address.ward}
                    optionList={wards}
                    placeholder={t('choose-ward')}
                    errors={errors?.ward?.message}
                    isLocation
                  />
                </div>
              </div>

              {/* District */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('District')} isCompulsory />
                </div>
                <div>
                  <SelectField
                    setValue={setValue}
                    name="district"
                    control={control}
                    defaultValue={currentUser.address.district}
                    optionList={districts}
                    placeholder={t('choose-district')}
                    errors={errors?.district?.message}
                    isLocation
                  />
                </div>
              </div>

              {/* City */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('Province')} isCompulsory />
                </div>
                <div>
                  <SelectField
                    setValue={setValue}
                    name="city"
                    control={control}
                    defaultValue={currentUser.address.city}
                    optionList={provinces}
                    placeholder={t('choose-province')}
                    errors={errors?.city?.message}
                    isLocation
                  />
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {/* Field address if current user not have address information */}
              {/* Street */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('Address')} isCompulsory />
                </div>
                <div>
                  <InputField
                    placeholder={t('phd-address')}
                    {...register('street')}
                    errors={errors?.street?.message}
                  />
                </div>
              </div>

              {/* City */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('Province')} isCompulsory />
                </div>
                <div>
                  <SelectField
                    setValue={setValue}
                    name="city"
                    control={control}
                    optionList={provinces}
                    placeholder={t('choose-province')}
                    errors={errors?.city?.message}
                    isLocation
                  />
                </div>
              </div>

              {/* District */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('District')} isCompulsory />
                </div>
                <div>
                  <SelectField
                    setValue={setValue}
                    name="district"
                    control={control}
                    optionList={districts}
                    placeholder={t('choose-district')}
                    errors={errors?.district?.message}
                    isLocation
                  />
                </div>
              </div>

              {/* Ward */}
              <div className={classes.modalJoinEvent__formGroup}>
                <div>
                  <LabelField label={t('Ward')} isCompulsory />
                </div>
                <div>
                  <SelectField
                    setValue={setValue}
                    name="ward"
                    control={control}
                    optionList={wards}
                    placeholder={t('choose-ward')}
                    errors={errors?.ward?.message}
                    isLocation
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
                menuPlacement="top"
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
