import { approveJobPosting, denyJobPosting } from 'features/SystemManager/api/systemManager.api'
import { BiDollarCircle } from 'react-icons/bi'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { FaEye, FaCheckCircle, FaMinusCircle } from 'react-icons/fa'
import { fetchAllJobAsync } from 'features/SystemManager/slices/thunks'
import { IoMdCalendar, IoMdTime } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { Menu, Dropdown } from 'antd'
import { ModalJobDetail } from 'features/SystemManager/components'
import { PopoverField } from 'custom-fields'
import { useDispatch } from 'react-redux'
import { useState, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { notification } from 'components'
import classes from './style.module.scss'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { FiPackage } from 'react-icons/fi'

export const JobOfEmployerItem = ({ data, statusJob }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const {
    _id,
    jobTitle,
    company,
    salary,
    location,
    finishDate,
    isNew,
    createdAt,
    aboutCreated,
    status,
    servicePackage,
  } = data

  const approveJobPostingHandler = async () => {
    setLoading(true)
    const res = await approveJobPosting(_id)
    if (res.status === 'success') {
      notification(`${t('Approved job posting successfully')}`, 'success')
      dispatch(fetchAllJobAsync())
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setVisible(false)
    setLoading(false)
  }

  const rejectJobPostingHandler = async () => {
    setLoading(true)
    const res = await denyJobPosting(_id)
    if (res.status === 'success') {
      notification(`${t('Reject successful job postings')}`, 'success')
      dispatch(fetchAllJobAsync())
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setVisible(false)
    setLoading(false)
  }

  const onCloseModal = () => setShowModal(false)

  const classNameStatus =
    status === 'unapproval'
      ? classes.statusUnapproval
      : status === 'approval'
      ? classes.statusApproval
      : classes.statusDenied

  const menuDefault = (
    <Menu>
      <Menu.Item key="0">
        <div
          onClick={() => {
            setShowModal(true)
            setVisible(false)
          }}
          className={`${classes.item__listTile} ${classes.view}`}
        >
          <FaEye className={classes['item__listTile--icon']} />
          <span>{t('View detail')}</span>
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <PopoverField
          title={t('Confirmation of approval for job postings')}
          subTitle={t('Do you want to approve this job posting?')}
          loading={loading}
          onClickOk={approveJobPostingHandler}
          titleCancel={t('Cancel')}
          titleOk={t('approve')}
          isSwap
        >
          <div className={`${classes.item__listTile} ${classes.approval}`}>
            <FaCheckCircle className={classes['item__listTile--icon']} />
            <span>{t('approve')}</span>
          </div>
        </PopoverField>
      </Menu.Item>
      <Menu.Item key="2">
        <PopoverField
          title={t('Confirm rejection of job postings')}
          subTitle={t('Do you want to reject this job posting?')}
          loading={loading}
          onClickOk={rejectJobPostingHandler}
          titleCancel={t('Cancel')}
          titleOk={t('Reject')}
        >
          <div className={`${classes.item__listTile} ${classes.denied}`}>
            <FaMinusCircle className={classes['item__listTile--icon']} />
            <span>{t('Reject')}</span>
          </div>
        </PopoverField>
      </Menu.Item>
    </Menu>
  )

  const menuTrash = (
    <Menu>
      <Menu.Item key="0">
        <div
          onClick={() => {
            setShowModal(true)
            setVisible(false)
          }}
          className={`${classes.item__listTile} ${classes.view}`}
        >
          <FaEye className={classes['item__listTile--icon']} />
          <span>{t('View detail')}</span>
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <Fragment>
      <ModalJobDetail
        statusJob={statusJob}
        showModal={showModal}
        onCloseModal={onCloseModal}
        data={data}
        onApprove={approveJobPostingHandler}
        onReject={rejectJobPostingHandler}
        loading={loading}
      />
      <div className={classes.item}>
        <div className={classes.item__wrapped}>
          <div className={classes.item__top}>
            {isNew && (
              <div className={`${classes.isNew} ${classes['item__top--new']}`}>{t('New')}</div>
            )}
            {status && (
              <div
                className={`${classes.status} ${classes['item__top--status']} ${classNameStatus}`}
              >
                {t(status)}
              </div>
            )}
            <img className={classes['item__top--logo']} src={company?.logo} alt={company?.logo} />
          </div>
          <div className={classes.item__bottom}>
            <div className={classes['item__bottom--jobTitle']}>
              <div>{jobTitle}</div>
              <Dropdown
                overlay={statusJob === 'unapproval' ? menuDefault : menuTrash}
                trigger={['click']}
                placement="bottomRight"
                visible={visible}
                onVisibleChange={(visible) => setVisible(visible)}
                arrow
              >
                <BiDotsVerticalRounded className={classes['item__bottom--jobTitle--icon']} />
              </Dropdown>
            </div>
            {salary && (
              <div className={classes['item__bottom--salary']}>
                <BiDollarCircle style={{ marginRight: '5px' }} />
                {t('Salary')}:{' '}
                <span>
                  {salary.min ? (
                    <Fragment>
                      <NumberFormat
                        thousandsGroupStyle="thousand"
                        thousandSeparator={true}
                        value={salary.min}
                        suffix=""
                        displayType={'text'}
                      />{' '}
                      -{' '}
                      <NumberFormat
                        thousandsGroupStyle="thousand"
                        thousandSeparator={true}
                        value={salary.max}
                        suffix=""
                        displayType={'text'}
                      />{' '}
                      {salary.type}
                    </Fragment>
                  ) : (
                    <>{t(salary.type)}</>
                  )}
                </span>
              </div>
            )}
            {location && (
              <div>
                <MdLocationOn style={{ marginRight: '5px' }} />
                {location.city}
              </div>
            )}
            <div>
              <IoMdCalendar style={{ marginRight: '5px' }} />
              {`${t('post date')}: ${moment(createdAt).format(dateFormatPicker)}`}
            </div>
            <div>
              <IoMdCalendar style={{ marginRight: '5px' }} />
              {`${t('Deadline to apply')}: ${moment(finishDate).format(dateFormatPicker)}`}
            </div>
            <div className={classes['item__wrapped--aboutCreated']}>
              <IoMdTime style={{ marginRight: '5px' }} />
              {`${t('Posted')} ${aboutCreated
                .split(' ')
                .map((string) => t(string))
                .join(' ')}`}
            </div>
            {servicePackage && (
              <div>
                <FiPackage style={{ marginRight: '5px' }} />
                {t('Already applied')}:{' '}
                <span className={classes['item__bottom--service']}>
                  {servicePackage.packageName}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
