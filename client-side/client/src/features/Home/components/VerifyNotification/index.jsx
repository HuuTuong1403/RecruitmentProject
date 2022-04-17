import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

export const VerifyNotification = () => {
  const { t } = useTranslation()

  return (
    <Fragment>
      <div className={classes.titleAuth}>{t('verify-email')}</div>
      <div className={classes.contentAuth}>{t('notify-verify')}</div>
    </Fragment>
  )
}
