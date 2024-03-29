import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { LoadingSuspense, Page404 } from 'components'
import { PATH, pathJobSeeker, pathEmployer } from 'common/constants/path'
import { routes, privateRoutes } from './routes'
import { Suspense } from 'react'
import PrivateRoute from './privateRoutes'

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSuspense height="100vh" showText={true} />}>
        <Switch>
          <Redirect exact from="/" to={PATH.home} />
          <Redirect exact from={pathJobSeeker.jobseekers} to={pathJobSeeker.myProfile} />
          <Redirect exact from={pathEmployer.dashboard} to={pathEmployer.statistic} />

          <Redirect exact from={PATH.jobs} to="/jobs/search?type=all" />
          <Redirect exact from={PATH.events} to="/events/search?type=all" />
          {privateRoutes.map((privateRoute, index) => {
            return (
              <PrivateRoute
                exact={privateRoute.exact}
                component={privateRoute.component}
                key={index}
                path={privateRoute.path}
                role={privateRoute.role}
              />
            )
          })}
          {routes.map((route, index) => {
            return (
              <Route exact={route.exact} path={route.path} key={index}>
                {route.children}
              </Route>
            )
          })}
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routers
