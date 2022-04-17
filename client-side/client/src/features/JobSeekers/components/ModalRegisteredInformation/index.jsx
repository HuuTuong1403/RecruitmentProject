import { LabelField } from 'custom-fields'
import { Modal, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

export const ModalRegisteredInformation = ({ createdAt, data, onCloseModal, showModal }) => {
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

        <div className={classes.modalInfo__content}>
          <div className={classes['modalInfo__content-body']}>
            <div className={classes['modalInfo__content-field']}>
              <LabelField label={`${t('full name')}:`} />
              <div>{fullName}</div>
            </div>
            <div className={classes['modalInfo__content-field']}>
              <LabelField label={`${t('Phone')}:`} />
              <div>{phone}</div>
            </div>
            <div className={classes['modalInfo__content-field']}>
              <LabelField label={`${t('Address')}:`} />
              <div>
                {address.street}, {address.ward}, {address.district}, {address.city}
              </div>
            </div>
            <div className={classes['modalInfo__content-field']}>
              <LabelField label={`${t('Status')}:`} />
              <div className={classStatus}>{t(status)}</div>
            </div>
            <div className={classes['modalInfo__content-field']}>
              <LabelField label={`${t('Registered to participate on')}:`} />
              <div>
                {t('Date')} {createdAt}
              </div>
            </div>
            <div className={classes['modalInfo__content-field']}>
              <LabelField label={`${t('Interesting field')}:`} />
              <div className={classes['modalInfo__content-field__interesting']}>
                {interestingField.map((item, index) => (
                  <Tooltip key={index} title={`${t('View jobs with skill')} ${item}`}>
                    <a
                      className={`${classes['modalInfo__content-field__link']} ${classes['link-no-border']} ${classes['link-fz-14']}`}
                      href={`/jobs/search?skills=${item}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item}
                    </a>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>

          <div className={classes['modalInfo__content-map']}>
            <span className={classes['modalInfo__content-map__address']}>
              {event.address.street}, {event.address.ward}, {event.address.district},{' '}
              {event.address.city}
            </span>

            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBG4gMA71lLD3zLV38JXsvM3SQ-TT39FpM&q=${event.address.street}, ${event.address.ward},
          ${event.address.district}, ${event.address.city}&zoom=15&language=vi`}
              className={classes['modalInfo__content-map__iframe']}
              title="Map"
            ></iframe>
          </div>
        </div>
      </div>
    </Modal>
  )
}
