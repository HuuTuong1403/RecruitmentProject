import { BannerHome, JobList } from 'features/Home/components'
import { fetchJobsAsync } from 'features/Home/slices/thunks'
import { Fragment, useEffect } from 'react'
import { LoadingSuspense } from 'components'
import { ScrollToTop } from 'common/functions'
import { selectJobsHome, selectLoadingHome } from 'features/Home/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'

const HomeGuestPage = () => {
  ScrollToTop()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useTitle(`${t('MST - The system to connect employers and IT industry candidates')}`)

  useEffect(() => {
    dispatch(fetchJobsAsync())
  }, [dispatch])

  const jobs = useSelector(selectJobsHome)
  const loading = useSelector(selectLoadingHome)

  return (
    <Fragment>
      <BannerHome />
      {loading ? (
        <LoadingSuspense height="40vh" />
      ) : jobs ? (
        <JobList jobs={jobs} />
      ) : (
        <div>No see jobs</div>
      )}
    </Fragment>
  )
}

export default HomeGuestPage
