import { Fragment, lazy } from 'react'
import { ScrollToTop } from 'common/functions'
import { Switch, Route } from 'react-router-dom'
import { HeaderEmployers, FooterEmployers, Page404 } from 'components'
import { pathEmployer } from 'common/constants/path'

const ChangePassEmployerPage = lazy(() => import('./pages/ChangePassEmployerPage'))
const ForgotPassEmployerPage = lazy(() => import('./pages/ForgotPassEmployerPage'))
const HomeEmployerPage = lazy(() => import('./pages/HomeEmployerPage'))
const SignInEmployerPage = lazy(() => import('./pages/SignInEmployerPage'))
const SignUpEmployerPage = lazy(() => import('./pages/SignUpEmployerPage'))
const ServicePage = lazy(() => import('./pages/ServicePage'))

const EmployersHomePage = () => {
  ScrollToTop()

  return (
    <Fragment>
      <HeaderEmployers />
      <Switch>
        <Route exact path={pathEmployer.home} component={HomeEmployerPage} />
        <Route exact path={pathEmployer.signIn} component={SignInEmployerPage} />
        <Route exact path={pathEmployer.signUp} component={SignUpEmployerPage} />
        <Route exact path={pathEmployer.forgotPass} component={ForgotPassEmployerPage} />
        <Route exact path={pathEmployer.changePass} component={ChangePassEmployerPage} />
        <Route exact path={pathEmployer.service} component={ServicePage} />
        <Route>
          <Page404 isEmployer />
        </Route>
      </Switch>
      <FooterEmployers />
    </Fragment>
  )
}

export default EmployersHomePage
