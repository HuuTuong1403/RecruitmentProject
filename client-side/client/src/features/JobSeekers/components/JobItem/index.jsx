import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiDollarCircle } from 'react-icons/bi'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { FaBuilding } from 'react-icons/fa'
import { IoMdCalendar, IoMdTime } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { MdLocationOn, MdDeleteForever } from 'react-icons/md'
import { removeFavoriteJob } from 'features/JobSeekers/api/jobSeeker.api'
import { removeJobOfFavorire } from 'features/JobSeekers/slices'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonField from 'custom-fields/ButtonField'
import classes from './style.module.scss'
import moment from 'moment'
import notification from 'components/Notification'
import PopoverField from 'custom-fields/PopoverField'

const JobItem = ({ data, isApplied = false, createdAt }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { _id, company, jobTitle, salary, location, aboutCreated, finishDate, slug, isNew } = data

  const removeSaveJobHandler = async () => {
    setLoading(true)
    const result = await removeFavoriteJob(_id)
    if (result.status === 'success') {
      dispatch(removeJobOfFavorire(_id))
      notification(`${t('Successfully unsaved job posting')}`, 'success')
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setLoading(false)
  }

  return (
    <div className={classes.jobItem}>
      <div className={classes.jobItem__container}>
        {isNew && <div className={`${classes.isNew} ${classes['jobItem--new']}`}>{t('New')}</div>}
        {company && (
          <div className={classes['jobItem__container-img']}>
            <Link to={`/jobs/employer/${company.companyName}`}>
              <img src={company.logo} alt="" />
            </Link>
          </div>
        )}
        <div className={classes['jobItem__container-content']}>
          <div className={classes['jobItem__container-content__head']}>
            <div className={classes['jobItem__container-content__head__jobTitle']}>
              <Link
                className={`${classes.link} ${classes.bold} ${classes['link-fz-18']}`}
                to={`/jobs/${slug}`}
              >
                {jobTitle}
              </Link>
            </div>
            <div>
              <IoMdTime className={classes['icon-gb-18']} />
              {aboutCreated
                .split(' ')
                .map((string) => t(string))
                .join(' ')}
            </div>
          </div>

          <div className={classes['jobItem__container-content__companyName']}>
            <Link
              className={`${classes['link-no-border']} ${classes['link-fz-16']}`}
              to={`/jobs/employer/${company?.companyName}`}
            >
              <FaBuilding className={classes['icon-gb-18']} />
              {company?.companyName}
            </Link>
          </div>

          <div className={classes['jobItem__container-content__salary']}>
            <div>
              <BiDollarCircle className={classes['icon-gb-18']} />
              {t('Salary')}:{' '}
              {salary.min ? `${salary.min} - ${salary.max} ${salary.type}` : t(salary.type)}
            </div>
            <div>
              <MdLocationOn className={classes['icon-gb-18']} />
              {location.city}
            </div>
          </div>

          <div className={classes['jobItem__container-content__date']}>
            {!isApplied ? (
              <div>
                <IoMdCalendar className={classes['icon-gb-18']} />
                {t('expiration date')}: {moment(finishDate).format(dateFormatPicker)}
              </div>
            ) : (
              <div>
                <IoMdCalendar className={classes['icon-gb-18']} />
                {t('Submission date')}: {moment(createdAt).format(dateFormatPicker)}
              </div>
            )}
          </div>

          <div className={classes['jobItem__container-content__action']}>
            {isApplied ? (
              <ButtonField
                backgroundcolor="#324554"
                backgroundcolorhover="#333"
                uppercase
                padding="5px"
              >
                <AiOutlineEyeInvisible style={{ marginRight: '5px' }} />
                <span>{t('Ẩn')}</span>
              </ButtonField>
            ) : (
              <PopoverField
                title={t('Confirm deletion of saved job posting')}
                loading={loading}
                subTitle={t('Are you sure to delete this saved job posting?')}
                titleCancel={t('Cancel')}
                titleOk={t('Ok')}
                onClickOk={removeSaveJobHandler}
              >
                <ButtonField
                  backgroundcolor="#dd4b39"
                  backgroundcolorhover="#bf0000"
                  uppercase
                  padding="5px"
                >
                  <MdDeleteForever style={{ marginRight: '5px' }} />
                  <span>{t('Delete')}</span>
                </ButtonField>
              </PopoverField>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobItem
