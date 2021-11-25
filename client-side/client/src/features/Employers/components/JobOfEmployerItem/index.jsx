import { selectedProvinces, selectedDistricts, selectedWards } from 'features/Home/slices/selectors'
import { BiDollarCircle } from 'react-icons/bi'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { fetchJobDetailOfEmployerAsync } from 'features/Employers/slices/thunks'
import { handChangeJobSlug } from 'features/Employers/slices'
import { IoMdCalendar, IoMdEye, IoMdTime } from 'react-icons/io'
import { Link, useHistory } from 'react-router-dom'
import { MdDelete, MdDeleteForever, MdEdit, MdLocationOn, MdRestore } from 'react-icons/md'
import { selectedSkills } from 'features/Jobs/slices/selectors'
import { selectJobSlug } from 'features/Employers/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonField from 'custom-fields/ButtonField'
import classes from './style.module.scss'
import ModalUpdateJob from 'features/Employers/components/ModalUpdateJob'
import moment from 'moment'
import PopoverField from 'custom-fields/PopoverField'

const JobOfEmployerItem = ({ data, isTrash, onDelete, loading, onRestore }) => {
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
  } = data

  const { t } = useTranslation()
  const [showModal, setShhowModal] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const slugState = useSelector(selectJobSlug)
  const [selectSkill, setSelectSkill] = useState([])

  const skillList = useSelector(selectedSkills).map((skill, index) => {
    return { value: index, label: skill }
  })

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

  const handleShowDetail = () => {
    history.push(`/jobs/${slug}`)
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

  return (
    <div className={classes.item}>
      <div className={classes.item__wrapped}>
        <div className={classes.item__top}>
          {isNew && (
            <div className={`${classes.isNew} ${classes['item__top--new']}`}>{t('New')}</div>
          )}
          {status && (
            <div className={`${classNameStatus} ${classes['item__top--status']}`}>{t(status)}</div>
          )}
          <img className={classes['item__top--logo']} src={company?.logo} alt={company?.logo} />
        </div>
        <div className={classes.item__bottom}>
          <Link to={`/jobs/${slug}`} className={`${classes.titleItem} ${classes.hideText}`}>
            {jobTitle}
          </Link>
          {salary && (
            <div className={classes['item__bottom--salary']}>
              <BiDollarCircle style={{ marginRight: '5px' }} />
              {`${t('Salary')}: ${
                salary.min ? `${salary.min} - ${salary.max} ${salary.type}` : t(salary.type)
              }`}
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

          {isTrash ? (
            <div className={classes['item__bottom--actionsTrash']}>
              <ButtonField backgroundcolor="#dd4b39" backgroundcolorhover="#ff7875" padding="2px">
                <MdDeleteForever className={classes.item__icon} />
                {t('Delete permanently')}
              </ButtonField>
              <PopoverField
                title={t('Confirm to restore job postings')}
                subTitle={t('Do you want to restore this job posting?')}
                loading={loading}
                onClickOk={() => onRestore(_id)}
                titleCancel={t('Cancel')}
                titleOk={t('Restore')}
                isSwap
              >
                <ButtonField backgroundcolor="#067951" backgroundcolorhover="#2baa7e" padding="2px">
                  <MdRestore className={classes.item__icon} />
                  {t('Restore')}
                </ButtonField>
              </PopoverField>
            </div>
          ) : (
            <div className={classes['item__bottom--actions']}>
              <ButtonField
                backgroundcolor="#0a426e"
                backgroundcolorhover="#0a436ead"
                onClick={handleShowDetail}
                padding="2px"
              >
                <IoMdEye className={classes.item__icon} />
                {t('Details')}
              </ButtonField>
              <ButtonField
                backgroundcolor="#067951"
                backgroundcolorhover="#2baa7e"
                onClick={onOpenModal}
                padding="2px"
              >
                <MdEdit className={classes.item__icon} />
                {t('Edit')}
              </ButtonField>
              <PopoverField
                title={t('Confirm move job postings to trash')}
                subTitle={t('Do you want to  move this job postings to trash?')}
                loading={loading}
                onClickOk={() => onDelete(_id)}
                titleCancel={t('Cancel')}
                titleOk={t('Move')}
              >
                <ButtonField backgroundcolor="#dd4b39" backgroundcolorhover="#ff7875" padding="2px">
                  <MdDelete className={classes.item__icon} />
                  {t('Delete')}
                </ButtonField>
              </PopoverField>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobOfEmployerItem
