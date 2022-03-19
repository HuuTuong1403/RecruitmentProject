import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { lazy } from 'react'
import { LoadingSuspense, Page404 } from 'components'
import { pathSystemManager } from 'common/constants/path'
import { Suspense } from 'react'
import PrivateRoute from './privateRoutes'

const AuthPage = lazy(() => import('features/Auth'))
const SystemManagerPage = lazy(() => import('features/SystemManager'))

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSuspense height="100vh" showText={true} />}>
        <Switch>
          <Redirect exact from={pathSystemManager.dashboard} to={pathSystemManager.statistic} />
          <PrivateRoute
            exact={false}
            component={SystemManagerPage}
            path={pathSystemManager.dashboard}
          />
          <Route exact={false} path={pathSystemManager.home} component={AuthPage} />

          <Route component={Page404} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routers
