import { fetcAllEventsAsync } from './slices/thunks'
import { Fragment, useEffect } from 'react'
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom'
import { ScrollTop } from 'common/functions'
import { useDispatch } from 'react-redux'
import EventDetailPage from './pages/EventDetailPage'
import Footer from 'components/Footer'
import Header from 'components/Header'
import NotFoundPage from 'components/404'
import SearchEventPage from './pages/SearchEventPage'

const EventsPage = () => {
  ScrollTop()
  const { url } = useRouteMatch()
  const dispatch = useDispatch()
  let query = new URLSearchParams(useLocation().search)
  let type = query.get('type')

  useEffect(() => {
    if (type) {
      dispatch(fetcAllEventsAsync())
    }
  }, [dispatch, type])

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path={`${url}/search`} component={SearchEventPage} />
        <Route exact path={`${url}/view/:slug`} component={EventDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Fragment>
  )
}

export default EventsPage
