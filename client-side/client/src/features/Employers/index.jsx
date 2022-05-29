import { Fragment, useEffect } from 'react'
import { HeaderEmployers, FooterEmployers, Page404, notification } from 'components'
import { MenuEmployer } from './components'
import { routesEmployer } from 'routers/routes'
import { selectEmployerLocal } from './slices/selectors'
import { Switch, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const DashboardEmployersPage = () => {
  const { t } = useTranslation()
  const employer = selectEmployerLocal()
  const history = useHistory()

  useEffect(() => {
    if (!employer) {
      notification(`${t('Please log out of the job seeker account')}`, 'error')
      history.push('/home')
    }
  })

  return (
    <Fragment>
      <HeaderEmployers />
      <MenuEmployer>
        <Switch>
          {routesEmployer.map((route) => {
            return <Route key={route.path} exact path={route.path} component={route.component} />
          })}
          <Route>
            <Page404 isEmployer />
          </Route>
        </Switch>
      </MenuEmployer>
      <FooterEmployers />
    </Fragment>
  )
}

export default DashboardEmployersPage
