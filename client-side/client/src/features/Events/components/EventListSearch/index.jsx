import { Fragment } from 'react'
import { selectEvents, selectStatus } from 'features/Events/slices/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import LoadingSuspense from 'components/Loading'
import NotFoundData from 'components/NotFoundData'
import PaginationWrap from 'components/PaginationWrap'

const EventListSearch = () => {
  const { t } = useTranslation()
  const eventsSearch = useSelector(selectEvents)
  const loading = useSelector(selectStatus)

  return (
    <section className={classes.searchList}>
      <div className={classes.searchList__container}>
        {loading ? (
          <LoadingSuspense height="40vh" />
        ) : (
          <Fragment>
            <div className={classes['searchList__container--event-found']}>
              <div>
                {eventsSearch.length === 0
                  ? `${t('No event found')}`
                  : `${eventsSearch.length} ${t('events found')}`}
              </div>
              <div>{t('sort by')}</div>
            </div>
            {eventsSearch.length === 0 ? (
              <NotFoundData title={t('There are currently no events matching your criteria')} />
            ) : (
              <PaginationWrap array={eventsSearch} isEvent />
            )}
          </Fragment>
        )}
      </div>
    </section>
  )
}
export default EventListSearch
