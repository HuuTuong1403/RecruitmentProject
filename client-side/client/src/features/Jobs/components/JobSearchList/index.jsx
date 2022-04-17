import { Fragment, useState } from 'react'
import { selectedJobs, selectedStatus } from 'features/Jobs/slices/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {LoadingSuspense, ModalSignIn, NotFoundData, PaginationCus} from 'components'
import classes from './style.module.scss'

export const JobSearchList = ({ employer }) => {
  const { t } = useTranslation()
  const jobsSearch = useSelector(selectedJobs)
  const loading = useSelector(selectedStatus)
  const [showModal, setShowModal] = useState(false)

  const onCloseModal = () => setShowModal(false)

  return (
    <section className={classes.searchList}>
      <div className={classes.searchList__container}>
        {loading ? (
          <LoadingSuspense height="40vh" />
        ) : (
          <Fragment>
            <ModalSignIn onCloseModal={onCloseModal} showModal={showModal} />
            <div className={classes['searchList__container--job-found']}>
              <div>
                {jobsSearch.length === 0
                  ? `${t('No job found')}`
                  : `${jobsSearch.length} ${t('jobs found')}`}
              </div>
              <div>{t('sort by')}</div>
            </div>
            {jobsSearch.length === 0 ? (
              <NotFoundData title={t('There are currently no jobs matching your criteria')} />
            ) : (
              <PaginationCus
                array={jobsSearch}
                setShowModal={setShowModal}
                employer={employer}
                isJob
              />
            )}
          </Fragment>
        )}
      </div>
    </section>
  )
}
