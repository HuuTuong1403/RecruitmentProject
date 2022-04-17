import {
  fetchJobsApplicationNotSavedAsync,
  fetchJobsApplicationSavedAsync,
  fetchJobsApplicationDeletedAsync,
} from 'features/Employers/slices/thunks'
import { addDataFilter } from 'features/Employers/slices'
import { clearNullObject } from 'common/functions'
import { dateFormatPicker, dateFormatSendServer } from 'common/constants/dateFormat'
import { DatePicker } from 'antd'
import { expiredJobOptions } from 'common/constants/options'
import { FaSearch } from 'react-icons/fa'
import { selectDataFilter } from 'features/Employers/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonField, WrappedInput as InputField, LabelField } from 'custom-fields'
import classes from './style.module.scss'
import moment from 'moment'
import Select from 'react-select'

export const SearchJobsApplication = ({ status }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const searchFullNameRef = useRef(null)
  const dataFilter = useSelector(selectDataFilter)

  const optionsExpiredJobs = expiredJobOptions.map((item) => ({
    value: item.value,
    label: t(item.label),
  }))

  const [startTime, setStartTime] = useState(
    dataFilter?.startTime
      ? moment(dataFilter.startTime, dateFormatSendServer).format(dateFormatPicker)
      : ''
  )

  const [endTime, setEndTime] = useState(
    dataFilter?.endTime
      ? moment(dataFilter.endTime, dateFormatSendServer).format(dateFormatPicker)
      : ''
  )

  const [isExpired, setIsExpired] = useState(dataFilter?.isExpired ? dataFilter.isExpired : false)

  //Handle when change select expired
  const changeExpiredJobs = (selectOption) => {
    setIsExpired(selectOption.value)
  }

  //Handle Search with filter
  const handleSearchApplication = (e) => {
    e.preventDefault()
    const fullName = searchFullNameRef.current.value

    let filter
    if (fullName || startTime || endTime || isExpired) {
      filter = clearNullObject({
        status,
        fullName: fullName === '' ? null : fullName,
        startTime:
          startTime !== ''
            ? moment(startTime, dateFormatPicker).format(dateFormatSendServer)
            : null,
        endTime:
          endTime !== '' ? moment(endTime, dateFormatPicker).format(dateFormatSendServer) : null,
        isExpired: isExpired === false ? null : true,
      })
      dispatch(addDataFilter(filter))
      if (status === 'NotSaved') {
        dispatch(fetchJobsApplicationNotSavedAsync({ filter }))
      }
      if (status === 'Saved') {
        dispatch(fetchJobsApplicationSavedAsync({ filter }))
      }
      if (status === 'Deleted') {
        dispatch(fetchJobsApplicationDeletedAsync({ filter }))
      }
    } else {
      filter = clearNullObject({
        status,
        fullName: null,
        startTime: null,
        endTime: null,
      })

      dispatch(addDataFilter(filter))
      if (status === 'NotSaved') {
        dispatch(fetchJobsApplicationNotSavedAsync({ filter: { status } }))
      }
      if (status === 'Saved') {
        dispatch(fetchJobsApplicationSavedAsync({ filter: { status } }))
      }
      if (status === 'Deleted') {
        dispatch(fetchJobsApplicationDeletedAsync({ filter: { status } }))
      }
    }
  }

  //Handle Disabled Date when choose End Date
  const disabledStartTime = (current) => {
    const endDate = moment(endTime, dateFormatPicker)
    return current > moment() || current > endDate
  }

  //Handle Disabled Date when choose Start Date
  const disabledEndTime = (current) => {
    const startDate = moment(startTime, dateFormatPicker)
    return current < startDate || current > moment()
  }

  return (
    <div className={classes.searchApplication}>
      <form onSubmit={handleSearchApplication}>
        <div className={classes.searchApplication__form}>
          {/* JobSeeker Name */}
          <div>
            <LabelField label={t("Job seeker's name")} />
            <div>
              <InputField
                ref={searchFullNameRef}
                defaultValue={dataFilter?.fullName ?? ''}
                placeholder={t("Search keywords by job seeker's name")}
                icon={<FaSearch />}
              />
            </div>
          </div>

          {/* Job Expired */}
          <div>
            <LabelField label={t('Job Status')} />
            <div>
              <Select
                options={optionsExpiredJobs}
                value={optionsExpiredJobs.filter((option) => {
                  return option.value === isExpired
                })}
                onChange={changeExpiredJobs}
              />
            </div>
          </div>

          {/* Application Start Date */}
          <div>
            <LabelField label={t('Start date')} />
            <div>
              <DatePicker
                style={{ minHeight: '38px', width: '100%' }}
                showNow={false}
                format={dateFormatPicker}
                defaultValue={
                  dataFilter?.startTime ? moment(dataFilter.startTime, dateFormatSendServer) : null
                }
                placeholder={t('Start date')}
                disabledDate={disabledStartTime}
                onChange={(_, dateString) => {
                  setStartTime(dateString)
                }}
              />
            </div>
          </div>

          {/* Application End Date */}
          <div>
            <LabelField label={t('End date')} />
            <div>
              <DatePicker
                style={{ minHeight: '38px', width: '100%' }}
                showNow={false}
                format={dateFormatPicker}
                defaultValue={
                  dataFilter?.endTime ? moment(dataFilter.endTime, dateFormatSendServer) : null
                }
                placeholder={t('End date')}
                disabledDate={disabledEndTime}
                onChange={(_, dateString) => {
                  setEndTime(dateString)
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes['searchApplication__form--actions']}>
          <ButtonField
            backgroundcolor="#324554"
            backgroundcolorhover="#333"
            type="submit"
            uppercase
          >
            {t('search')}
          </ButtonField>
        </div>
      </form>
    </div>
  )
}
