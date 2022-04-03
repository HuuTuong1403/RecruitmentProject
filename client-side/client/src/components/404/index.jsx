import { Link } from 'react-router-dom'
import { PageNotFoundLottie } from 'assets'
import { useTranslation } from 'react-i18next'
import classes from './styles.module.scss'
import Lottie from 'lottie-react'

export const Page404 = ({ isEmployer = false }) => {
  const { t } = useTranslation()
  return (
    <div className={classes.container}>
      <div className={classes.container__content}>
        <div className={classes.container__title}>
          {t('Sorry, the page could not be found')}
        </div>
        <div className={classes.container__body}>
          {t('This page does not exist or is corrupted due to incorrect URL.')}
        </div>
        <Link className={`${classes['link-no-border']} ${classes["link-fz-16"]}`} to={isEmployer ? '/employers' : '/home'}>
          {t('Back to home page')}
        </Link>
      </div>
      <Lottie className={classes.container__lottie} animationData={PageNotFoundLottie} />
    </div>
  )
}
