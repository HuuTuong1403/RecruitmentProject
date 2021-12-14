import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { schemaSendMail } from 'common/constants/schema'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonField from 'custom-fields/ButtonField'
import classes from './style.module.scss'
import InputField from 'custom-fields/InputField'
import LabelField from 'custom-fields/LabelField'

const SendMail = ({ onSubmit, loading, isEmployer = false }) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSendMail),
  })

  return (
    <div className={classes.sendMail}>
      <div className={classes.sendMail__wrapped}>
        <div className={classes.contentAuth}>{t('content-sendmail')}</div>
        <div className={classes.titleAuth}>{t('forgotpass')}</div>
        <div className={classes.compulsory}>(*: {t('Compulsory')})</div>
        <form onSubmit={handleSubmit(onSubmit)} className={classes['sendMail__wrapped-form']}>
          <LabelField label={t('label-email-send')} isCompulsory />
          <InputField
            placeholder={t('phd-email-sendmail')}
            {...register('email')}
            errors={errors.email?.message}
          />

          <ButtonField
            type="submit"
            backgroundcolor="#0a426e"
            backgroundcolorhover="#324554"
            uppercase
            loading={loading}
          >
            {t('confirm-email')}
          </ButtonField>
        </form>

        <Link
          className={`${classes['link-no-border']} ${classes['link-fz-16']} ${classes['medium']}`}
          to={isEmployer ? '/employers/sign-in' : '/home/sign-in'}
        >
          <FaAngleLeft className={classes['icon-gb-18']} />
          {t('back-signin')}
        </Link>
      </div>
    </div>
  )
}

export default SendMail
