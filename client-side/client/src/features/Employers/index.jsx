import { Fragment, useEffect, lazy } from 'react'
import { HeaderEmployers, FooterEmployers, Page404, notification } from 'components'
import { MenuEmployer } from './components'
import { pathEmployer } from 'common/constants/path'
import { selectEmployerLocal } from './slices/selectors'
import { Switch, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
const OrderPage = lazy(() => import('./pages/OrderPage'))

const DashboardEmployersPage = () => {
  const { t } = useTranslation()
  const employer = selectEmployerLocal()
  const history = useHistory()

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
          <Route exact path={pathEmployer.statistic} component={EmployerStatisticPage} />
          <Route exact path={pathEmployer.myProfile} component={EmployerProfilePage} />
          <Route exact path={pathEmployer.postJob} component={PostJobPage} />
          <Route exact path={pathEmployer.createdJob} component={RecruitManagementPage} />
          <Route exact path={pathEmployer.deletedJob} component={RecruitmentTrashPage} />
          <Route exact path={pathEmployer.postEvent} component={PostEventPage} />
          <Route exact path={pathEmployer.updateEvent} component={UpdateEventPage} />
          <Route exact path={pathEmployer.participantEvent} component={ParticipantsEventPage} />
          <Route exact path={pathEmployer.createdEvent} component={EventManagementPage} />
          <Route exact path={pathEmployer.deletedEvent} component={EventTrashPage} />
          <Route
            exact
            path={pathEmployer.candidateProfileManage}
            component={CandidateProfileManagementPage}
          />
          <Route exact path={pathEmployer.settingAccount} component={SettingPage} />
          <Route exact path={pathEmployer.order} component={OrderPage} />
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
