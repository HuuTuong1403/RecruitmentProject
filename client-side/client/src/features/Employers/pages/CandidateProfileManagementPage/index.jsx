import {
  countApplicationStatusAsync,
  getAllEntryTestAsync,
  fetchApplicationsAsync,
} from 'features/Employers/slices/thunks'
import {
  selectTabsItem,
  selectDataFilter,
  selectCountApplication,
  selectedStatus,
  selectApplications,
} from 'features/Employers/slices/selectors'
import { BiArrowBack } from 'react-icons/bi'
import { changeTabsItem } from 'features/Employers/slices'
import { Fragment, useEffect, useState } from 'react'
import { LoadingSuspense, NotFoundData } from 'components'
import { ScrollToTop } from 'common/functions'
import { SearchJobsApplication, TableJobsApplication } from 'features/Employers/components'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'common/hook/useWindowSize'
import classes from './style.module.scss'

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

  const applications = useSelector(selectApplications)

  useEffect(() => {
    dispatch(getAllEntryTestAsync())
  }, [dispatch])

  useEffect(() => {
    let filter = {}
    if (dataFilter) {
      filter = dataFilter
    } else {
      filter = {
        status: activeTab,
      }
    }
    dispatch(fetchApplicationsAsync({ id, filter }))
    dispatch(countApplicationStatusAsync({ id }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      dispatch(fetchApplicationsAsync({ id, filter }))
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
          <TabPane
            tab={`${t('Resume Applied')} (${countApplication?.NotSaved || 0})`}
            key="NotSaved"
          >
            {applications.length === 0 ? (
              <NotFoundData title={t('There are currently no resumes applying')} />
            ) : (
              <TableJobsApplication isNotSaved jobsApplication={applications} />
            )}
          </TabPane>
          <TabPane tab={`${t('Bookmarked Resumes')} (${countApplication?.Saved || 0})`} key="Saved">
            {applications.length === 0 ? (
              <NotFoundData title={t('There are currently no saved profiles')} />
            ) : (
              <TableJobsApplication
                jobsApplication={applications}
                selectProfileList={selectProfile}
                setSelectProfileList={setSelectProfile}
                isSaved
              />
            )}
          </TabPane>

          <TabPane
            tab={`${t('Deleted Resumes')} (${countApplication?.Deleted || 0})`}
            key="Deleted"
          >
            {applications.length === 0 ? (
              <NotFoundData title={t('There are currently no deleted profiles')} />
            ) : (
              <TableJobsApplication isDelete jobsApplication={applications} />
            )}
          </TabPane>

          <TabPane
            tab={`${t('Testing Resumes')} (${countApplication?.Testing || 0})`}
            key="Testing"
          >
            {applications.length === 0 ? (
              <NotFoundData title={t('There are currently no profiles announced Entry Test')} />
            ) : (
              <TableJobsApplication jobsApplication={applications} isTesting />
            )}
          </TabPane>
          <TabPane tab={`${t('Passed Test Resumes')} (${countApplication?.PassedTest || 0})`} key="PassedTest">
            {applications.length === 0 ? (
              <NotFoundData title={t('There are currently no profiles passed Entry Test')} />
            ) : (
              <TableJobsApplication jobsApplication={applications} isTesting />
            )}
          </TabPane>
          <TabPane tab={`${t('Failed Test Resumes')} (${countApplication?.FailedTest || 0})`} key="FailedTest">
            {applications.length === 0 ? (
              <NotFoundData title={t('There are currently no profiles failed Entry Test')} />
            ) : (
              <TableJobsApplication jobsApplication={applications} isTesting />
            )}
          </TabPane>
        </Tabs>
      </div>
    </Fragment>
  )
}

export default CandidateProfileManagementPage
