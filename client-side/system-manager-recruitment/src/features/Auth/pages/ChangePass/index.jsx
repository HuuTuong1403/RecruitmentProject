import { AuthComponent } from 'features/Auth/components'
import { ButtonField, WrappedInput as InputField, LabelField } from 'custom-fields'
import { schemaChangePassForgot } from 'common/constants/schema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './style.module.scss'

const ChangePassPage = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { token } = useParams()
  useTitle(t('change pass'))

  useEffect(() => {
    if (!token) {
      history.push('/forgot-pass')
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaChangePassForgot),
  })

  const handleChangePass = (data) => {
    console.log(data)
  }

  return (
    <AuthComponent title={t('change your pass')}>
      <form onSubmit={handleSubmit(handleChangePass)} className={classes.changePass}>
        <div>
          <LabelField label={t('new password')} isCompulsory={true} />
          <InputField
            type="password"
            placeholder={t('phd-new-pass')}
            {...register('password')}
            errors={errors.password?.message}
          />
        </div>

        <div>
          <LabelField label={t('confirm password')} isCompulsory={true} />
          <InputField
            type="password"
            placeholder={t('phd-confirm-pass')}
            {...register('passwordConfirm')}
            errors={errors.passwordConfirm?.message}
          />
        </div>
        <div>
          <ButtonField
            type="submit"
            backgroundcolor="#0a426e"
            backgroundcolorhover="#324554"
            uppercase
          >
            {t('change pass')}
          </ButtonField>
        </div>
      </form>
    </AuthComponent>
  )
}

export default ChangePassPage
