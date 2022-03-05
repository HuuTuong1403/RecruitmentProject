import { fetchAllEventOfEmployerAsync } from 'features/Employers/slices/thunks'
import { Fragment, useEffect, useState } from 'react'
import { pauseEventEmployer, softDeleteEvent } from 'features/Employers/api/employer.api'
import { ScrollToTop } from 'common/functions'
import { selectEventsOfEmployer, selectedStatus } from 'features/Employers/slices/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import EventOfEmployerItem from 'features/Employers/components/EventOfEmployerItem'
import LoadingSuspense from 'components/Loading'
import NotFoundData from 'components/NotFoundData'
import notification from 'components/Notification'

const EventManagementPage = () => {
  ScrollToTop()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const eventsOfEmployer = useSelector(selectEventsOfEmployer)
  const status = useSelector(selectedStatus)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  useTitle(`${t('Manage created events')}`)
  useEffect(() => {
    dispatch(fetchAllEventOfEmployerAsync())
  }, [dispatch])

  const handlePausingEvent = async (id) => {
    setLoading(true)
    const result = await pauseEventEmployer(id)
    if (result.status === 'success') {
      dispatch(fetchAllEventOfEmployerAsync())
      notification(`${t('This event has been successfully paused')}`, 'success')
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setVisible(false)
    setLoading(false)
  }

  const handleSoftDeleteEvent = async (id) => {
    setLoading(true)
    const result = await softDeleteEvent(id)
    if (result.status === 204) {
      dispatch(fetchAllEventOfEmployerAsync())
      notification(`${t('This event has been moved to the trash')}`, 'success')
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setVisible(false)
    setLoading(false)
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    eventsOfEmployer && (
      <Fragment>
        <div className={classes.titleDashboard}>{t('Manage created events')}</div>
        {eventsOfEmployer.length === 0 ? (
          <NotFoundData title={t("You haven't created any events yet")} />
        ) : (
          <Fragment>
            <div className={classes.subTitleDashboard}>{`${t('There are')} ${
              eventsOfEmployer.length
            } ${t('event created in total')}`}</div>
            <div className={classes.listItem}>
              {eventsOfEmployer.map((event) => (
                <EventOfEmployerItem
                  data={event}
                  key={event.slug}
                  loading={loading}
                  visible={visible}
                  setVisible={setVisible}
                  onPause={handlePausingEvent}
                  onSoftDelete={handleSoftDeleteEvent}
                />
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default EventManagementPage
