import { Fragment, lazy } from 'react'
import { ScrollToTop } from 'common/functions'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {Header, Footer, Page404} from 'components'

const ChangePassForgotPage = lazy(() => import('./pages/ChangePassForgotPage'))
const ForgotPassPage = lazy(() => import('./pages/ForgotPassPage'))
const HomeGuestPage = lazy(() => import('./pages/HomeGuestPage'))
const SignInGuestPage = lazy(() => import('./pages/SignInGuestPage'))
const SignUpGuestPage = lazy(() => import('./pages/SignUpGuestPage'))

const HomePage = () => {
  ScrollToTop()
  const { url } = useRouteMatch()

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path={`${url}`} component={HomeGuestPage} />
        <Route path={`${url}/sign-in`} component={SignInGuestPage} />
        <Route path={`${url}/sign-up`} component={SignUpGuestPage} />
        <Route exact path={`${url}/forgot-pass`} component={ForgotPassPage} />
        <Route path={`${url}/forgot-pass/:token`} component={ChangePassForgotPage} />
        <Route component={Page404} />
      </Switch>
      <Footer />
    </Fragment>
  )
}

export default HomePage
