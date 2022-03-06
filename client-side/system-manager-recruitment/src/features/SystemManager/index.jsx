import { Fragment, lazy } from 'react'
import { MenuSystemManage } from './components'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import EmployerDetailPage from './pages/EmployerDetailPage'
import { Page404 } from 'components'

const EmployerManagerPage = lazy(() => import('./pages/EmployerManagerPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const RecruitmentManagerPage = lazy(() => import('./pages/RecruitmentManagerPage'))
const RecruitmentTrashPage = lazy(() => import('./pages/RecruitmentTrashPage'))
const SettingPage = lazy(() => import('./pages/SettingPage'))
const StatisticPage = lazy(() => import('./pages/StatisticPage'))
const ServicePackageCreatedPage = lazy(() => import('./pages/ServicePackageCreatedPage'))
const ServicePackageTrashPage = lazy(() => import('./pages/ServicePackageTrashPage'))
const ServiceCreatedPage = lazy(() => import('./pages/ServiceCreatedPage'))

const SystemManagerPage = () => {
  const { url } = useRouteMatch()

  return (
    <Fragment>
      <MenuSystemManage>
        <Switch>
          <Route exact path={`${url}/statistic`} component={StatisticPage} />
          <Route exact path={`${url}/employers`} component={EmployerManagerPage} />
          <Route exact path={`${url}/recruit-manage/created`} component={RecruitmentManagerPage} />
          <Route exact path={`${url}/recruit-manage/trash`} component={RecruitmentTrashPage} />
          <Route exact path={`${url}/employers/view/:id`} component={EmployerDetailPage} />
          <Route exact path={`${url}/my-profile`} component={ProfilePage} />
          <Route exact path={`${url}/setting`} component={SettingPage} />
          <Route
            exact
            path={`${url}/package-manage/created`}
            component={ServicePackageCreatedPage}
          />
          <Route exact path={`${url}/package-manage/trash`} component={ServicePackageTrashPage} />
          <Route exact path={`${url}/service-manage/created`} component={ServiceCreatedPage} />
          <Route component={Page404} />
        </Switch>
      </MenuSystemManage>
    </Fragment>
  )
}

export default SystemManagerPage
