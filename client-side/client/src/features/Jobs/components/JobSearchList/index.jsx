import { Fragment, useState } from 'react'
import { selectedJobs, selectedStatus } from 'features/Jobs/slices/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import LoadingSuspense from 'components/Loading'
import ModalSignIn from 'components/ModalSignIn'
import NotFoundData from 'components/NotFoundData'
import PaginationWrap from 'components/PaginationWrap'

const JobSearchList = ({ employer }) => {
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
              <PaginationWrap
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
export default JobSearchList
