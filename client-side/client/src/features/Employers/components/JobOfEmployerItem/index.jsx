import { BiDollarCircle, BiDotsVerticalRounded } from 'react-icons/bi'
import { checkTagService, formatArrayForSelect } from 'common/functions'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { Dropdown, Menu } from 'antd'
import { fetchJobDetailOfEmployerAsync } from 'features/Employers/slices/thunks'
import { FiPackage } from 'react-icons/fi'
import { Fragment, useState } from 'react'
import { handChangeJobSlug } from 'features/Employers/slices'
import { IoIosPeople, IoMdCalendar, IoMdEye, IoMdTime } from 'react-icons/io'
import { MdDelete, MdDeleteForever, MdEdit, MdLocationOn, MdRestore } from 'react-icons/md'
import { ModalUpdateJob } from 'features/Employers/components'
import { PopoverField } from 'custom-fields'
import { selectedProvinces, selectedDistricts, selectedWards } from 'features/Home/slices/selectors'
import { selectedSkills } from 'features/Jobs/slices/selectors'
import { selectJobSlug } from 'features/Employers/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import moment from 'moment'
import NumberFormat from 'react-number-format'

export const JobOfEmployerItem = ({ data, isTrash, onDelete, loading, onRestore }) => {
  const history = useHistory()

  const {
    _id,
    jobTitle,
    company,
    slug,
    salary,
    location,
    finishDate,
    isNew,
    createdAt,
    aboutCreated,
    status,
    skills,
    isExpired,
    servicePackage,
  } = data

  const { t } = useTranslation()
  const [showModal, setShhowModal] = useState(false)
  const dispatch = useDispatch()
  const slugState = useSelector(selectJobSlug)
  const [selectSkill, setSelectSkill] = useState([])
  const [visible, setVisible] = useState(false)

  const skillList = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill }
  })

  const provinces = formatArrayForSelect(useSelector(selectedProvinces), 'Province', t, true, {
    name: 'choose-province',
    code: '',
  })

  const districts = formatArrayForSelect(useSelector(selectedDistricts), 'District', t, true, {
    name: 'choose-district',
    code: '',
  })

  const wards = formatArrayForSelect(useSelector(selectedWards), 'Wards', t, true, {
    name: 'choose-ward',
    code: '',
  })

  const handleShowDetail = () => {
    // history.push(`/jobs/${slug}`)
    const jobNewTab = window.open(`/jobs/${slug}`, '_blank')
    jobNewTab.focus()
  }

  const onOpenModal = () => {
    setShhowModal(true)
    setSelectSkill(skillList?.filter((skill) => skills.includes(skill.label)))
    if (slugState !== slug) {
      dispatch(handChangeJobSlug(slug))
      dispatch(fetchJobDetailOfEmployerAsync(slug))
    }
  }

  const changeSkillHandler = (option) => {
    setSelectSkill(option)
  }

  const onCloseModal = () => {
    setShhowModal(false)
  }

  const classNameStatus = `${classes.status} ${
    status === 'unapproval'
      ? classes.statusUnapproval
      : status === 'approval'
      ? classes.statusApproval
      : classes.statusDenied
  }`

  const changeToApplicationPage = () => {
    history.push(`/employers/dashboard/candidate-profiles/${_id}?title=${jobTitle}`)
  }

  const menuDefault = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={changeToApplicationPage} className={classes.item__listTile}>
          <IoIosPeople className={classes.item__listTile__icon} />
          <span>{t('View candidate list')}</span>
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div onClick={handleShowDetail} className={classes.item__listTile}>
          <IoMdEye className={classes.item__listTile__icon} />
          <span>{t('Job details')}</span>
        </div>
      </Menu.Item>

      {status !== 'approval' && (
        <Menu.Item key="2">
          <div onClick={onOpenModal} className={classes.item__listTile}>
            <MdEdit className={classes.item__listTile__icon} />
            <span>{t('Edit job postings')}</span>
          </div>
        </Menu.Item>
      )}

      <Menu.Item key="3">
        <PopoverField
          title={t('Confirm move job postings to trash')}
          subTitle={t('Do you want to  move this job postings to trash?')}
          loading={loading}
          onClickOk={() => onDelete(_id)}
          titleCancel={t('Cancel')}
          titleOk={t('Move')}
        >
          <div className={classes.item__listTile}>
            <MdDelete className={classes.item__listTile__icon} />
            <span>{t('Move to trash')}</span>
          </div>
        </PopoverField>
      </Menu.Item>
    </Menu>
  )

  const menuTrash = (
    <Menu>
      <Menu.Item key="0">
        <PopoverField
          title={t('Confirm to restore job postings')}
          subTitle={t('Do you want to restore this job posting?')}
          loading={loading}
          onClickOk={() => onRestore(_id)}
          titleCancel={t('Cancel')}
          titleOk={t('Restore')}
          isSwap
        >
          <div className={classes.item__listTile}>
            <MdRestore className={classes.item__listTile__icon} />
            <span>{t('Restore')}</span>
          </div>
        </PopoverField>
      </Menu.Item>

      <Menu.Item key="1">
        <PopoverField
          title={t('Confirm to permanently delete the event')}
          subTitle={t('Do you want to permanently delete this event?')}
          loading={loading}
          onClickOk={() => onDelete(_id)}
          titleCancel={t('Cancel')}
          titleOk={t('Delete')}
        >
          <div className={classes.item__listTile}>
            <MdDeleteForever className={classes.item__listTile__icon} />
            <span>{t('Delete permanently')}</span>
          </div>
        </PopoverField>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={classes.item}>
      <div className={classes.item__wrapped}>
        <div className={classes.item__top}>
          {isNew && (
            <div className={`${classes.isNew} ${classes['item__top--new']}`}>{t('New')}</div>
          )}
          {status && !isExpired && (
            <div className={`${classNameStatus} ${classes['item__top--status']}`}>{t(status)}</div>
          )}
          {isExpired && (
            <div
              className={`${classes.status} ${classes.statusDenied} ${classes['item__top--status']}`}
            >
              {t('Expired')}
            </div>
          )}
          <img className={classes['item__top-logo']} src={company?.logo} alt={company?.logo} />
        </div>
        <div className={classes.item__bottom}>
          <div className={classes.item__bottom__jobTitle}>
            <a
              href={`/jobs/${slug}`}
              className={`${classes.item__bottom__jobTitle__link} ${
                checkTagService('isHighlight', servicePackage)
                  ? classes['link-one-line-highlight']
                  : classes['link-one-line']
              } `}
              target="_blank"
              rel="noreferrer"
            >
              {jobTitle}
            </a>

            <Dropdown
              overlay={isTrash ? menuTrash : menuDefault}
              trigger={['click']}
              placement="bottomRight"
              visible={visible}
              onVisibleChange={(visible) => setVisible(visible)}
              arrow
            >
              <BiDotsVerticalRounded className={classes.item__bottom__jobTitle__icon} />
            </Dropdown>
          </div>
          {salary && (
            <div className={classes['item__bottom-salary']}>
              <BiDollarCircle style={{ marginRight: '5px' }} />
              <span>{t('Salary')}:</span>{' '}
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
          <div>
            <IoMdTime style={{ marginRight: '5px' }} />
            {`${t('Posted')} ${aboutCreated
              .split(' ')
              .map((string) => t(string))
              .join(' ')}`}
          </div>
          {servicePackage && (
            <div>
              <FiPackage style={{ marginRight: '5px' }} />
              {`${t('Already applied')}`}:{' '}
              <span className={classes['item__bottom__service']}>{servicePackage.packageName}</span>
            </div>
          )}

          <ModalUpdateJob
            provinces={provinces}
            districts={districts}
            wards={wards}
            skillList={skillList}
            changeSkillHandler={changeSkillHandler}
            selectSkill={selectSkill}
            showModal={showModal}
            onCloseModal={onCloseModal}
            title={jobTitle}
          />
        </div>
      </div>
    </div>
  )
}
