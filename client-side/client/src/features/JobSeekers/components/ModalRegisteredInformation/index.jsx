import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import LabelField from 'custom-fields/LabelField'

const ModalRegisteredInformation = ({ createdAt, data, onCloseModal, showModal }) => {
  const { t } = useTranslation()
  const { event, fullName, phone, status, address, interestingField } = data

  const classStatus = status === 'Not participate' ? classes.notParticipate : classes.participate

  return (
    <Modal
      centered
      footer={null}
      onCancel={onCloseModal}
      onOk={onCloseModal}
      visible={showModal}
      width={1000}
    >
      <div className={classes.modalInfo}>
        <div className={classes.modalTitle}>
          {t('Event registration information')} {event.eventName}
        </div>
        <h3 className={classes.modalInfo__address}>
          {t('Event held address')}: {event.address.street}, {event.address.ward},{' '}
          {event.address.district}, {event.address.city}
        </h3>
        <div className={classes.modalInfo__content}>
          <div className={classes['modalInfo__content--field']}>
            <LabelField label={`${t('full name')}:`} />
            <div>{fullName}</div>
          </div>
          <div className={classes['modalInfo__content--field']}>
            <LabelField label={`${t('Phone')}:`} />
            <div>{phone}</div>
          </div>
          <div className={classes['modalInfo__content--field']}>
            <LabelField label={`${t('Address')}:`} />
            <div>
              {address.street}, {address.ward}, {address.district}, {address.city}
            </div>
          </div>
          <div className={classes['modalInfo__content--field']}>
            <LabelField label={`${t('Status')}:`} />
            <div className={classStatus}>{t(status)}</div>
          </div>
          <div className={classes['modalInfo__content--field']}>
            <LabelField label={`${t('Registered to participate on')}:`} />
            <div>
              {t('Date')} {createdAt}
            </div>
          </div>
          <div className={classes['modalInfo__content--field']}>
            <LabelField label={`${t('Interesting field')}:`} />
            <div className={classes['modalInfo__content--field--interesting']}>
              {interestingField.map((item, index) => (
                <Tooltip key={index} title={`${t('View jobs with skill')} ${item}`}>
                  <Link
                    className={classes['modalInfo__content--field--link']}
                    to={`/jobs/search?skills=${item}`}
                  >
                    {item}
                  </Link>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalRegisteredInformation
