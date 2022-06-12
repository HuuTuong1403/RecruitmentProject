import { BiDollarCircle } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import { checkTagService } from 'common/functions'
import NumberFormat from 'react-number-format'
import { Fragment } from 'react'

export const JobItem = ({ job }) => {
  const { jobTitle, salary, location, company, slug, servicePackage } = job

  const { t } = useTranslation()
  const history = useHistory()

  const handleClickImage = (companyName) => {
    history.push(`/jobs/employer/${companyName}`)
  }

  return (
    <div className={classes.jobItem}>
      <div className={classes.jobItem__container}>
        <div className={classes['jobItem__container-logo']}>
          <img
            onClick={() => handleClickImage(company?.companyName)}
            src={company?.logo}
            alt="Logo"
          />
        </div>
        <div className={classes['jobItem__container-detail']}>
          <div>
            <a
              href={`/jobs/${slug}`}
              className={`${classes['jobItem__container-detail__jobTitle']} ${
                checkTagService('isHighlight', servicePackage)
                  ? classes['link-no-border-highlight']
                  : classes['link-no-border']
              }`}
              target="_blank"
              rel="noreferrer"
            >
              {jobTitle}
            </a>
          </div>
          <div>
            <a
              className={`${classes['jobItem__container-detail__companyName']} ${classes['link-no-border']}`}
              href={`/jobs/employer/${company?.companyName}`}
              target="_blank"
              rel="noreferrer"
            >
              {company?.companyName}
            </a>
          </div>
          <div className={classes['jobItem__container-detail__salary']}>
            <BiDollarCircle style={{ marginRight: '5px' }} />
            <div>
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
          </div>
          {location.city && (
            <div className={classes['jobItem__container-detail__location']}>
              <MdLocationOn style={{ marginRight: '5px' }} />
              <span>{location.city}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
