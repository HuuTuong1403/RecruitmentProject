import { createEventEmployer } from 'features/Employers/api/employer.api'
import { dateFormatWithTime, dateFormatWithTimeSendServer } from 'common/constants/dateFormat'
import { schemaPostEvent } from 'common/constants/schema'
import { ScrollToTop } from 'common/functions'
import { selectedProvinces, selectedDistricts, selectedWards } from 'features/Home/slices/selectors'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonField,
  CKEditorField,
  DatePickerField,
  WrappedInput as InputField,
  InputUploadImage,
  LabelField,
  SelectLocationField,
} from 'custom-fields'
import { notification } from 'components'
import classes from './style.module.scss'
import moment from 'moment'

const PostEventPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  useTitle(t('Create a new event'))
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [simpleImage, setSimpleImage] = useState([])
  const [multipleImage, setMultipleImage] = useState([])
  const [errorSimpleImage, setErrorSimpleImage] = useState('')
  const [errorMultipleImage, setErrorMultipleImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [simpleFileName, setSimpleFileName] = useState('')
  const [multipleFileName, setMultipleFileName] = useState('')

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
  } = useForm({ mode: 'all', resolver: yupResolver(schemaPostEvent) })

  const postEventHandler = async (dataEvent) => {
    if (simpleImage[0]) {
      if (multipleImage.length > 0) {
        if (multipleImage.length <= 10) {
          setLoading(true)
          setErrorMultipleImage('')
          const {
            briefDescription,
            city,
            district,
            endTime,
            eventContent,
            eventName,
            eventOrganizer,
            location,
            participantMax,
            startTime,
            street,
            topic,
            ward,
          } = dataEvent

          const payload = new FormData()
          payload.append('eventName', eventName)
          payload.append('topic', topic)
          payload.append('eventOrganizer', eventOrganizer)
          payload.append('participantMax', participantMax)
          payload.append('location', location)
          payload.append('address[street]', street)
          payload.append('address[ward]', ward)
          payload.append('address[district]', district)
          payload.append('address[city]', city)
          payload.append(
            'startTime',
            moment(startTime, dateFormatWithTime).format(dateFormatWithTimeSendServer)
          )
          payload.append(
            'endTime',
            moment(endTime, dateFormatWithTime).format(dateFormatWithTimeSendServer)
          )
          payload.append('briefDescription', briefDescription)
          payload.append('eventContent', eventContent)
          payload.append('imageCover', simpleImage[0].image)
          multipleImage.forEach((item) => payload.append('images', item.image))

          const result = await createEventEmployer(payload)
          if (result.status === 'success') {
            notification(`${t('Successful new event creation')}`, 'success')
            handleResetData()
          } else {
            notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
          }
          setLoading(false)
        } else {
          setErrorMultipleImage('No more than 10 images can be selected')
        }
      } else {
        setErrorMultipleImage('Please choose some other photos')
      }
    } else {
      setErrorSimpleImage('Please select cover photo')
    }
  }

  const handleResetData = () => {
    setSimpleImage([])
    setMultipleImage([])
    setSimpleFileName('')
    setMultipleFileName('')
    reset({
      eventName: '',
      topic: '',
      eventOrganizer: '',
      participantMax: '',
      location: '',
      street: '',
      ward: '',
      district: '',
      city: '',
      startTime: '',
      endTime: '',
      briefDescription: '',
      eventContent: '',
    })
  }

  const disabledStartTime = (current) => {
    const disabledDate = moment(endDate, dateFormatWithTime)
    return current < moment() || current > disabledDate
  }

  const disabledEndTime = (current) => {
    const disabledDate = moment(startDate, dateFormatWithTime)
    return current < disabledDate || current < moment()
  }

  return (
    <div className={classes.postEvent}>
      <div className={classes.postEvent__wrapped}>
        <div className={classes.titleDashboard}>
          {t('Create a new event')} <span>(*: {t('Compulsory')})</span>
        </div>
        <form onSubmit={handleSubmit(postEventHandler)}>
          {/* 1. General information about the event */}
          <div>
            <div className={classes.subTitleDashboard}>
              1. {t('General information about the event')}
            </div>
            <div className={classes.postEvent__formGroupField}>
              {/* Event Name */}
              <div>
                <LabelField label={t('Event name')} isCompulsory />
                <InputField
                  {...register('eventName')}
                  errors={errors?.eventName?.message}
                  placeholder={t('Enter event name')}
                />
              </div>

              {/* Event Topic */}
              <div>
                <LabelField label={t('Event topic')} isCompulsory />
                <InputField
                  {...register('topic')}
                  errors={errors?.topic?.message}
                  placeholder={t('Enter event topic')}
                />
              </div>

              {/* Event Organizer */}
              <div>
                <LabelField label={t('Event organizer')} isCompulsory />
                <InputField
                  {...register('eventOrganizer')}
                  errors={errors?.eventOrganizer?.message}
                  placeholder={t('Enter event organizer')}
                />
              </div>

              {/* Event Location */}
              <div>
                <LabelField label={t('Event venue')} isCompulsory />
                <InputField
                  {...register('location')}
                  errors={errors?.location?.message}
                  placeholder={t('Enter event venue')}
                />
              </div>

              {/* Event Participant Max */}
              <div>
                <LabelField label={t('Maximum number of participants')} isCompulsory />
                <InputField
                  {...register('participantMax')}
                  errors={errors?.participantMax?.message}
                  placeholder={t('phd-participantMax-event')}
                />
              </div>

              {/* Event Start Time */}
              <div>
                <LabelField label={t('Event start time')} isCompulsory />
                <DatePickerField
                  name="startTime"
                  control={control}
                  setDate={setStartDate}
                  dateFormat={dateFormatWithTime}
                  showTime
                  allowClear
                  disabledDate={disabledStartTime}
                  errors={errors?.startTime?.message}
                  placeholder={t('phd-startTime-event')}
                />
              </div>

              {/* Event End Time */}
              <div>
                <LabelField label={t('Event end time')} isCompulsory />
                <DatePickerField
                  name="endTime"
                  control={control}
                  showTime
                  allowClear
                  setDate={setEndDate}
                  dateFormat={dateFormatWithTime}
                  disabledDate={disabledEndTime}
                  errors={errors?.endTime?.message}
                  placeholder={t('phd-endTime-event')}
                />
              </div>
            </div>
          </div>

          {/* 2. Information about the event address */}
          <div>
            <div className={classes.subTitleDashboard}>2. {t('Information about the venue')}</div>
            <div className={classes.postEvent__formGroupField}>
              {/* Event Street */}
              <div>
                <LabelField label={t('Address')} isCompulsory />
                <InputField
                  {...register('street')}
                  errors={errors?.street?.message}
                  placeholder={t('Enter workplace address')}
                />
              </div>

              {/* Event City */}
              <div>
                <LabelField label={t('Province')} isCompulsory />
                <SelectLocationField
                  name="city"
                  control={control}
                  locationList={provinces}
                  placeholder={t('choose-province')}
                  errors={errors?.city?.message}
                  setValue={setValue}
                />
              </div>

              {/* Event District */}
              <div>
                <LabelField label={t('District')} isCompulsory />
                <SelectLocationField
                  name="district"
                  control={control}
                  locationList={districts}
                  placeholder={t('choose-district')}
                  errors={errors?.district?.message}
                  setValue={setValue}
                />
              </div>

              {/* Event Ward */}
              <div>
                <LabelField label={t('Ward')} isCompulsory />
                <SelectLocationField
                  name="ward"
                  control={control}
                  locationList={wards}
                  placeholder={t('choose-ward')}
                  errors={errors?.ward?.message}
                />
              </div>
            </div>
          </div>

          {/* 3. Information about event content */}
          <div>
            <div className={classes.subTitleDashboard}>
              3. {t('Information about event content')}
            </div>

            <div>
              <LabelField label={t('Brief description of the event')} isCompulsory />
              <CKEditorField
                name="briefDescription"
                placeholder={t('phd-briefDescription-event')}
                control={control}
                errors={errors?.briefDescription?.message}
              />
            </div>
            <div>
              <LabelField label={t('Event content')} isCompulsory />
              <CKEditorField
                name="eventContent"
                placeholder={t('phd-eventContent-event')}
                control={control}
                errors={errors?.eventContent?.message}
              />
            </div>
          </div>

          {/* 4. Information about photos of the event */}
          <div>
            <div className={classes.subTitleDashboard}>
              4. {t('Information about photos of the event')}
            </div>

            {/* Event Image Cover */}
            <div>
              <LabelField label={t('Image cover')} isCompulsory />
              <InputUploadImage
                placeholder={t('Choose image cover')}
                images={simpleImage}
                fileName={simpleFileName}
                setFileName={setSimpleFileName}
                error={errorSimpleImage}
                setError={setErrorSimpleImage}
                setImages={setSimpleImage}
              />
            </div>

            {/* Event Some More Image */}
            <div>
              <LabelField label={t('Some more pictures (Up to 10 pictures)')} isCompulsory />
              <InputUploadImage
                placeholder={t('Choose some other pictures')}
                isMultiple
                fileName={multipleFileName}
                setFileName={setMultipleFileName}
                error={errorMultipleImage}
                setError={setErrorMultipleImage}
                images={multipleImage}
                setImages={setMultipleImage}
              />
            </div>
          </div>

          <div className={classes['postjob__wrapped--actions']}>
            <ButtonField
              type="submit"
              backgroundcolor="#0a426e"
              backgroundcolorhover="#324554"
              uppercase
              loading={loading}
            >
              {t('Create a new event')}
            </ButtonField>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostEventPage
