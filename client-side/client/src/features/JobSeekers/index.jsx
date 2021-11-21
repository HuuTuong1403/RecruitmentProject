import { Fragment, useEffect, lazy } from 'react'
import { selectJobSeekerLocal } from 'features/JobSeekers/slices/selectors'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Footer from 'components/Footer'
import Header from 'components/Header'
import MenuJobSeeker from './components/MenuJobSeeker'
import NotFoundPage from 'components/404'
import notification from 'components/Notification'

const JobAppliedPage = lazy(() => import('./pages/JobAppliedPage'))
const EventJoinedPage = lazy(() => import('./pages/EventJoinedPage'))
const JobSavedPage = lazy(() => import('./pages/JobSavedPage'))
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'))
const UserSettingPage = lazy(() => import('./pages/UserSettingPage'))

const DashboardJobSeekersPage = () => {
  const { t } = useTranslation()
  const { url } = useRouteMatch()
  const user = selectJobSeekerLocal()
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.push('/home')
      notification(`${t('Please log out of the employer account')}`, 'error')
    }
  })

  return (
    <Fragment>
      <Header />
      <MenuJobSeeker>
        <Switch>
          <Route exact path={`${url}/my-profile`} component={UserProfilePage} />
          <Route exact path={`${url}/events/joined`} component={EventJoinedPage} />
          <Route exact path={`${url}/job-saved`} component={JobSavedPage} />
          <Route exact path={`${url}/job-applied`} component={JobAppliedPage} />
          <Route exact path={`${url}/setting-account`} component={UserSettingPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </MenuJobSeeker>
      <Footer />
    </Fragment>
  )
}

export default DashboardJobSeekersPage
