import { resetDataEvent, resetDataParticipants } from 'features/Employers/slices'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { dateFormatISO8601, dateFormatHourMinute } from 'common/constants/dateFormat'
import { FaUsers, FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import {
  MdAccessTime,
  MdDelete,
  MdDeleteForever,
  MdEdit,
  MdEventAvailable,
  MdEventBusy,
  MdRestore,
} from 'react-icons/md'
import { Menu, Dropdown, Tooltip } from 'antd'
import { RiFileList3Line } from 'react-icons/ri'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import moment from 'moment'
import PopoverField from 'custom-fields/PopoverField'
import Slider from 'react-slick'

const EventOfEmployerItem = ({
  data,
  isTrash = false,
  loading,
  onRestore,
  onDelete,
  onPause,
  onSoftDelete,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  const {
    _id,
    aboutCreated,
    address,
    endTime,
    eventName,
    imageCover,
    images,
    isNew,
    location,
    participantMax,
    participantQuantity,
    slug,
    startTime,
    status,
    topic,
  } = data

  const classNameStatus =
    status === 'NotYetOccur'
      ? classes.statusNotYetOccur
      : status === 'Occurring'
      ? classes.statusOccur
      : status === 'Pausing'
      ? classes.statusPausing
      : classes.statusFinish

  const changeTime = (date, fromFormat, toFormat) => {
    return moment(date, fromFormat)
      .format(toFormat)
      .split(' ')
      .join(` ${t('At')} `)
  }

  const changeParticipantPage = () => {
    history.push(`/employers/dashboard/events/${_id}/participants`)
    dispatch(resetDataParticipants())
    dispatch(resetDataEvent())
  }

  const changeEditEventPage = () => {
    history.push(`/employers/dashboard/events/${_id}/edit`)
    dispatch(resetDataEvent())
  }

  const menuDefault = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={changeParticipantPage} className={classes.item__listTile}>
          <RiFileList3Line className={classes['item__listTile--icon']} />
          <span>{t('View member list')}</span>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div onClick={changeEditEventPage} className={classes.item__listTile}>
          <MdEdit className={classes['item__listTile--icon']} />
          <span>{t('Edit event')}</span>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <PopoverField
          title={t('Confirm move event to trash')}
          subTitle={t('Do you want to  move this event to trash?')}
          loading={loading}
          onClickOk={() => onSoftDelete(_id)}
          titleCancel={t('Cancel')}
          titleOk={t('Move')}
        >
          <div className={classes.item__listTile}>
            <MdDelete className={classes['item__listTile--icon']} />
            <span>{t('Move to trash')}</span>
          </div>
        </PopoverField>
      </Menu.Item>
      <Menu.Item key="4">
        {status === 'Pausing' ? (
          <PopoverField
            title={t('Confirm to continue of this event')}
            subTitle={t('Do you want to continue this event?')}
            loading={loading}
            onClickOk={() => {}}
            titleCancel={t('Cancel')}
            titleOk={t('Continue')}
            isSwap
          >
            <div className={classes.item__listTile}>
              <FaPlayCircle className={classes['item__listTile--icon']} />
              <span>{t('Continue event')}</span>
            </div>
          </PopoverField>
        ) : (
          <PopoverField
            title={t('Confirm to pause this event')}
            subTitle={t('Do you want to pause this event?')}
            loading={loading}
            onClickOk={() => onPause(_id)}
            titleCancel={t('Cancel')}
            titleOk={t('Pausing')}
          >
            <div className={classes.item__listTile}>
              <FaPauseCircle className={classes['item__listTile--icon']} />
              <span>{t('Pausing event')}</span>
            </div>
          </PopoverField>
        )}
      </Menu.Item>
    </Menu>
  )

  const menuTrash = (
    <Menu>
      <Menu.Item key="0">
        <PopoverField
          title={t('Confirm to restore event')}
          subTitle={t('Do you want to restore this event?')}
          loading={loading}
          onClickOk={() => onRestore(_id)}
          titleCancel={t('Cancel')}
          titleOk={t('Restore')}
          isSwap
        >
          <div className={classes.item__listTile}>
            <MdRestore className={classes['item__listTile--icon']} />
            <span>{t('Restore event')}</span>
          </div>
        </PopoverField>
      </Menu.Item>
      <Menu.Item key="2">
        <PopoverField
          title={t('Confirm to permanently delete the event')}
          subTitle={t('Do you want to permanently delete this event?')}
          loading={loading}
          onClickOk={() => onDelete(_id)}
          titleCancel={t('Cancel')}
          titleOk={t('Delete')}
        >
          <div className={classes.item__listTile}>
            <MdDeleteForever className={classes['item__listTile--icon']} />
            <span>{t('Delete permanently')}</span>
          </div>
        </PopoverField>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={classes.item}>
      <div className={classes.item__wrapped}>
        {isNew && (
          <div className={`${classes.isNew} ${classes['item__wrapped--new']}`}>{t('New')}</div>
        )}
        {status && (
          <div
            className={`${classes.status} ${classes['item__wrapped--status']} ${classNameStatus}`}
          >
            {t('Event')} {t(status)}
          </div>
        )}
      </div>
      <div className={classes.item__top}>
        <div className={classes['item__top--wrapped']}>
          <Slider className={classes['item__top--wrapped--slider']} {...settings}>
            {[imageCover, ...images].map((image, index) => {
              return (
                <img
                  className={classes['item__top--wrapped--logo']}
                  key={index}
                  src={image}
                  alt={image}
                />
              )
            })}
          </Slider>
        </div>
      </div>
      <div className={classes.item__bottom}>
        <div className={classes['item__bottom--eventName']}>
          {/* Event name */}
          <Tooltip title={`${t('Click to see details of event')} ${eventName}`}>
            <Link to={`/events/view/${slug}`} className={classes['item__bottom--eventName--link']}>
              {t('Event')} {eventName}
            </Link>
          </Tooltip>

          <Dropdown
            overlay={isTrash ? menuTrash : menuDefault}
            trigger={['click']}
            placement="bottomRight"
            visible={visible}
            onVisibleChange={(visible) => setVisible(visible)}
            arrow
          >
            <BiDotsVerticalRounded className={classes['item__bottom--eventName--icon']} />
          </Dropdown>
        </div>

        {/* Event about created */}
        <div className={classes['item__bottom--field']}>
          <MdAccessTime className={classes.iconField} />
          {t('Posted')}{' '}
          <span>
            {aboutCreated
              .split(' ')
              .map((string) => t(string))
              .join(' ')}
          </span>
        </div>

        {/* Event Topic */}
        <div className={classes['item__bottom--field']}>
          {t('Event topic')}: <span>{topic}</span>
        </div>

        {/* Event location */}
        <div className={classes['item__bottom--field']}>
          {t('Held at')}:{' '}
          {address && (
            <Tooltip title={t('View location on google maps')}>
              <a
                href={`https://www.google.com/maps/place/${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                target="_blank"
                rel="noreferrer"
              >
                {location}
              </a>
            </Tooltip>
          )}
        </div>

        {/* Event participate */}
        <div className={classes['item__bottom--field']}>
          <FaUsers className={classes.iconField} />
          <span>
            {participantQuantity}/{participantMax}{' '}
          </span>
          {t('people have registered to participate')}
        </div>

        {/* Event start time */}
        <div className={classes['item__bottom--field']}>
          <MdEventAvailable className={classes.iconField} />
          {t('Event start time')}:{' '}
          <span>
            {`${t('Date')} ${changeTime(startTime, dateFormatISO8601, dateFormatHourMinute)}`}
          </span>
        </div>

        {/* Event end time */}
        <div className={classes['item__bottom--field']}>
          <MdEventBusy className={classes.iconField} />
          {t('Event end time')}:{' '}
          <span>
            {`${t('Date')} ${changeTime(endTime, dateFormatISO8601, dateFormatHourMinute)}`}
          </span>
        </div>
      </div>
    </div>
  )
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true,
  rows: 1,
  arrows: false,
}

export default EventOfEmployerItem
