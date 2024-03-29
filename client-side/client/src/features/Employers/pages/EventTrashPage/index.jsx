import { fetchAllEventDeletedAsync } from 'features/Employers/slices/thunks'
import { Fragment, useEffect, useState } from 'react'
import { restoreEvent, deleteEvent } from 'features/Employers/api/employer.api'
import { ScrollToTop } from 'common/functions'
import { selectEventsDeleted, selectedStatus } from 'features/Employers/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import {EventOfEmployerItem} from 'features/Employers/components'
import {LoadingSuspense, NotFoundData, notification} from 'components'
import classes from './style.module.scss'

const EventTrashPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const eventsDeleted = useSelector(selectEventsDeleted)
  const status = useSelector(selectedStatus)
  const [loading, setLoading] = useState(false)

  useTitle(`${t('Manage deleted events')}`)

  useEffect(() => {
    dispatch(fetchAllEventDeletedAsync())
  }, [dispatch])

  const handleRestoreEvent = async (id) => {
    setLoading(true)
    const result = await restoreEvent(id)
    if (result.status === 'success') {
      dispatch(fetchAllEventDeletedAsync())
      notification(`${t('Successfully restored event')}`, 'success')
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setLoading(false)
  }

  const handleDeleteEvent = async (id) => {
    setLoading(true)
    const result = await deleteEvent(id)
    if (result.status === 204) {
      dispatch(fetchAllEventDeletedAsync())
      notification(`${t('Permanently deleted this event')}`, 'success')
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setLoading(false)
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    eventsDeleted && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('Manage deleted events')}</div>
        {eventsDeleted.length === 0 ? (
          <NotFoundData title={t("You haven't deleted any events yet")} />
        ) : (
          <Fragment>
            <div className={classes.subTitleDashboard}>{`${t('There are')} ${
              eventsDeleted.length
            } ${t('event deleted in total')}`}</div>
            <div className={classes.listItem}>
              {eventsDeleted.map((event) => (
                <EventOfEmployerItem
                  data={event}
                  isTrash
                  key={event.slug}
                  loading={loading}
                  onDelete={handleDeleteEvent}
                  onRestore={handleRestoreEvent}
                />
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default EventTrashPage
