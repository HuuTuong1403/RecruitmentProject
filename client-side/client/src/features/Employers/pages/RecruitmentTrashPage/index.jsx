import { fetchJobDeletedAsync } from 'features/Employers/slices/thunks'
import { Fragment, useEffect, useState } from 'react'
import { restoreJob } from 'features/Employers/api/employer.api'
import { ScrollToTop } from 'common/functions'
import { selectJobTrash, selectedStatus } from 'features/Employers/slices/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { JobOfEmployerItem } from 'features/Employers/components'
import { LoadingSuspense, NotFoundData, notification } from 'components'
import classes from './style.module.scss'

const RecruitmentTrashPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const jobTrash = useSelector(selectJobTrash)
  const status = useSelector(selectedStatus)
  const [loading, setLoading] = useState(false)

  useTitle(`${t('Manage deleted job postings')}`)

  useEffect(() => {
    dispatch(fetchJobDeletedAsync())
  }, [dispatch])

  const handleRestoreJob = async (id) => {
    setLoading(true)
    const result = await restoreJob(id)
    if (result.status === 'success') {
      notification(`${t('Successfully restored job postings')}`, 'success')
      dispatch(fetchJobDeletedAsync())
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'success')
    }
    setLoading(false)
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    jobTrash && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('Manage deleted job postings')}</div>
        {jobTrash.length === 0 ? (
          <NotFoundData title={t('You have not deleted any job postings')} />
        ) : (
          <Fragment>
            <div className={classes.subTitleDashboard}>{`${t('There are')} ${jobTrash.length} ${t(
              'job posting has been deleted'
            )}`}</div>
            <div className={classes.listItem}>
              {jobTrash.map((job) => (
                <JobOfEmployerItem
                  data={job}
                  isTrash={true}
                  key={job.slug}
                  loading={loading}
                  onRestore={handleRestoreJob}
                />
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default RecruitmentTrashPage
