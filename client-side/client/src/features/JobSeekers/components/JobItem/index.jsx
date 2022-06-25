import { BiDollarCircle } from 'react-icons/bi'
import { ButtonField, PopoverField } from 'custom-fields'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { FaBuilding } from 'react-icons/fa'
import { IoMdCalendar, IoMdTime } from 'react-icons/io'
import { MdLocationOn, MdDeleteForever } from 'react-icons/md'
import { removeFavoriteJob } from 'features/JobSeekers/api/jobSeeker.api'
import { removeJobOfFavorire } from 'features/JobSeekers/slices'
import { useDispatch } from 'react-redux'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { notification } from 'components'
import classes from './style.module.scss'
import moment from 'moment'
import { checkTagService } from 'common/functions'
import NumberFormat from 'react-number-format'

export const JobItem = ({ data, isApplied = false, createdAt, status }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const {
    _id,
    company,
    jobTitle,
    salary,
    location,
    aboutCreated,
    finishDate,
    slug,
    isNew,
    servicePackage,
  } = data

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

  const RenderStatus = ({ status }) => {
    if (status === 'Saved') {
      return (
        <span className={`${classes.statusJob} ${classes['statusJob--saved']}`}>
          Hồ sơ đã được nhà tuyển dụng lưu lại
        </span>
      )
    }
    if (status === 'Announced') {
      return (
        <span className={`${classes.statusJob} ${classes['statusJob--announced']}`}>
          Hồ sơ đã được thông báo trúng tuyển
        </span>
      )
    }
    if (status === 'NotSaved') {
      return (
        <span className={`${classes.statusJob} ${classes['statusJob--notSaved']}`}>
          Hồ sơ đang trong giai đoạn ứng tuyển
        </span>
      )
    }
    if (status === 'Deleted') {
      return (
        <span className={`${classes.statusJob} ${classes['statusJob--deleted']}`}>
          Hồ sơ đã bị loại
        </span>
      )
    }
  }

  return (
    <div className={classes.jobItem}>
      <div className={classes.jobItem__container}>
        {isNew && <div className={`${classes.isNew} ${classes['jobItem--new']}`}>{t('New')}</div>}
        {company && (
          <div className={classes['jobItem__container-img']}>
            <a href={`/jobs/employer/${company.companyName}`} target="_blank" rel="noreferrer">
              <img src={company.logo} alt="" />
            </a>
          </div>
        )}
        <div className={classes['jobItem__container-content']}>
          <div className={classes['jobItem__container-content__head']}>
            <div className={classes['jobItem__container-content__head__jobTitle']}>
              <a
                className={`${
                  checkTagService('isHighlight', servicePackage)
                    ? classes['link-highlight']
                    : classes.link
                } ${classes.bold} ${classes['link-fz-18']}`}
                href={`/jobs/${slug}`}
                target="_blank"
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

          <div className={classes['jobItem__container-content__companyName']}>
            <a
              className={`${classes['link-no-border']} ${classes['link-fz-16']}`}
              href={`/jobs/employer/${company?.companyName}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaBuilding className={classes['icon-gb-18']} />
              {company?.companyName}
            </a>
          </div>

          <div className={classes['jobItem__container-content__salary']}>
            <div>
              <BiDollarCircle className={classes['icon-gb-18']} />
              {t('Salary')}:{' '}
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
              <RenderStatus status={status} />
            ) : (
              // <ButtonField
              //   backgroundcolor="#324554"
              //   backgroundcolorhover="#333"
              //   uppercase
              //   padding="5px"
              // >
              //   <AiOutlineEyeInvisible style={{ marginRight: '5px' }} />
              //   <span>{t('Ẩn')}</span>
              // </ButtonField>
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
