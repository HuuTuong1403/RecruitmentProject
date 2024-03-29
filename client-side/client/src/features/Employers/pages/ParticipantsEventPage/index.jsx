import {
  fetchParticipantsByIdEventAsync,
  fetchEventDetailAsync,
} from 'features/Employers/slices/thunks'
import {
  selectParticipantsEvent,
  selectEventDetailEmployer,
  selectedStatus,
} from 'features/Employers/slices/selectors'
import { BiArrowBack } from 'react-icons/bi'
import { ButtonField } from 'custom-fields'
import { exportParticipantExcel } from 'features/Employers/api/employer.api'
import { Fragment, useEffect, useState } from 'react'
import { LoadingSuspense, NotFoundData, notification } from 'components'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { ScrollToTop } from 'common/functions'
import { TableParticipantsEvent } from 'features/Employers/components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const ParticipantsEventPage = () => {
  const history = useHistory()
  ScrollToTop()
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useDispatch()
  const status = useSelector(selectedStatus)
  const participants = useSelector(selectParticipantsEvent)
  const eventDetail = useSelector(selectEventDetailEmployer)
  const [selectParticipantExport, setSelectParticipantExport] = useState([])
  const [loading, setLoading] = useState(false)

  useTitle(`${t('Manage event participants')}`)

  useEffect(() => {
    dispatch(fetchParticipantsByIdEventAsync(id))
    dispatch(fetchEventDetailAsync(id))
  }, [dispatch, id])

  const exportToExcelHandler = async () => {
    if (selectParticipantExport.length > 0) {
      setLoading(true)
      const result = await exportParticipantExcel(selectParticipantExport)
      if (result) {
        const fileExcelDownload = window.URL.createObjectURL(new Blob([result]))
        const link = document.createElement('a')
        link.href = fileExcelDownload
        const fileName = eventDetail.eventName.toLowerCase().split(' ').join('-')
        link.setAttribute('download', `${fileName}-participants.xlsx`)
        document.getElementById('root').appendChild(link)
        link.click()
        link.remove()
        setLoading(false)
      }
    } else {
      notification(`${t('Please select data to export')}`, 'error')
    }
  }

  return status ? (
    <LoadingSuspense height="80vh" />
  ) : (
    participants && (
      <Fragment>
        <div className={classes.headerBack}>
          <div>
            <BiArrowBack onClick={() => history.goBack()} />
          </div>
          <div>
            {t('Manage candidate profiles of job')}{' '}
            <span style={{ fontWeight: 500 }}>{eventDetail?.eventName}</span>
          </div>
        </div>

        {participants.length === 0 ? (
          <NotFoundData title={t('There are currently no participants in this event')} />
        ) : (
          <Fragment>
            <div className={classes.subTitleDashboard}>
              {t('The event has')} {participants.length} {t('people registered to participate')}
            </div>
            <div className={classes.participant__actions}>
              <ButtonField
                backgroundcolor="#067951"
                backgroundcolorhover="#2baa7e"
                onClick={exportToExcelHandler}
                loading={loading}
              >
                <RiFileExcel2Fill className={classes.participant__icon} />
                {t('Export Excel file')}
              </ButtonField>
            </div>
            <TableParticipantsEvent
              onSelect={setSelectParticipantExport}
              participants={participants}
            />
          </Fragment>
        )}
      </Fragment>
    )
  )
}

export default ParticipantsEventPage
