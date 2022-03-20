import { Fragment, lazy } from 'react'
import { MenuSystemManage } from './components'
import { Page404 } from 'components'
import { pathSystemManager as path } from 'common/constants/path'
import { Switch, Route } from 'react-router-dom'
import EmployerDetailPage from './pages/EmployerDetailPage'

const EmployerManagerPage = lazy(() => import('./pages/EmployerManagerPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const RecruitmentManagerPage = lazy(() => import('./pages/RecruitmentManagerPage'))
const RecruitmentTrashPage = lazy(() => import('./pages/RecruitmentTrashPage'))
const SettingPage = lazy(() => import('./pages/SettingPage'))
const StatisticPage = lazy(() => import('./pages/StatisticPage'))
const ServicePackageListCreated = lazy(() =>
  import('./pages/ServicePackageCreated/ServicePackageCreatedList')
)
const ServicePackageCreateItem = lazy(() =>
  import('./pages/ServicePackageCreated/ServicePackageCreatedItem')
)
const ServicePackageTrashList = lazy(() =>
  import('./pages/ServicePackageCreated/ServicePackageTrashList')
)
const ServiceCreatedPage = lazy(() => import('./pages/ServiceCreatedPage'))

const SystemManagerPage = () => {
  return (
    <Fragment>
      <MenuSystemManage>
        <Switch>
          <Route exact path={path.statistic} component={StatisticPage} />
          <Route exact path={path.employerManager} component={EmployerManagerPage} />
          <Route exact path={path.recruitManager} component={RecruitmentManagerPage} />
          <Route exact path={path.recruitTrash} component={RecruitmentTrashPage} />
          <Route exact path={path.employerDetail} component={EmployerDetailPage} />
          <Route exact path={path.myProfile} component={ProfilePage} />
          <Route exact path={path.settings} component={SettingPage} />
          <Route exact path={path.packageListCreated} component={ServicePackageListCreated} />
          <Route exact path={path.packageCreateItem} component={ServicePackageCreateItem} />
          <Route exact path={path.packageTrash} component={ServicePackageTrashList} />
          <Route exact path={path.serviceCreated} component={ServiceCreatedPage} />
          <Route component={Page404} />
        </Switch>
      </MenuSystemManage>
    </Fragment>
  )
}

export default SystemManagerPage
