import { BiDollarCircle } from 'react-icons/bi'
import { Link, useHistory } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const JobItem = ({ job }) => {
  const { jobTitle, salary, location, company, slug } = job
  const { t } = useTranslation()
  const history = useHistory()

  const handleClickImage = (companyName) => {
    history.push(`/jobs/employer/${companyName}`)
  }

  return (
    <div className={classes.jobitem}>
      <div className={classes.jobitem__container}>
        <div className={classes['jobitem__container--logo']}>
          <img
            onClick={() => handleClickImage(company?.companyName)}
            src={company?.logo}
            alt="Logo"
          />
        </div>
        <div className={classes['jobitem__container--detail']}>
          <div>
            <Link className={classes['jobitem__container--detail--namejob']} to={`/jobs/${slug}`}>
              {jobTitle}
            </Link>
          </div>
          <div>
            <Link
              className={classes['jobitem__container--detail--namecompany']}
              to={`/jobs/employer/${company?.companyName}`}
            >
              {company?.companyName}
            </Link>
          </div>
          <div className={classes['jobitem__container--detail--salary']}>
            <BiDollarCircle style={{ marginRight: '5px' }} />
            <div>
              {salary.min ? `${salary.min} - ${salary.max} ${salary.type}` : t(salary.type)}
            </div>
          </div>
          {location.city && (
            <div className={classes['jobitem__container--detail--location']}>
              <MdLocationOn style={{ marginRight: '5px' }} />
              <span>{location.city}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobItem
