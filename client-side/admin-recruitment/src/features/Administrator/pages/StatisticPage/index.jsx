import { ScrollTop } from 'common/functions'
import { useState, useEffect } from 'react'
import { fetchSumUsers, fetchStatisticUsersMonthly } from 'features/Administrator/api/admin.api'
import { useTranslation } from 'react-i18next'
import { useTitle } from 'common/hook/useTitle'
import LoadingSuspense from 'components/Loading'
import StatisticCardItem from 'features/Administrator/components/StatisticCardItem'
import classes from './style.module.scss'
import BarChartVertical from 'components/BarChartVertical'

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
  ScrollTop()
  const { t } = useTranslation()
  useTitle(`${t('Statistics')}`)
  const [loading, setLoading] = useState(true)
  const [dataCurrentPast, setDataCurrentPast] = useState([])
  const [dataUserMonthly, setDataUserMonthly] = useState([])

  const getSumUsers = async () => {
    const result = await fetchSumUsers()
    if (result.status === 'success') {
      setDataCurrentPast((prevState) => [
        ...prevState,
        {
          ...result.data.data,
          title: 'User',
        },
      ])
    }
    setLoading(false)
  }

  const getUserMonthly = async () => {
    const result = await fetchStatisticUsersMonthly()
    if (result.status === 'success') {
      setDataUserMonthly(result.data.data)
    } else {
      setDataUserMonthly([])
    }
    setLoading(false)
  }

  useEffect(() => {
    getUserMonthly()
    getSumUsers()
  }, [])

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.statistics}>
      <div className={classes.statistics__list}>
        {dataCurrentPast.map((item, index) => (
          <StatisticCardItem
            key={index}
            title={item.title}
            sum={item.past + item.current}
            countCurrent={item.current}
            backgroundColor={item.backgroundColor}
          />
        ))}
      </div>
      <BarChartVertical
        dataStatistic={dataUserMonthly}
        labels={MONTH_OF_YEAR.map((item) => t(item))}
        labelY={t('Number of users')}
        title={t('Statistics on the number of users participating in the system by month')}
        labelDataSet={t('Total number of users')}
        tooltip={t(
          'Statistical chart of the total number of users registered to join the system by month in the current year'
        )}
      />
    </div>
  )
}

export default StatisticPage
