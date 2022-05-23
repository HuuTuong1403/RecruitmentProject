import { addFavoriteJob, removeFavoriteJob } from 'features/JobSeekers/api/jobSeeker.api'
import { addJobToFavorite, removeJobOfFavorire } from 'features/JobSeekers/slices'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiDollarCircle } from 'react-icons/bi'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { FaBuilding } from 'react-icons/fa'
import { Fragment } from 'react'
import { IoMdCalendar, IoMdTime } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { selectedIsFilter } from 'features/Jobs/slices/selectors'
import { selectJobSeekerLocal, selectFavoriteJobs } from 'features/JobSeekers/slices/selectors'
import { toggleOpenFilter } from 'features/Jobs/slices'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { notification } from 'components'
import classes from './style.module.scss'
import moment from 'moment'
import { checkTagService } from 'common/functions'

export const JobSearchItem = ({ job, setShowModal, employer }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isOpen = useSelector(selectedIsFilter)
  const user = selectJobSeekerLocal()
  const favoriteJobs = useSelector(selectFavoriteJobs)

  const {
    _id,
    company,
    jobTitle,
    salary,
    skills,
    location,
    aboutCreated,
    createdAt,
    finishDate,
    slug,
    isExpired,
    isNew,
    servicePackage,
  } = job

  const handleClickSkill = () => {
    if (isOpen) {
      dispatch(toggleOpenFilter())
    }
  }

  const removeSaveJobHandler = async () => {
    const result = await removeFavoriteJob(_id)
    if (result.status === 'success') {
      dispatch(removeJobOfFavorire(_id))
      notification(`${t('Successfully unsaved job posting')}`, 'success')
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
  }

  const saveJobHandler = async () => {
    if (user) {
      const result = await addFavoriteJob(_id)
      if (result.status === 'success') {
        dispatch(addJobToFavorite(job))
        notification(`${t('Save job posting successfully')}`, 'success')
      } else {
        notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
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
    <div className={classes.searchItem}>
      <div className={classes['searchItem-wrap']}>
        {isNew && (
          <div className={`${classes.isNew} ${classes['searchItem-wrap--new']}`}>{t('New')}</div>
        )}
        <div className={classes.imageItem}>
          <a target="_blank" href={`/jobs/employer/${company?.companyName}`} rel="noreferrer">
            <img src={company?.logo} alt="" />
            {isExpired && (
              <div className={classes.imageItem__overlay}>
                <div className={classes['imageItem--expired']}>{t('Expired')}</div>
              </div>
            )}
          </a>
        </div>
        <div className={classes['searchItem-block-right']}>
          <div className={classes['searchItem-block-right__header']}>
            <div className={classes['searchItem-block-right__header-left']}>
              <a
                target="_blank"
                className={`${
                  checkTagService('isHighlight', servicePackage)
                    ? classes['link-highlight']
                    : classes['link']
                } ${classes['link-fz-18']} ${classes['bold']}`}
                href={`/jobs/${slug}`}
                rel="noreferrer"
              >
                {jobTitle}
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

          <div className={classes['searchItem-block-right__companyName']}>
            <a
              className={`${classes['link-no-border']} ${classes['link-fz-16']}`}
              href={`/jobs/employer/${company?.companyName}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaBuilding className={classes['icon-gb-18']} />
              {company?.companyName}
            </a>

            {favoriteJobs?.some((item) => item._id === _id) ? (
              <div onClick={removeSaveJobHandler}>
                <AiFillHeart className={classes['icon-gb-red']} />
                <span style={{ color: 'red' }}>{t('Job posting saved')}</span>
              </div>
            ) : (
              <div onClick={saveJobHandler}>
                <AiOutlineHeart className={classes['icon-gb-18']} />
                <span>{t('Save Job')}</span>
              </div>
            )}
          </div>

          <div className={classes['searchItem-block-right__salary']}>
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

          <div className={classes['searchItem-block-right__skill']}>
            <div>{t('Skill')}: </div>
            {skills.map((skill, index) => {
              return (
                <Fragment key={index}>
                  <Link
                    className={`${classes['link-no-border']} ${classes['link-fz-14']}`}
                    onClick={handleClickSkill}
                    to={`/jobs/search?skills=${skill}`}
                  >
                    {skill}
                  </Link>
                  <span>{skills.length - 1 === index ? '' : '|'}</span>
                </Fragment>
              )
            })}
          </div>

          <div className={classes['searchItem-block-right__date']}>
            <div>
              <IoMdCalendar className={classes['icon-gb-18']} />
              {t('post date')}: {moment(createdAt).format(dateFormatPicker)}
            </div>
            <div>
              <IoMdCalendar className={classes['icon-gb-18']} />
              {t('expiration date')}: {moment(finishDate).format(dateFormatPicker)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
