import {
  dateFormatISO8601,
  dateFormatISO8601WithZ,
  dateFormatHourMinute,
} from 'common/constants/dateFormat'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { MdEventAvailable, MdEventBusy, MdToday } from 'react-icons/md'
import { Tooltip } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonField from 'custom-fields/ButtonField'
import classes from './style.module.scss'
import ModalRegisteredInformation from 'features/JobSeekers/components/ModalRegisteredInformation'
import moment from 'moment'

const EventItem = ({ data }) => {
  const { t } = useTranslation()
  const {
    event: {
      company: { logo, companyName },
      status,
      isNew,
      startTime,
      endTime,
      address,
      location,
      imageCover,
      slug,
      eventName,
      topic,
      eventOrganizer,
    },
    createdAt,
  } = data
  const [showModal, setShowModal] = useState(false)

  const onCloseModal = () => {
    setShowModal(false)
  }

  const classNameStatus =
    status === 'NotYetOccur'
      ? classes.statusNotYetOccur
      : status === 'Occurring'
      ? classes.statusOccur
      : status === 'Pausing'
      ? classes.statusPausing
      : classes.statusFinish

  const changeDate = (date, fromFormat, toFormat) => {
    return moment(date, fromFormat)
      .format(toFormat)
      .split(' ')
      .join(` ${t('At')} `)
  }

  const dateRegister = changeDate(createdAt, dateFormatISO8601WithZ, dateFormatHourMinute)

  return (
    <div className={classes.eventItem}>
      <ModalRegisteredInformation
        showModal={showModal}
        onCloseModal={onCloseModal}
        data={data}
        createdAt={dateRegister}
      />
      <div className={classes.eventItem__top}>
        <img className={classes['eventItem__top-cover']} src={imageCover} alt={imageCover} />
        <img className={classes['eventItem__top-logo']} src={logo} alt={logo} />
        {isNew && (
          <div className={`${classes.isNew} ${classes['eventItem__top--new']}`}>{t('New')}</div>
        )}
        {status && (
          <div
            className={`${classes.status} ${classes['eventItem__top--status']} ${classNameStatus}`}
          >
            {t('Event')} {t(status)}
          </div>
        )}
      </div>
      <div className={classes.eventItem__bottom}>
        <div className={classes['eventItem__bottom-title']}>
          {/* Event name */}
          <Tooltip title={t('Click to see details of event')}>
            <Link
              className={`${classes['link-one-line']} ${classes.bold}`}
              to={`/events/view/${slug}`}
            >
              {t('Event')} {eventName}
            </Link>
          </Tooltip>

          <span> {t('of')} </span>

          {/* Event company */}
          {companyName && (
            <Tooltip title={`${t('Click to see details of company')} ${companyName}`}>
              <Link
                className={`${classes['link-one-line']} ${classes.bold}`}
                to={`/jobs/employer/${companyName}`}
              >
                {companyName}
              </Link>
            </Tooltip>
          )}
        </div>

        {/* Event location */}
        <div className={classes['eventItem__bottom-field']}>
          {t('Held at')}:{' '}
          {address && (
            <Tooltip title={t('View location on google maps')}>
              <a
                className={classes['link-no-border']}
                href={`https://www.google.com/maps/place/${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                target="_blank"
                rel="noreferrer"
              >
                {location}
              </a>
            </Tooltip>
          )}
        </div>

        {/* Event Topic */}
        <div className={classes['eventItem__bottom-field']}>
          {t('Event topic')}: <span>{topic}</span>
        </div>

        {/* Event Organizer */}
        <div className={classes['eventItem__bottom-field']}>
          {t('Event organizer')}: <span>{eventOrganizer}</span>
        </div>

        {/* Event start time */}
        <div className={classes['eventItem__bottom-field']}>
          <MdEventAvailable className={classes.iconField} />
          {t('Event start time')}:{' '}
          <span>
            {`${t('Date')} ${changeDate(startTime, dateFormatISO8601, dateFormatHourMinute)}`}
          </span>
        </div>

        {/* Event end time */}
        <div className={classes['eventItem__bottom-field']}>
          <MdEventBusy className={classes.iconField} />
          {t('Event end time')}:{' '}
          <span>
            {`${t('Date')} ${changeDate(endTime, dateFormatISO8601, dateFormatHourMinute)}`}
          </span>
        </div>

        {/* Registered date */}
        <div className={classes['eventItem__bottom-field']}>
          <MdToday className={classes.iconField} />
          {t('Registered to participate on')}: <span>{`${t('Date')} ${dateRegister}`}</span>
        </div>
      </div>

      <div className={classes.eventItem__actions}>
        <ButtonField
          backgroundcolor="#0a426e"
          backgroundcolorhover="#0a436ead"
          padding="5px"
          onClick={() => setShowModal(true)}
        >
          <FaEye className={classes['eventItem__actions-icon']} />
          {t('View registered information')}
        </ButtonField>
      </div>
    </div>
  )
}

export default EventItem
