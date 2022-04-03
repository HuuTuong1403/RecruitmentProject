import { fetcAllEventsAsync } from './slices/thunks'
import { Fragment, useEffect } from 'react'
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom'
import { ScrollToTop } from 'common/functions'
import { useDispatch } from 'react-redux'
import { Header, Footer, Page404 } from 'components'
import EventDetailPage from './pages/EventDetailPage'
import SearchEventPage from './pages/SearchEventPage'

const EventsPage = () => {
  ScrollToTop()
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
        <Route component={Page404} />
      </Switch>
      <Footer />
    </Fragment>
  )
}

export default EventsPage
