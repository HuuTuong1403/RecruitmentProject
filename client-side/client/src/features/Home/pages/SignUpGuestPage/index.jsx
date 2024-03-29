import { AuthComponent, notification } from 'components'
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { schemaSignUpUser } from 'common/constants/schema'
import { ScrollToTop } from 'common/functions'
import { selectJobSeekerLocal } from 'features/JobSeekers/slices/selectors'
import { signUpGuest } from 'features/Home/api/home.api'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { VerifyNotification } from 'features/Home/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonField, WrappedInput as InputField } from 'custom-fields'
import classes from './style.module.scss'

const SignUpGuestPage = () => {
  ScrollToTop()
  useEffect(() => {
    const user = selectJobSeekerLocal()
    if (user) history.push('/home')
  })
  const history = useHistory()
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  useTitle(`${t('Register for a job seeker account quickly')}`)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSignUpUser),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const result = await signUpGuest(data)
    if (result?.status === 'success') {
      setLoading(false)
      notification(`${t('Successful account registration')}`, 'success')
      setStep(2)
    } else {
      setLoading(false)
      notification(`${result.message}`, 'error')
    }
  }

  return (
    <AuthComponent>
      <div className={classes.signup}>
        <div className={classes.signup__wrapped}>
          <div className={classes.contentAuth}>{t('content-signup')}</div>
          {step === 1 && (
            <Fragment>
              <div className={classes.titleAuth}>{t('signup')}</div>
              <form onSubmit={handleSubmit(onSubmit)} className={classes['signup__wrapped-form']}>
                <InputField
                  placeholder={t('phd-fullname')}
                  {...register('fullname')}
                  errors={errors.fullname?.message}
                />
                <InputField
                  placeholder={t('phd-username-emp-signin')}
                  {...register('username')}
                  errors={errors.username?.message}
                />
                <InputField
                  type="email"
                  placeholder={t('phd-email-sendmail')}
                  {...register('email')}
                  errors={errors.email?.message}
                />
                <InputField
                  placeholder={t('phd-phone-signup')}
                  {...register('phone')}
                  errors={errors.phone?.message}
                />
                <InputField
                  type="password"
                  placeholder={t('phd-pass-signin')}
                  {...register('password')}
                  errors={errors.password?.message}
                />
                <InputField
                  type="password"
                  placeholder={t('phd-confirm-pass')}
                  {...register('passwordConfirm')}
                  errors={errors.passwordConfirm?.message}
                />
                <ButtonField
                  type="submit"
                  backgroundcolor="#0a426e"
                  backgroundcolorhover="#324554"
                  uppercase
                  loading={loading}
                >
                  {t('signup')}
                </ButtonField>
              </form>
            </Fragment>
          )}
          {step === 2 && <VerifyNotification />}
          <div className={classes['signup__wrapped-signin']}>
            <span>{t('have-account')} </span>
            <Link className={`${classes.link} ${classes.bold}`} to="/home/sign-in">
              {t('signin')}
            </Link>
          </div>
        </div>
      </div>
    </AuthComponent>
  )
}

export default SignUpGuestPage
