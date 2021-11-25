import { Fragment, lazy } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import MenuSystemAdmin from './components/MenuSystemAdmin'
import NotFoundPage from 'components/404'

const IssueAccountPage = lazy(() => import('./pages/IssueAccountPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const SettingPage = lazy(() => import('./pages/SettingPage'))
const StatisticPage = lazy(() => import('./pages/StatisticPage'))
const UserManagementPage = lazy(() => import('./pages/UserManagementPage'))

const AdministratorPage = () => {
  const { url } = useRouteMatch()

  return (
    <Fragment>
      <MenuSystemAdmin>
        <Switch>
          <Route exact path={`${url}/statistic`} component={StatisticPage} />
          <Route exact path={`${url}/issue-account`} component={IssueAccountPage} />
          <Route exact path={`${url}/my-profile`} component={ProfilePage} />
          <Route exact path={`${url}/setting`} component={SettingPage} />
          <Route exact path={`${url}/user-manager`} component={UserManagementPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </MenuSystemAdmin>
    </Fragment>
  )
}

export default AdministratorPage
