import {
  getDetailJobSeekerAsync,
  fetchAllEventJoinedAsync,
} from 'features/JobSeekers/slices/thunks'
import {
  selectedJobSeekerProfile,
  selectJobSeekerLocal,
  selectEventsJoined,
} from 'features/JobSeekers/slices/selectors'
import { Avatar, Tooltip } from 'antd'
import { ButtonField } from 'custom-fields'
import { dateFormatISO8601, dateFormatHourMinute } from 'common/constants/dateFormat'
import { FaUsers } from 'react-icons/fa'
import { fetchDetailEventAsync } from 'features/Events/slices/thunks'
import { LoadingSuspense, ModalSignIn, notification } from 'components'
import { MdAccessTime, MdEventAvailable, MdEventBusy } from 'react-icons/md'
import { ModalJoinEvent } from 'features/Events/components'
import { ScrollToTop } from 'common/functions'
import { selectEmployerLocal } from 'features/Employers/slices/selectors'
import { selectEventDetail, selectStatus } from 'features/Events/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, Fragment, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import moment from 'moment'
import parse from 'html-react-parser'
import Slider from 'react-slick'

const EventDetailPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const jobSeeker = useSelector(selectedJobSeekerProfile)
  const { slug } = useParams()
  const eventDetail = useSelector(selectEventDetail)
  const loading = useSelector(selectStatus)
  const user = selectJobSeekerLocal()
  const token = localStorage.getItem('token')
  const joinedEvents = useSelector(selectEventsJoined)
  const [showModal, setShowModal] = useState(false)
  const employer = selectEmployerLocal()

  const {
    _id,
    aboutCreated,
    address,
    briefDescription,
    company,
    endTime,
    eventContent,
    eventOrganizer,
    eventName,
    imageCover,
    images,
    location,
    participantMax,
    participantQuantity,
    startTime,
    status,
    topic,
  } = eventDetail

  const styleImageCover = {
    background: `url(${imageCover}) center center no-repeat`,
    backgroundSize: 'cover',
  }

  useTitle(eventName ?? '')

  useEffect(() => {
    async function getDetailEvent() {
      const result = await dispatch(fetchDetailEventAsync(slug))
      if (result.error) {
        history.replace('/events/search?type=all')
      }
    }
    getDetailEvent()
  }, [dispatch, slug, history])

  const handleClickLogo = () => {
    history.push(`/jobs/employer/${company.companyName}`)
  }

  const onCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (!employer) {
      if (token) {
        dispatch(fetchAllEventJoinedAsync())
      }
    }
  }, [dispatch, token, employer, slug])

  const applyJoinEvent = () => {
    if (user) {
      if (!jobSeeker) {
        dispatch(getDetailJobSeekerAsync())
        setShowModal(true)
      } else {
        setShowModal(true)
      }
    } else {
      if (employer) {
        notification(`${t('Please log out of the employer account')}`, 'error')
      } else {
        setShowModal(true)
      }
    }
  }

  return (
    <Fragment>
      {loading ? (
        <LoadingSuspense height="40vh" />
      ) : (
        <div className={classes.eventDetail}>
          {user ? (
            jobSeeker && (
              <ModalJoinEvent
                showModal={showModal}
                onCloseModal={onCloseModal}
                event={eventDetail}
                currentUser={jobSeeker}
              />
            )
          ) : (
            <ModalSignIn showModal={showModal} onCloseModal={onCloseModal} />
          )}
          <div className={classes.eventDetail__wrapped}>
            <div style={styleImageCover} className={classes.eventDetail__top}>
              <div className={classes.overlayImage}></div>
            </div>

            <div className={classes['eventDetail__wrapped-info']}>
              <Avatar
                onClick={handleClickLogo}
                className={classes['eventDetail__wrapped-logo']}
                size={175}
                shape="square"
                src={company?.logo}
              />

              <div className={classes.eventInfor}>
                <div>
                  <div className={classes.eventInfor__eventName}>
                    {t('Event')} {eventName}
                  </div>
                  <div className={classes.eventInfor__field}>
                    {t('Event organizer')}: <span>{eventOrganizer}</span>
                  </div>
                  <div className={classes.eventInfor__field}>
                    {t('Held at')}:{' '}
                    {address && (
                      <Tooltip title={t('View location on google maps')}>
                        <a
                          href={`https://www.google.com/maps/place/${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classes['link-no-border']}
                        >
                          {location}
                        </a>
                      </Tooltip>
                    )}
                  </div>
                  <div className={classes.eventInfor__field}>
                    {t('Event topic')}: <span>{topic}</span>
                  </div>
                  <div className={classes.eventInfor__field}>
                    <MdEventAvailable className={classes.iconField} />
                    {t('Event start time')}:{' '}
                    <span>
                      {t('Date')}{' '}
                      {moment(startTime, dateFormatISO8601)
                        .format(dateFormatHourMinute)
                        .split(' ')
                        .join(` ${t('At')} `)}
                    </span>
                  </div>
                  <div className={classes.eventInfor__field}>
                    <MdEventBusy className={classes.iconField} />
                    {t('Event end time')}:{' '}
                    <span>
                      {t('Date')}{' '}
                      {moment(endTime, dateFormatISO8601)
                        .format(dateFormatHourMinute)
                        .split(' ')
                        .join(` ${t('At')} `)}
                    </span>
                  </div>
                </div>
                <div>
                  {aboutCreated && (
                    <Tooltip
                      title={`${t('Posted')} ${aboutCreated
                        .split(' ')
                        .map((string) => t(string))
                        .join(' ')}`}
                    >
                      <div className={classes.eventInfor__field}>
                        <MdAccessTime className={classes.eventInfor__icon} />
                        <span>
                          {aboutCreated
                            .split(' ')
                            .map((string) => t(string))
                            .join(' ')}
                        </span>
                      </div>
                    </Tooltip>
                  )}
                  <div className={classes.eventInfor__field}>
                    {t('Event')}{' '}
                    <span className={classes['eventInfor__field-status']}>{t(status)}</span>
                  </div>
                  <div className={classes.eventInfor__field}>
                    <FaUsers className={classes.eventInfor__icon} />
                    <Tooltip
                      title={`${t('The event had')} ${participantQuantity} ${
                        participantQuantity > 1 ? t('participants') : t('participant')
                      }`}
                    >
                      <span className={classes.eventInfor__people}>
                        {participantQuantity}/{participantMax}
                      </span>
                    </Tooltip>
                  </div>

                  {joinedEvents?.some((item) => item?.event?._id === _id) ? (
                    <ButtonField
                      backgroundcolor="#0a426e"
                      backgroundcolorhover="#324554"
                      radius="5px"
                      disabled
                      uppercase
                    >
                      {t('Registered')}
                    </ButtonField>
                  ) : participantQuantity === participantMax ? (
                    <ButtonField
                      backgroundcolor="#0a426e"
                      backgroundcolorhover="#324554"
                      radius="5px"
                      uppercase
                      disabled
                    >
                      {t('Enough quantity')}
                    </ButtonField>
                  ) : (
                    <ButtonField
                      backgroundcolor="#0a426e"
                      backgroundcolorhover="#324554"
                      radius="5px"
                      uppercase
                      onClick={applyJoinEvent}
                    >
                      {t('Registration')}
                    </ButtonField>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={classes.eventContent}>
            <div>
              <div className={classes.eventContent__title}>
                {t('Brief description about event')}
              </div>
              {briefDescription && (
                <div className={classes.eventContent__text}>{parse(briefDescription)}</div>
              )}

              <div className={classes.eventContent__title}>{t('Content of event')}</div>
              {eventContent && (
                <div className={classes.eventContent__text}>{parse(eventContent)}</div>
              )}
            </div>
            <div className={classes.eventContent__map}>
              <div className={classes['eventContent__map-title']}>{t('Event information')}</div>
              {address && (
                <Fragment>
                  <div className={classes['eventContent__map-location']}>
                    {t('Address')}:{' '}
                    <span>{`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}</span>
                  </div>
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBG4gMA71lLD3zLV38JXsvM3SQ-TT39FpM&q=${address.street},${address.ward},${address.district},${address.city}&zoom=15&language=vi`}
                    className={classes['eventContent__map-iframe']}
                    title="Map"
                  ></iframe>
                </Fragment>
              )}
            </div>
          </div>

          <div className={classes.eventImage}>
            <div className={classes.eventContent__title}>
              {t('Some more pictures of the event')}
            </div>
            <div className={classes.eventImage__wrapped}>
              {images && (
                <Slider style={{ width: '100%' }} {...settings}>
                  {images.map((image, index) => {
                    return (
                      <img
                        className={classes['eventImage__wrapped-img']}
                        key={index}
                        src={image}
                        alt={image}
                      />
                    )
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
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

export default EventDetailPage
