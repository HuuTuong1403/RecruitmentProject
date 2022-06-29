import { fetchAllJobApplicationAsync } from 'features/JobSeekers/slices/thunks'
import { Fragment, useEffect } from 'react'
import { ScrollToTop } from 'common/functions'
import { selectApplicationJobs, selectedStatus } from 'features/JobSeekers/slices/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { JobItem } from 'features/JobSeekers/components'
import { LoadingSuspense, NotFoundData } from 'components'
import classes from './style.module.scss'

const JobAppliedPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loading = useSelector(selectedStatus)
  const applicationJobs = useSelector(selectApplicationJobs)
  useTitle(`${t('Applied jobs')}`)

  useEffect(() => {
    dispatch(fetchAllJobApplicationAsync())
  }, [dispatch])

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    applicationJobs && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('List of jobs applied')}</div>
        <div className={classes.subTitleDashboard}>
          {`${t('You have applied for')} 
              ${applicationJobs.length} 
              ${applicationJobs.length > 1 ? t('jobs') : t('job')}`}
        </div>
        {applicationJobs.length === 0 ? (
          <NotFoundData title={t('No applied jobs')} />
        ) : (
          <div className={classes.listJob}>
            {applicationJobs.map((job, index) => {
              return (
                <JobItem
                  isApplied
                  key={index}
                  data={job?.job}
                  createdAt={job?.createdAt}
                  status={job?.status}
                  isAnnounced={job?.isAnnounced}
                />
              )
            })}
          </div>
        )}
      </Fragment>
    )
  )
}

export default JobAppliedPage
