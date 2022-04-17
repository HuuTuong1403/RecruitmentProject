import { dateFormatISO8601, dateFormatHourMinute } from 'common/constants/dateFormat'
import { FaUsers } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import moment from 'moment'

export const EventItem = ({ event }) => {
  const { t } = useTranslation()
  const {
    aboutCreated,
    company,
    endTime,
    eventName,
    eventOrganizer,
    isNew,
    location,
    participantMax,
    participantQuantity,
    slug,
    startTime,
    status,
    topic,
  } = event

  const start = moment(startTime, dateFormatISO8601)
    .format(dateFormatHourMinute)
    .split(' ')
    .join(` ${t('At')} `)

  const end = moment(endTime, dateFormatISO8601)
    .format(dateFormatHourMinute)
    .split(' ')
    .join(` ${t('At')} `)

  return (
    <div className={classes.eventItem}>
      <div className={classes.eventItem__wrapped}>
        {isNew && (
          <div className={`${classes.isNew} ${classes['eventItem__wrapped--new']}`}>{t('New')}</div>
        )}
        <div className={classes.imageItem}>
          <a href={`/jobs/employer/${company?.companyName}`} target="_blank" rel="noreferrer">
            <img src={company?.logo} alt="" />
          </a>
        </div>
        <div className={classes.eventItem__content}>
          <div className={classes['eventItem__content__head']}>
            <div className={classes['eventItem__content__head-eventName']}>
              <a
                className={`${classes.link} ${classes.bold} ${classes['link-fz-18']}`}
                href={`/events/view/${slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {eventName}
              </a>
            </div>
            <div>
              <IoMdTime className={classes['icon-gb-18']} />
              {aboutCreated
                .split(' ')
                .map((string) => t(string))
                .join(' ')}
            </div>
          </div>

          <div className={classes['eventItem__content__field']}>
            <div>
              {t('Event topic')}: <span>{topic}</span>
            </div>
            <div>
              {t('Event status')}: <span>{t('Event')}</span>{' '}
              <span className={classes['eventItem__content__field--status']}>{t(status)}</span>
            </div>
          </div>

          <div className={classes['eventItem__content__time']}>
            {t('Event organizer')}: <span>{eventOrganizer}</span>
          </div>

          <div className={classes['eventItem__content__time']}>
            {t('Event time')}:{' '}
            <span>
              {t('From')} {start}
            </span>
            <span>
              {' '}
              {t('to')} {end}
            </span>
          </div>

          <div className={classes['eventItem__content__field']}>
            <div>
              {t('Event venue')}: <span>{location}</span>
            </div>
            <div>
              {t('Number of participants')}:{' '}
              <span>
                {participantQuantity}/{participantMax}
              </span>{' '}
              <FaUsers className={classes['icon-gb-18']} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
