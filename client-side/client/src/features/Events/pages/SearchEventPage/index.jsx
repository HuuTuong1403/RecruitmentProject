import { clearNullObject } from 'common/functions'
import { fetchSearchEventsAsync } from 'features/Events/slices/thunks'
import { Fragment, useEffect } from 'react'
import { ScrollToTop } from 'common/functions'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import EventListSearch from 'features/Events/components/EventListSearch'
import SearchEventHeader from 'features/Events/components/SearchEventHeader'

const SearchEventPage = () => {
  ScrollToTop()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let query = new URLSearchParams(useLocation().search)
  const eventName = query.get('eventName')
  const eventOrganizer = query.get('eventOrganizer')
  const topic = query.get('topic')
  const companyName = query.get('companyName')
  const location = query.get('address%city')
  const status = query.get('status')
  const createdAt = query.get('createdAt')

  let filter = clearNullObject({
    eventName,
    'address%city': location,
    eventOrganizer,
    topic,
    companyName,
    status,
    createdAt,
  })

  useTitle(
    eventName || eventOrganizer || topic || companyName || location || status || createdAt
      ? `${t('Find a event')} 
        ${eventName ? `${t('with event name')}: ${eventName}` : ''}
        ${eventOrganizer ? `${t('with event organizer')}: ${eventOrganizer}` : ''}
        ${topic ? `${t('with event topic')}: ${topic}` : ''}
        ${companyName ? `${t('of the company')} ${companyName}` : ''}
        ${location ? `${t('at')} ${location}` : ''} 
        ${status ? `${t('with status')}: ${t(status)}` : ''} 
        ${createdAt ? `${t('posted within')} ${createdAt} ${t('day')}` : ''}`
      : `${t('Find all events')}`
  )

  useEffect(() => {
    if (eventName || location || eventOrganizer || topic || companyName || status || createdAt) {
      dispatch(fetchSearchEventsAsync({ filter }))
    }
  })

  return (
    <Fragment>
      <SearchEventHeader />
      <EventListSearch />
    </Fragment>
  )
}

export default SearchEventPage
