import {
  dateFormatWithTime,
  dateFormatWithTimeSendServer,
  dateFormatISO8601,
} from 'common/constants/dateFormat'
import { selectedProvinces, selectedDistricts, selectedWards } from 'features/Home/slices/selectors'
import { selectEventDetailEmployer, selectedStatus } from 'features/Employers/slices/selectors'
import { fetchEventDetailAsync } from 'features/Employers/slices/thunks'
import { Fragment, useEffect, useState } from 'react'
import { schemaPostEvent } from 'common/constants/schema'
import { updateEventEmployer } from 'features/Employers/api/employer.api'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonField from 'custom-fields/ButtonField'
import CKEditorField from 'custom-fields/CKEditorField'
import classes from './style.module.scss'
import DatePickerField from 'custom-fields/DatePickerField'
import InputBorderField from 'custom-fields/InputBorderField'
import InputField from 'custom-fields/InputField'
import InputUploadImage from 'custom-fields/InputUploadImage'
import LabelField from 'custom-fields/LabelField'
import LoadingSuspense from 'components/Loading'
import moment from 'moment'
import notification from 'components/Notification'
import SelectLocationField from 'custom-fields/SelectLocationField'
import Slider from 'react-slick'

const UpdateEventPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useDispatch()
  const eventDetail = useSelector(selectEventDetailEmployer)
  const status = useSelector(selectedStatus)
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [simpleImage, setSimpleImage] = useState([])
  const [multipleImage, setMultipleImage] = useState([])
  const [errorSimpleImage, setErrorSimpleImage] = useState('')
  const [errorMultipleImage, setErrorMultipleImage] = useState('')
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

  useTitle(eventDetail?.eventName ?? '')

  useEffect(() => {
    dispatch(fetchEventDetailAsync(id))
  }, [dispatch, id])

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaPostEvent),
  })

  const updateEventHandler = async (dataUpdate) => {
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
      } = dataUpdate

      const start = startDate
        ? moment(startTime, dateFormatWithTime).format(dateFormatWithTimeSendServer)
        : moment(new Date(startTime)).format(dateFormatWithTimeSendServer)

      const end = endDate
        ? moment(endTime, dateFormatWithTime).format(dateFormatWithTimeSendServer)
        : moment(new Date(endTime)).format(dateFormatWithTimeSendServer)

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
      payload.append('startTime', start)
      payload.append('endTime', end)
      payload.append('briefDescription', briefDescription)
      payload.append('eventContent', eventContent)
      if (simpleImage.length > 0) {
        payload.append('imageCover', simpleImage[0].image)
      }
      if (multipleImage.length > 0) {
        multipleImage.forEach((item) => payload.append('images', item.image))
      }
      const result = await updateEventEmployer(id, payload)
      if (result.status === 'success') {
        dispatch(fetchEventDetailAsync(id))
        setSimpleImage([])
        setMultipleImage([])
        setSimpleFileName('')
        setMultipleFileName('')
        notification(`${t('Edit successful event')}`, 'success')
      } else {
        notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
      }
      setLoading(false)
    } else {
      setErrorMultipleImage('No more than 10 images can be selected')
    }
  }

  const disabledStartTime = (current) => {
    const disabledDate = moment(endDate, dateFormatWithTime)
    return current < moment() || current > disabledDate
  }

  const disabledEndTime = (current) => {
    const disabledDate = moment(startDate, dateFormatWithTime)
    return current < disabledDate || current < moment()
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.editEvent}>
      <div className={classes.editEvent__wrapped}>
        <div className={classes.titleDashboard}>
          {t('Edit event')} <span>(*: {t('Compulsory')})</span>
        </div>
        {eventDetail && (
          <Fragment>
            <Slider className={classes.editEvent__slider} {...settings}>
              {eventDetail.images.map((image, index) => {
                return (
                  <img
                    className={classes['editEvent__slider--logo']}
                    key={index}
                    src={image}
                    alt={image}
                  />
                )
              })}
            </Slider>

            <form onSubmit={handleSubmit(updateEventHandler)}>
              {/* 1. General information about the event */}
              <Fragment>
                <div className={classes.subTitleDashboard}>
                  1. {t('General information about the event')}
                </div>
                {/* Event Name */}
                <div className={classes.editEvent__formGroupField}>
                  <div>
                    <LabelField label={t('Event name')} isCompulsory />
                  </div>
                  <div>
                    <InputBorderField
                      fontSize="18px"
                      bold="700"
                      placeholder={t('Enter event name')}
                      defaultValue={eventDetail.eventName}
                      {...register('eventName')}
                      errors={errors?.eventName?.message}
                    />
                  </div>
                </div>

                {/* Event Topic */}
                <div className={classes.editEvent__formGroupField}>
                  <div>
                    <LabelField label={t('Event topic')} isCompulsory />
                  </div>
                  <div>
                    <InputBorderField
                      fontSize="18px"
                      bold="700"
                      placeholder={t('Enter event topic')}
                      defaultValue={eventDetail.topic}
                      {...register('topic')}
                      errors={errors?.topic?.message}
                    />
                  </div>
                </div>

                {/* Event Organizer */}
                <div className={classes.editEvent__formGroupField}>
                  <div>
                    <LabelField label={t('Event organizer')} isCompulsory />
                  </div>
                  <div>
                    <InputBorderField
                      fontSize="18px"
                      bold="700"
                      placeholder={t('Enter event organizer')}
                      defaultValue={eventDetail.eventOrganizer}
                      {...register('eventOrganizer')}
                      errors={errors?.eventOrganizer?.message}
                    />
                  </div>
                </div>

                {/* Event Location */}
                <div className={classes.editEvent__formGroupField}>
                  <div>
                    <LabelField label={t('Event venue')} isCompulsory />
                  </div>
                  <div>
                    <InputBorderField
                      fontSize="18px"
                      bold="700"
                      placeholder={t('Enter event venue')}
                      defaultValue={eventDetail.location}
                      {...register('location')}
                      errors={errors?.location?.message}
                    />
                  </div>
                </div>

                {/* Event Participant Max */}
                <div className={classes.editEvent__formGroupField}>
                  <div>
                    <LabelField label={t('Maximum number of participants')} isCompulsory />
                  </div>
                  <div>
                    <InputBorderField
                      fontSize="18px"
                      bold="700"
                      placeholder={t('phd-participantMax-event')}
                      defaultValue={eventDetail.participantMax}
                      {...register('participantMax')}
                      errors={errors?.participantMax?.message}
                    />
                  </div>
                </div>

                <div className={classes.editEvent__formGroupFlex}>
                  {/* Event Start Time */}
                  <div>
                    <LabelField label={t('Event start time')} isCompulsory />
                    <DatePickerField
                      name="startTime"
                      control={control}
                      setDate={setStartDate}
                      dateFormat={dateFormatWithTime}
                      defaultValue={moment(eventDetail.startTime, dateFormatISO8601)}
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
                      defaultValue={moment(eventDetail.endTime, dateFormatISO8601)}
                      disabledDate={disabledEndTime}
                      errors={errors?.endTime?.message}
                      placeholder={t('phd-endTime-event')}
                    />
                  </div>
                </div>
              </Fragment>

              {/* 2. Information about the event address */}
              {eventDetail.address && (
                <Fragment>
                  <div className={classes.subTitleDashboard}>
                    2. {t('Information about the venue')}
                  </div>
                  <div className={classes.editEvent__formGroupFlex}>
                    {/* Event Street */}
                    <div>
                      <LabelField label={t('Address')} isCompulsory />
                      <InputField
                        {...register('street')}
                        defaultValue={eventDetail.address.street}
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
                        defaultValue={eventDetail.address.city}
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
                        defaultValue={eventDetail.address.district}
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
                        defaultValue={eventDetail.address.ward}
                        placeholder={t('choose-ward')}
                        errors={errors?.ward?.message}
                      />
                    </div>
                  </div>
                </Fragment>
              )}

              {/* 3. Information about event content */}
              <Fragment>
                <div className={classes.subTitleDashboard}>
                  3. {t('Information about event content')}
                </div>

                <div>
                  <LabelField label={t('Brief description of the event')} isCompulsory />
                  <CKEditorField
                    name="briefDescription"
                    placeholder={t('phd-briefDescription-event')}
                    defaultValue={eventDetail.briefDescription}
                    control={control}
                    errors={errors?.briefDescription?.message}
                  />
                </div>
                <div>
                  <LabelField label={t('Event content')} isCompulsory />
                  <CKEditorField
                    name="eventContent"
                    placeholder={t('phd-eventContent-event')}
                    defaultValue={eventDetail.eventContent}
                    control={control}
                    errors={errors?.eventContent?.message}
                  />
                </div>
              </Fragment>

              {/* 4. Change event image */}
              <Fragment>
                <div className={classes.subTitleDashboard}>
                  4. {t('Change images of the event')}
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
              </Fragment>

              <div className={classes['editEvent__wrapped--actions']}>
                <ButtonField
                  type="submit"
                  backgroundcolor="#0a426e"
                  backgroundcolorhover="#324554"
                  uppercase
                  loading={loading}
                >
                  {t('Edit event')}
                </ButtonField>
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </div>
  )
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true,
  rows: 1,
}

export default UpdateEventPage
