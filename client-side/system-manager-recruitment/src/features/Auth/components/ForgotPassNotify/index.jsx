import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'

const ForgotPassNotify = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.forgotPassNotify}>
      <div className={classes.forgotPassNotify__title2}>
        {t('Please check your email and follow the instructions to create a new password')}
      </div>
      <div className={classes.forgotPassNotify__content1}>{t('Instruction forgot pass')}</div>
      <div className={classes.forgotPassNotify__content2}>
        {t('If you need help. Please contact')}:
      </div>
      <div className={classes.forgotPassNotify__content3}>
        Email: <a href="mailto:mst.recruitment10@gmail.com">mst.recruitment10@gmail.com</a>
      </div>
    </div>
  )
}

export default ForgotPassNotify
