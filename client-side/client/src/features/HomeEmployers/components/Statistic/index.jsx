import { BiRadar } from 'react-icons/bi'
import { FaBriefcase, FaBuilding, FaIdBadge, FaSearch, FaSeedling } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

export const Statistic = () => {
  const { t } = useTranslation()

  const statisticList = [
    {
      icon: <FaBriefcase />,
      statisticNum: '3.000+',
      description: `${t('Candidates looking for a job at MST Company')}`,
    },
    {
      icon: <FaBuilding />,
      statisticNum: '9.000+',
      description: `${t('Partner businesses use the service')}`,
    },
    {
      icon: <BiRadar />,
      statisticNum: '18.000+',
      description: `${t('Employers use frequently')}`,
    },
    {
      icon: <FaIdBadge />,
      statisticNum: '20.000++',
      description: `${t('New candidates every month')}`,
    },
    {
      icon: <FaSearch />,
      statisticNum: '300.000+',
      description: `${t('Number of candidates accessing monthly')}`,
    },
    {
      icon: <FaSeedling />,
      statisticNum: '400.000+',
      description: `${t(
        'Potential candidates, of which 60% are candidates with 2 years or more experience'
      )}`,
    },
  ]

  return (
    <div className={classes.statistic}>
      <div className={classes.statistic__wrapped}>
        <div className={classes.statistic__title}>{t('Statistics')}</div>

        <ul className={classes.statistic__bottom}>
          {statisticList.map((item, index) => (
            <li className={classes.statistic__bottom__item} key={index}>
              <div className={classes.statistic__bottom__icon}>{item.icon}</div>
              <div className={classes.statistic__bottom__desc}>
                <h2>{item.statisticNum}</h2>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
