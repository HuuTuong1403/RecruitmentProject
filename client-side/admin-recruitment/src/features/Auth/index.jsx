import { Fragment, lazy, useEffect } from 'react'
import { selectAdminLocal } from 'features/Administrator/slices/selectors'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import ChangeLang from 'components/ChangeLang'
import NotFoundPage from 'components/404'

const SignInPage = lazy(() => import('./pages/SignInPage'))

const AuthPage = () => {
  const history = useHistory()
  const { url } = useRouteMatch()

  useEffect(() => {
    const admin = selectAdminLocal()
    if (admin) history.push('/dashboard')
  })

  return (
    <Fragment>
      <ChangeLang />
      <Switch>
        <Route exact path={`${url}`} component={SignInPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  )
}

export default AuthPage
