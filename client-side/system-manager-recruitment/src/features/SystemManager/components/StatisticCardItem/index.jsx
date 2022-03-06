import { FaUsers, FaArrowUp, FaBuilding } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

export const StatisticCardItem = ({
  title,
  sum,
  countCurrent,
  isEmployer,
  backgroundColor = '#f5365c',
}) => {
  const { t } = useTranslation()

  return (
    <div className={classes.statisticItem}>
      <div className={classes.statisticItem__top}>
        <div className={classes['statisticItem__top--left']}>
          <div className={classes['statisticItem__top--left--title']}>{t(title)}</div>
          <div className={classes['statisticItem__top--left--count']}>{sum}</div>
        </div>
        <div
          style={{ backgroundColor: backgroundColor }}
          className={classes['statisticItem__top--right']}
        >
          {isEmployer ? (
            <FaBuilding className={classes['statisticItem__top--right--icon']} />
          ) : (
            <FaUsers className={classes['statisticItem__top--right--icon']} />
          )}
        </div>
      </div>
      <div className={classes.statisticItem__bottom}>
        <span className={classes['statisticItem__bottom--left']}>
          <FaArrowUp /> {countCurrent}
        </span>
        <span className={classes['statisticItem__bottom--right']}>{t('Since last month')}</span>
      </div>
    </div>
  )
}
