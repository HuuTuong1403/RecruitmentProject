import {
  fetchJobsApplicationDeletedAsync,
  fetchJobsApplicationSavedAsync,
  fetchJobsApplicationNotSavedAsync,
  countApplicationStatusAsync,
  getAllEntryTestAsync,
} from 'features/Employers/slices/thunks'
import {
  selectJobsApplicationNotSaved,
  selectJobsApplicationSaved,
  selectJobsApplicationDeleted,
  selectTabsItem,
  selectDataFilter,
  selectCountApplication,
  selectedStatus,
} from 'features/Employers/slices/selectors'
import { changeTabsItem } from 'features/Employers/slices'
import { Fragment, useEffect, useState } from 'react'
import { ScrollToTop } from 'common/functions'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'common/hook/useWindowSize'
import { LoadingSuspense, NotFoundData } from 'components'
import { SearchJobsApplication, TableJobsApplication } from 'features/Employers/components'
import classes from './style.module.scss'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

const CandidateProfileManagementPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const title = new URLSearchParams(useLocation().search).get('title')
  ScrollToTop()
  const { t } = useTranslation()
  useTitle(`${t('Manage candidate profiles')}`)
  const { TabPane } = Tabs
  const dispatch = useDispatch()
  const [width] = useWindowSize()
  const [selectProfile, setSelectProfile] = useState([])
  const loading = useSelector(selectedStatus)
  const activeTab = useSelector(selectTabsItem)
  const dataFilter = useSelector(selectDataFilter)
  const countApplication = useSelector(selectCountApplication)

  const jobsApplicationNotSaved = useSelector(selectJobsApplicationNotSaved)
  const jobsApplicationSaved = useSelector(selectJobsApplicationSaved)
  const jobsApplicationDeleted = useSelector(selectJobsApplicationDeleted)

  useEffect(() => {
    dispatch(getAllEntryTestAsync())
  }, [dispatch])

  useEffect(() => {
    let filter = {}
    if (dataFilter) {
      filter = dataFilter
      dispatch(fetchJobsApplicationNotSavedAsync({ id, filter }))
    } else {
      filter = {
        status: 'NotSaved',
      }
      dispatch(fetchJobsApplicationNotSavedAsync({ id, filter }))
    }
    dispatch(countApplicationStatusAsync({ id }))
  }, [dispatch, dataFilter, id])

  //Handle change Tab and Call API
  const handleChangeTabs = (activeKey) => {
    if (activeKey !== activeTab) {
      let filter
      dispatch(changeTabsItem(activeKey))
      if (dataFilter) {
        if (
          dataFilter.fullName ||
          dataFilter.startTime ||
          dataFilter.endTime ||
          dataFilter.isExpired
        ) {
          filter = { ...dataFilter, status: activeKey }
        } else {
          filter = { status: activeKey }
        }
      } else {
        filter = {
          status: activeKey,
        }
      }

      if (activeKey === 'NotSaved') {
        dispatch(fetchJobsApplicationNotSavedAsync({ id, filter }))
      }
      if (activeKey === 'Saved') {
        dispatch(fetchJobsApplicationSavedAsync({ id, filter }))
      }
      if (activeKey === 'Deleted') {
        dispatch(fetchJobsApplicationDeletedAsync({ id, filter }))
      }
    }
  }

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <Fragment>
      <div className={classes.headerBack}>
        <div>
          <BiArrowBack onClick={() => history.goBack()} />
        </div>
        <div>
          {t('Manage candidate profiles of job')} <span style={{ fontWeight: 500 }}>{title}</span>
        </div>
      </div>

      <SearchJobsApplication status={activeTab} />

      <div className={classes.manageCandidate__tabs}>
        <Tabs
          defaultActiveKey={activeTab}
          type="line"
          size={width < 500 ? 'small' : width < 800 ? 'middle' : 'large'}
          onChange={handleChangeTabs}
          centered
        >
          <TabPane tab={`${t('Resume Applied')} (${countApplication?.NotSaved})`} key="NotSaved">
            {jobsApplicationNotSaved.length === 0 ? (
              <NotFoundData title={t('There are currently no resumes applying')} />
            ) : (
              <TableJobsApplication isNotSaved jobsApplication={jobsApplicationNotSaved} />
            )}
          </TabPane>
          <TabPane tab={`${t('Bookmarked Resumes')} (${countApplication?.Saved})`} key="Saved">
            {jobsApplicationSaved.length === 0 ? (
              <NotFoundData title={t('There are currently no saved profiles')} />
            ) : (
              <TableJobsApplication
                jobsApplication={jobsApplicationSaved}
                selectProfileList={selectProfile}
                setSelectProfileList={setSelectProfile}
                isSaved
              />
            )}
          </TabPane>
          <TabPane tab={`${t('Deleted Resumes')} (${countApplication?.Deleted})`} key="Deleted">
            {jobsApplicationDeleted.length === 0 ? (
              <NotFoundData title={t('There are currently no deleted profiles')} />
            ) : (
              <TableJobsApplication isDelete jobsApplication={jobsApplicationDeleted} />
            )}
          </TabPane>
        </Tabs>
      </div>
    </Fragment>
  )
}

export default CandidateProfileManagementPage
