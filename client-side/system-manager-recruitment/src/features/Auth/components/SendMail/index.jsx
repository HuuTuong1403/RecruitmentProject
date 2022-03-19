import { Link } from 'react-router-dom'
import { schemaSendMail } from 'common/constants/schema'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonField, WrappedInput as InputField, LabelField } from 'custom-fields'
import classes from './style.module.scss'

export const SendMail = ({ changeToNotify }) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSendMail),
  })

  const onSubmit = async (data) => {
    console.log(data)
    changeToNotify()
  }

  return (
    <div className={classes.sendmail}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['sendmail__form']}>
        <LabelField label="Email" isCompulsory={true} />
        <InputField
          placeholder={t('phd-email')}
          {...register('email')}
          errors={errors.email?.message}
        />

        <ButtonField
          type="submit"
          backgroundcolor="#0a426e"
          backgroundcolorhover="#324554"
          uppercase
        >
          {t('confirm email')}
        </ButtonField>
      </form>

      <div>
        <Link to="/">{t('back sign in')}</Link>
      </div>
    </div>
  )
}
