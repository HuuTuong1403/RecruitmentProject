import { Fragment } from 'react'
import { IoMdMail } from 'react-icons/io'
import { MdPhone } from 'react-icons/md'
import { schemaSignUpStep1 } from 'common/constants/schema'
import { selectInfoSignUp } from 'features/HomeEmployers/slices/selectors'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonField, WrappedInput as InputField } from 'custom-fields'
import classes from './style.module.scss'

export const StepOneSignUp = ({ onSubmit }) => {
  const { t } = useTranslation()

  const infoSignUp = useSelector(selectInfoSignUp)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSignUpStep1),
  })

  return (
    <Fragment>
      <div className={classes.titleAuth}>
        {t('Step')} 1: {t('Contact Info')}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="email"
          placeholder={t('phd-email-sendmail')}
          {...register('email')}
          defaultValue={infoSignUp?.email}
          errors={errors.email?.message}
          icon={<IoMdMail />}
        />
        <InputField
          type="email"
          placeholder={t('phd-email-confirm')}
          {...register('confirmEmail')}
          defaultValue={infoSignUp?.confirmEmail}
          errors={errors.confirmEmail?.message}
          icon={<IoMdMail />}
        />
        <InputField
          placeholder={t('phd-phone-signup')}
          {...register('phone')}
          defaultValue={infoSignUp?.phone}
          errors={errors.phone?.message}
          icon={<MdPhone />}
        />
        <ButtonField
          type="submit"
          backgroundcolor="#0a426e"
          backgroundcolorhover="#324554"
          uppercase
        >
          {t('next')}
        </ButtonField>
      </form>
    </Fragment>
  )
}
