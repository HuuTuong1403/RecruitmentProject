import { Fragment, lazy } from 'react'
import { ScrollTop } from 'common/functions'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import FooterEmployers from 'components/FooterEmployers'
import HeaderEmployers from 'components/HeaderEmployers'
import NotFoundPage from '../../components/404'

const ChangePassEmployerPage = lazy(() => import('./pages/ChangePassEmployerPage'))
const ForgotPassEmployerPage = lazy(() => import('./pages/ForgotPassEmployerPage'))
const HomeEmployerPage = lazy(() => import('./pages/HomeEmployerPage'))
const SignInEmployerPage = lazy(() => import('./pages/SignInEmployerPage'))
const SignUpEmployerPage = lazy(() => import('./pages/SignUpEmployerPage'))

const EmployersHomePage = () => {
  ScrollTop()
  const { url } = useRouteMatch()

  return (
    <Fragment>
      <HeaderEmployers />
      <Switch>
        <Route exact path={`${url}`} component={HomeEmployerPage} />
        <Route exact path={`${url}/sign-in`} component={SignInEmployerPage} />
        <Route exact path={`${url}/sign-up`} component={SignUpEmployerPage} />
        <Route exact path={`${url}/forgot-pass`} component={ForgotPassEmployerPage} />
        <Route exact path={`${url}/forgot-pass/:token`} component={ChangePassEmployerPage} />
        <Route>
          <NotFoundPage isEmployer />
        </Route>
      </Switch>
      <FooterEmployers />
    </Fragment>
  )
}

export default EmployersHomePage
