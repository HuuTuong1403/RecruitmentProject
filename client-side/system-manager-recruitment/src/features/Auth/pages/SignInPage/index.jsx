import { AuthComponent } from 'features/Auth/components'
import { ButtonField, WrappedInput as InputField, LabelField } from 'custom-fields'
import { FiLock, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { schemaSignIn } from 'common/constants/schema'
import { signInAuthAsync } from 'features/Auth/slices/thunks'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'components'
import classes from './style.module.scss'

const SignInPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  useTitle(`${t('Sign in as system management')}`)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSignIn),
  })

  const handleSignIn = async (dataSignIn) => {
    setLoading(true)
    const result = await dispatch(signInAuthAsync(dataSignIn))
    const { status } = result.payload
    if (status === 'success') {
      setLoading(false)
      notification(`${t('Signed in successfully')}`, 'success')
      history.push('/dashboard')
    } else {
      setLoading(false)
      reset({
        username: '',
        password: '',
      })
      notification(`${t('Login information is incorrect. Please try again')}`, 'error')
    }
  }

  return (
    <AuthComponent title={t('Sign in with account and password')}>
      <form className={classes.signIn} onSubmit={handleSubmit(handleSignIn)}>
        <div>
          <LabelField label={t('username')} isCompulsory={true} />
          <InputField
            placeholder={t('phd-username')}
            {...register('username')}
            errors={errors.username?.message}
            icon={<FiUser />}
          />
        </div>
        <div>
          <LabelField label={t('password')} isCompulsory={true} />
          <InputField
            type="password"
            placeholder={t('phd-password')}
            {...register('password')}
            errors={errors.password?.message}
            icon={<FiLock />}
          />
        </div>
        <div className={classes.signIn__link}>
          <Link to="/forgot-pass">{t('forgot pass')}?</Link>
        </div>
        <div>
          <ButtonField
            type="submit"
            backgroundcolor="#0a426e"
            backgroundcolorhover="#324554"
            uppercase
            loading={loading}
          >
            {t('signin')}
          </ButtonField>
        </div>
      </form>
    </AuthComponent>
  )
}

export default SignInPage
