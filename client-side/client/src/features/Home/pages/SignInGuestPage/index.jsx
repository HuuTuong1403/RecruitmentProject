import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { FaGoogle } from 'react-icons/fa'
import { FiLock, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { schemaSignInUser } from 'common/constants/schema'
import { ScrollToTop } from 'common/functions'
import { selectEmployerLocal } from 'features/Employers/slices/selectors'
import { selectJobSeekerLocal } from 'features/JobSeekers/slices/selectors'
import { signInGuestAsync } from 'features/Home/slices/thunks'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthComponent, notification } from 'components'
import { ButtonField, WrappedInput as InputField } from 'custom-fields'
import classes from './style.module.scss'

const SignInGuestPage = () => {
  ScrollToTop()
  useEffect(() => {
    const user = selectJobSeekerLocal()
    if (user) history.push('/jobseekers')
  })
  let query = new URLSearchParams(useLocation().search)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const employer = selectEmployerLocal()
  const [isVerify, setIsVerify] = useState(query.get('isVerify') ?? null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useTitle(`${t('Sign in as a job seeker')}`)
  useEffect(() => {
    if (employer) {
      notification(`${t('Please log out of the employer account')}`, 'error')
      history.goBack()
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSignInUser),
  })

  const onSubmit = async (dataLogIn) => {
    setIsVerify(null)
    setLoading(true)
    const result = await dispatch(signInGuestAsync(dataLogIn))
    const { data, status } = result.payload

    if (status === 'success') {
      const { isEmailVerified } = data?.JobSeeker
      if (isEmailVerified) {
        setLoading(false)
        notification(`${t('Signed in successfully')}`, 'success')
      } else {
        setLoading(false)
        setIsVerify(
          'The account has not been activated. Please check your email inbox for activation'
        )
      }
    } else {
      setLoading(false)
      reset()
      notification(`${t('Login information is incorrect. Please try again')}`, 'error')
    }
  }

  return (
    <AuthComponent>
      <div className={classes.signin}>
        <div className={classes.signin__wrapped}>
          <div className={classes.contentAuth}>{t('content-signin')}</div>
          <div className={classes.titleAuth}>{t('signin')}</div>
          {isVerify && isVerify !== 'success' && (
            <div className={classes['signin__wrapped--verify']}>
              <AiOutlineCloseCircle style={{ marginRight: '5px' }} />
              {t(isVerify)}
            </div>
          )}
          {isVerify === 'success' && (
            <div className={classes['signin__wrapped--verified']}>
              <AiOutlineCheckCircle style={{ marginRight: '5px' }} />
              {t('Your account has been activated. Please login to use the system')}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className={classes['signin__wrapped-form']}>
            <InputField
              placeholder={t('phd-username-signin')}
              {...register('username')}
              errors={errors.username?.message}
              icon={<FiUser />}
            />

            <InputField
              type="password"
              placeholder={t('phd-pass-signin')}
              {...register('password')}
              errors={errors.password?.message}
              icon={<FiLock />}
            />

            <div className={classes['signin__wrapped-form-link']}>
              <Link className={`${classes['link']} ${classes['medium']}`} to="/home/forgot-pass">
                {t('forgotpass')}
              </Link>
            </div>
            <ButtonField
              type="submit"
              backgroundcolor="#0a426e"
              backgroundcolorhover="#324554"
              uppercase
              loading={loading}
            >
              {t('signin')}
            </ButtonField>
          </form>

          <div className={classes['signin__wrapped-social']}>
            <div className={classes['signin__wrapped-line']}>
              <span>{t('or-signin')}</span>
            </div>

            <div className={classes['signin__wrapped-google']}>
              <ButtonField backgroundcolor="#dd4b39" backgroundcolorhover="#bf0000" uppercase>
                <FaGoogle style={{ marginRight: '5px' }} />
                <span> {t('signin-google')}</span>
              </ButtonField>
            </div>

            <div className={classes['signin__wrapped-signup']}>
              <span>{t('no-account')} </span>
              <Link className={`${classes['link']} ${classes['bold']} `} to="/home/sign-up">
                {t('signup')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthComponent>
  )
}

export default SignInGuestPage
