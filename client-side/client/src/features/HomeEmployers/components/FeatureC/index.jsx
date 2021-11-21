import { AiFillDashboard } from 'react-icons/ai'
import { FaBullhorn, FaInfo } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const FeatureC = () => {
  const { t } = useTranslation()

  const features = [
    {
      title: `${t('Post job for free')}`,
      icon: <FaBullhorn />,
      content: `${t('If you are an employer, you can post job postings for free and easily')}`,
    },
    {
      title: `${t('Statistics')}`,
      icon: <FaInfo />,
      content: `${t('Data is continuously updated. Make it easy for users to track posted jobs')}`,
    },
    {
      title: `${t('Dashboard')}`,
      icon: <AiFillDashboard />,
      content: `${t('As an employer, you will experience using the dashboard to manage your own')}`,
    },
  ]

  return (
    <div className={classes.featureC}>
      <div className={classes.featureC__wrapped}>
        <div className={classes['featureC__wrapped--title']}>{t('Main features')}</div>
        <ul className={classes['featureC__wrapped--bottom']}>
          {features.map((item, index) => (
            <li key={index}>
              <p>
                <span>{item.icon}</span>
              </p>
              <p>{item.title}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FeatureC
