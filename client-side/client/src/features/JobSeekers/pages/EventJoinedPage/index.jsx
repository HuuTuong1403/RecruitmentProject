import { ScrollTop } from 'common/functions'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllEventJoinedAsync } from 'features/JobSeekers/slices/thunks'
import { selectEventsJoined, selectedStatus } from 'features/JobSeekers/slices/selectors'
import { Fragment, useEffect } from 'react'
import classes from './style.module.scss'
import EventItem from 'features/JobSeekers/components/EventItem'
import LoadingSuspense from 'components/Loading'
import NotFoundData from 'components/NotFoundData'

const EventJoinedPage = () => {
  ScrollTop()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loading = useSelector(selectedStatus)
  const eventsJoined = useSelector(selectEventsJoined)
  useTitle(`${t('Registered events')}`)

  useEffect(() => {
    dispatch(fetchAllEventJoinedAsync())
  }, [dispatch])

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    eventsJoined && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('List of registered events')}</div>
        <div className={classes.subTitleDashboard}>
          {`${t('You have registered for')} 
              ${eventsJoined.length} 
              ${eventsJoined.length > 1 ? t('events') : t('event')}`}
        </div>
        {eventsJoined.length === 0 ? (
          <NotFoundData title={t('You have not registered to participate in any events yet')} />
        ) : (
          <div className={classes.listItem}>
            {eventsJoined.map((event, index) => (
              <EventItem key={index} data={event} />
            ))}
          </div>
        )}
      </Fragment>
    )
  )
}

export default EventJoinedPage
