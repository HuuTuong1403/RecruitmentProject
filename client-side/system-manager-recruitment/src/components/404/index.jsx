import { Link } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import animationData from 'assets/lottie/pageNotFound.json'
import classes from './styles.module.scss'
import Lottie from 'lottie-react'

export const Page404 = () => {
  const { t } = useTranslation()
  useTitle(`${t('Not found page')}`)

  return (
    <div className={classes.container}>
      <div className={classes['container__content']}>
        <div className={classes['container__content--title']}>
          {t('Sorry, the page could not be found')}
        </div>
        <div className={classes['container__content--body']}>
          {t('This page does not exist or has an error due to an incorrect link.')}
        </div>
        <Link to="/">{t('Back to sign in page')}</Link>
      </div>
      <Lottie className={classes.container__lottie} animationData={animationData} />
    </div>
  )
}

