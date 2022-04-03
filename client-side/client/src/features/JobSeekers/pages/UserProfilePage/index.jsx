import {
  dateFormatISO8601WithZ,
  dateFormatPicker,
  dateFormatSendServer,
} from 'common/constants/dateFormat'
import { getDetailJobSeekerAsync } from 'features/JobSeekers/slices/thunks'
import { schemaUpdateProfileJobSeeker } from 'common/constants/schema'
import { ScrollToTop } from 'common/functions'
import { selectedJobSeekerProfile, selectedStatus } from 'features/JobSeekers/slices/selectors'
import { selectedProvinces, selectedDistricts, selectedWards } from 'features/Home/slices/selectors'
import { updateProfileJobSeeker } from 'features/JobSeekers/api/jobSeeker.api'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonField,
  DatePickerField,
  WrappedInput as InputField,
  LabelField,
  SelectLocationField,
} from 'custom-fields'
import { notification, LoadingSuspense } from 'components'
import { ProfileJobSeeker } from 'features/JobSeekers/components'
import classes from './style.module.scss'
import moment from 'moment'

const UserProfilePage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  useTitle(`${t('Account Management')}`)

  const detailJobSeeker = useSelector(selectedJobSeekerProfile)
  const status = useSelector(selectedStatus)
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDetailJobSeekerAsync())
  }, [dispatch])

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
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaUpdateProfileJobSeeker),
  })

  const handleUpdateProfile = async (dataUpdateProfile) => {
    setLoading(true)
    const { city, district, ward, street, DOB, fullname, phone } = dataUpdateProfile

    if (
      !avatar &&
      moment(new Date(detailJobSeeker?.DOB)).format(dateFormatPicker) ===
        moment(DOB).format(dateFormatPicker) &&
      city === detailJobSeeker?.address?.city &&
      district === detailJobSeeker?.address?.district &&
      ward === detailJobSeeker?.address?.ward &&
      street === detailJobSeeker?.address?.street &&
      fullname === detailJobSeeker?.fullname &&
      phone === detailJobSeeker?.phone
    ) {
      setLoading(false)
      notification(`${t('Updated data unchanged')}`, 'error')
    } else {
      const date =
        moment(new Date(detailJobSeeker?.DOB)).format(dateFormatPicker) ===
        moment(new Date(DOB)).format(dateFormatPicker)
          ? moment(detailJobSeeker?.DOB).format(dateFormatSendServer)
          : moment(DOB, dateFormatPicker).format(dateFormatSendServer)

      const payload = new FormData()
      payload.append('address[city]', city)
      payload.append('address[district]', district)
      payload.append('address[ward]', ward)
      payload.append('address[street]', street)
      payload.append('fullname', fullname)
      payload.append('phone', phone)
      payload.append('DOB', date)
      payload.append('photo-avatar', avatar)

      const result = await updateProfileJobSeeker(payload)

      if (result.status === 'success') {
        setLoading(false)
        notification(`${t('Update information successful')}`, 'success')
        dispatch(getDetailJobSeekerAsync())
      } else {
        setLoading(false)
        notification(result.message, 'error')
      }
    }
  }

  const handleCancel = () => {
    reset({
      fullname: detailJobSeeker?.fullname,
      phone: detailJobSeeker?.phone,
      city: detailJobSeeker?.address?.city,
      district: detailJobSeeker?.address?.district,
      ward: detailJobSeeker?.address?.ward,
      street: detailJobSeeker?.address?.street,
      DOB: detailJobSeeker?.DOB ? moment(detailJobSeeker.DOB, dateFormatISO8601WithZ) : null,
    })
  }

  const changeAvatar = (file) => {
    setAvatar(file)
  }

  const disabledDate = (current) => {
    return current && current.valueOf() >= Date.now()
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.profile}>
      {detailJobSeeker && (
        <div className={classes.profile__wrapped}>
          <div className={classes.titleDashboard}>
            {t('Account Management')} <span>(*: {t('Compulsory')})</span>
          </div>
          <div className={classes['profile__wrapped--content']}>
            <ProfileJobSeeker changeAvatar={changeAvatar} jobSeeker={detailJobSeeker} />
            <form
              className={classes['profile__wrapped--blockRight']}
              onSubmit={handleSubmit(handleUpdateProfile)}
            >
              <div className={classes['profile__wrapped--blockRight--title']}>
                {t('Personal information')}
              </div>
              <div className={classes['profile__wrapped--blockRight--form']}>
                <div>
                  <LabelField label={t('Email')} />
                  <InputField
                    readOnly
                    placeholder={t('phd-email')}
                    defaultValue={detailJobSeeker.email}
                  />
                </div>
                <div>
                  <LabelField label={t('full name')} isCompulsory />
                  <InputField
                    placeholder={t('phd-fullname')}
                    {...register('fullname')}
                    defaultValue={detailJobSeeker.fullname}
                    errors={errors?.fullname?.message}
                  />
                </div>
                <div>
                  <LabelField label={t('dob')} isCompulsory />
                  <DatePickerField
                    name="DOB"
                    control={control}
                    dateFormat={dateFormatPicker}
                    disabledDate={disabledDate}
                    errors={errors?.DOB?.message}
                    placeholder={t('phd-select-dob')}
                    defaultValue={
                      detailJobSeeker.DOB
                        ? moment(detailJobSeeker.DOB, dateFormatISO8601WithZ)
                        : null
                    }
                  />
                </div>
                <div>
                  <LabelField label={t('phone number')} isCompulsory />
                  <InputField
                    defaultValue={detailJobSeeker.phone}
                    placeholder={t('phd-phone-signup')}
                    {...register('phone')}
                    errors={errors?.phone?.message}
                  />
                </div>
              </div>

              <div className={classes['profile__wrapped--blockRight--title']}>{t('Address')}</div>
              <div className={classes['profile__wrapped--blockRight--form']}>
                <div>
                  <LabelField label={t('Province')} isCompulsory />
                  <SelectLocationField
                    name="city"
                    setValue={setValue}
                    control={control}
                    defaultValue={detailJobSeeker.address?.city}
                    locationList={provinces}
                    placeholder={t('choose-province')}
                    errors={errors?.city?.message}
                  />
                </div>
                <div>
                  <LabelField label={t('District')} isCompulsory />
                  <SelectLocationField
                    name="district"
                    control={control}
                    setValue={setValue}
                    defaultValue={detailJobSeeker.address?.district}
                    locationList={districts}
                    placeholder={t('choose-district')}
                    errors={errors?.district?.message}
                  />
                </div>
                <div>
                  <LabelField label={t('Ward')} isCompulsory />
                  <SelectLocationField
                    name="ward"
                    control={control}
                    defaultValue={detailJobSeeker.address?.ward}
                    locationList={wards}
                    placeholder={t('choose-ward')}
                    errors={errors?.ward?.message}
                  />
                </div>
                <div>
                  <LabelField label={t('Address')} isCompulsory />
                  <InputField
                    defaultValue={detailJobSeeker.address?.street}
                    placeholder={t('phd-address')}
                    {...register('street')}
                    errors={errors?.street?.message}
                  />
                </div>
              </div>
              <div className={classes['profile__wrapped--blockRight--actions']}>
                <ButtonField
                  backgroundcolor="#dd4b39"
                  backgroundcolorhover="#bf0000"
                  uppercase
                  onClick={handleCancel}
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
                  {t('Update Information')}
                </ButtonField>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfilePage
