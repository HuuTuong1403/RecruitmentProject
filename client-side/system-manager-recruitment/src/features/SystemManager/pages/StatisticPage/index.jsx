import {
  fetchSumEmployer,
  fetchSumJobSeeker,
  fetchEmployerStatisticMonthly,
  fetchJobSeekerStatisticMonthly,
} from 'features/SystemManager/api/systemManager.api'
import { BarChartVertical, LoadingSuspense } from 'components'
import { scrollToTop } from 'common/functions'
import { StatisticCardItem } from 'features/SystemManager/components'
import { useEffect, useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const MONTH_OF_YEAR = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const StatisticPage = () => {
  scrollToTop()
  const { t } = useTranslation()
  useTitle(`${t('Statistics')}`)
  const [loading, setLoading] = useState(true)
  const [dataStatisticCurrentPast, setDataStatisticCurrentPast] = useState([])
  const [dataEmployerMonthly, setDataEmployerMonthly] = useState([])
  const [dataJobSeekerMonthly, setDataJobSeekerMonthly] = useState([])

  const getSumEmployer = async () => {
    const result = await fetchSumEmployer()
    if (result.status === 'success') {
      setDataStatisticCurrentPast((prevState) => [
        ...prevState,
        {
          ...result.data.data,
          title: 'Employer',
          isEmployer: true,
        },
      ])
    }
    setLoading(false)
  }

  const getSumJobSeeker = async () => {
    const result = await fetchSumJobSeeker()
    if (result.status === 'success') {
      setDataStatisticCurrentPast((prevState) => [
        ...prevState,
        {
          ...result.data.data,
          backgroundColor: '#096dd9',
          title: 'Job Seeker',
        },
      ])
    }
    setLoading(false)
  }

  const getEmployerStatisticMonthly = async () => {
    const result = await fetchEmployerStatisticMonthly()
    if (result.status === 'success') {
      setDataEmployerMonthly(result.data.data)
    } else {
      setDataEmployerMonthly([])
    }
    setLoading(false)
  }

  const getJobSeekerStatisticMonthly = async () => {
    const result = await fetchJobSeekerStatisticMonthly()
    if (result.status === 'success') {
      setDataJobSeekerMonthly(result.data.data)
    } else {
      setDataJobSeekerMonthly([])
    }
    setLoading(false)
  }

  useEffect(() => {
    getEmployerStatisticMonthly()
    getJobSeekerStatisticMonthly()
    getSumEmployer()
    getSumJobSeeker()
  }, [])

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.statistics}>
      <div className={classes.statistics__list}>
        {dataStatisticCurrentPast.map((item, index) => (
          <StatisticCardItem
            key={index}
            title={item.title}
            sum={item.past + item.current}
            countCurrent={item.current}
            isEmployer={item.isEmployer}
            backgroundColor={item.backgroundColor}
          />
        ))}
      </div>
      <BarChartVertical
        dataStatistic={dataEmployerMonthly}
        labels={MONTH_OF_YEAR.map((item) => t(item))}
        labelY={t('Number of employers')}
        title={t('Statistics on the number of employers participating in the system by month')}
        labelDataSet={t('Total number of employers')}
        tooltip={t(
          'Statistical chart of the total number of employers registered to join the system by month in the current year'
        )}
      />
      <BarChartVertical
        dataStatistic={dataJobSeekerMonthly}
        labels={MONTH_OF_YEAR.map((item) => t(item))}
        labelY={t('Number of job seekers')}
        title={t('Statistics on the number of job seekers participating in the system by month')}
        labelDataSet={t('Total number of job seekers')}
        tooltip={t(
          'Statistical chart of the total number of job seekers registered to join the system by month in the current year'
        )}
      />
    </div>
  )
}

export default StatisticPage
