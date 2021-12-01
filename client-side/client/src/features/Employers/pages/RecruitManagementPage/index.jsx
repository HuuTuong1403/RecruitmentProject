import { fetchJobsOfEmployerAsync } from 'features/Employers/slices/thunks'
import { Fragment, useEffect, useState } from 'react'
import { scrollToTop } from 'common/functions'
import { selectJobsOfEmployer, selectedStatus } from 'features/Employers/slices/selectors'
import { softDeleteJob } from 'features/Employers/api/employer.api'
import { useSelector, useDispatch } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import JobOfEmployerItem from 'features/Employers/components/JobOfEmployerItem'
import LoadingSuspense from 'components/Loading'
import NotFoundData from 'components/NotFoundData'

import notification from 'components/Notification'

const RecruitManagementPage = () => {
  scrollToTop()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const status = useSelector(selectedStatus)
  const jobsOfEmployer = useSelector(selectJobsOfEmployer)
  const [loading, setLoading] = useState(false)

  useTitle(`${t('Manage job postings created')}`)

  useEffect(() => {
    dispatch(fetchJobsOfEmployerAsync())
  }, [dispatch])

  const handleDeleteRecruit = async (id) => {
    setLoading(true)
    const result = await softDeleteJob(id)
    if (result.status === 204) {
      notification(`${t('This job posting has been moved to the trash')}`, 'success')
      dispatch(fetchJobsOfEmployerAsync())
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'success')
    }
    setLoading(false)
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    jobsOfEmployer && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('Manage job postings created')}</div>
        {jobsOfEmployer.length === 0 ? (
          <NotFoundData title={t('You have not posted any job vacancies yet')} />
        ) : (
          <Fragment>
            <div className={classes.subTitleDashboard}>{`${t('There are')} ${
              jobsOfEmployer.length
            } ${t('job postings in total')}`}</div>
            <div className={classes.listItem}>
              {jobsOfEmployer.map((job) => (
                <JobOfEmployerItem
                  data={job}
                  key={job.slug}
                  loading={loading}
                  onDelete={handleDeleteRecruit}
                />
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default RecruitManagementPage
