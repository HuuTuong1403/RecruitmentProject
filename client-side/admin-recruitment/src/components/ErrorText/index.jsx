import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const ErrorText = (props) => {
  const { t } = useTranslation()
  const { errors } = props

  return <Fragment>{errors && <p className={classes.errorText}>{t(errors)}</p>}</Fragment>
}

export default ErrorText
