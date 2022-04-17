import { Fragment, useEffect, lazy } from 'react'
import { selectEmployerLocal } from './slices/selectors'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HeaderEmployers, FooterEmployers, Page404, notification } from 'components'
import { MenuEmployer } from './components'

const CandidateProfileManagementPage = lazy(() => import('./pages/CandidateProfileManagementPage'))
const EmployerProfilePage = lazy(() => import('./pages/EmployersProfilePage'))
const EmployerStatisticPage = lazy(() => import('./pages/EmployerStatisticPage'))
const EventManagementPage = lazy(() => import('./pages/EventManagementPage'))
const EventTrashPage = lazy(() => import('./pages/EventTrashPage'))
const ParticipantsEventPage = lazy(() => import('./pages/ParticipantsEventPage'))
const PostEventPage = lazy(() => import('./pages/PostEventPage'))
const PostJobPage = lazy(() => import('./pages/PostJobPage'))
const RecruitManagementPage = lazy(() => import('./pages/RecruitManagementPage'))
const RecruitmentTrashPage = lazy(() => import('./pages/RecruitmentTrashPage'))
const SettingPage = lazy(() => import('./pages/SettingPage'))
const UpdateEventPage = lazy(() => import('./pages/UpdateEventPage'))

const DashboardEmployersPage = () => {
  const { t } = useTranslation()
  const employer = selectEmployerLocal()
  const history = useHistory()
  const { url } = useRouteMatch()

  useEffect(() => {
    if (!employer) {
      notification(`${t('Please log out of the job seeker account')}`, 'error')
      history.push('/home')
    }
  })

  return (
    <Fragment>
      <HeaderEmployers />
      <MenuEmployer>
        <Switch>
          <Route exact path={`${url}/statistics`} component={EmployerStatisticPage} />
          <Route exact path={`${url}/my-profile`} component={EmployerProfilePage} />
          <Route exact path={`${url}/post-job`} component={PostJobPage} />
          <Route exact path={`${url}/recruit-manage/created`} component={RecruitManagementPage} />
          <Route exact path={`${url}/recruit-manage/trash`} component={RecruitmentTrashPage} />
          <Route exact path={`${url}/events/post-event`} component={PostEventPage} />
          <Route exact path={`${url}/events/:id/edit`} component={UpdateEventPage} />
          <Route exact path={`${url}/events/:id/participants`} component={ParticipantsEventPage} />
          <Route exact path={`${url}/events/created`} component={EventManagementPage} />
          <Route exact path={`${url}/events/deleted`} component={EventTrashPage} />
          <Route
            exact
            path={`${url}/candidate-profiles`}
            component={CandidateProfileManagementPage}
          />
          <Route exact path={`${url}/setting-account`} component={SettingPage} />
          <Route>
            <Page404 isEmployer />
          </Route>
        </Switch>
      </MenuEmployer>
      <FooterEmployers />
    </Fragment>
  )
}

export default DashboardEmployersPage
