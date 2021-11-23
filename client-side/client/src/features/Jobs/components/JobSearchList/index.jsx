import { Fragment, useState } from 'react'
import { selectedJobs, selectedStatus } from 'features/Jobs/slices/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Pagination } from 'antd'
import classes from './style.module.scss'
import JobSearchItem from '../JobSearchItem'
import LoadingSuspense from 'components/Loading'
import NotFoundData from 'components/NotFoundData'
import ModalSignIn from 'components/ModalSignIn'

const JobSearchList = ({ employer }) => {
  const { t } = useTranslation()
  const jobsSearch = useSelector(selectedJobs)
  const loading = useSelector(selectedStatus)
  const [value, setValue] = useState({ min: 0, max: 5 })
  const [showModal, setShowModal] = useState(false)
  const numEachPage = 5

  const handleChangePage = (val) => {
    setValue({
      min: (val - 1) * numEachPage,
      max: val * numEachPage,
    })
  }

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
              jobsSearch.slice(value.min, value.max).map((job) => {
                return (
                  <JobSearchItem
                    setShowModal={setShowModal}
                    key={job.slug}
                    job={job}
                    employer={employer}
                  />
                )
              })
            )}
            <Pagination
              defaultCurrent={1}
              defaultPageSize={numEachPage}
              onChange={handleChangePage}
              total={jobsSearch.length}
            />
          </Fragment>
        )}
      </div>
    </section>
  )
}
export default JobSearchList
