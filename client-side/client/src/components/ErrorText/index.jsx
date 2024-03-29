import { useTranslation } from 'react-i18next'
import { Fragment } from 'react'
import classes from './style.module.scss'

export const ErrorText = ({ errors }) => {
  const { t } = useTranslation()

  return <Fragment>{errors && <p className={classes.errorText}>{t(errors)}</p>}</Fragment>
}
