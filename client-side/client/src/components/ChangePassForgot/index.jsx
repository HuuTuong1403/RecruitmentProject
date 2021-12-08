import { schemaChangePassForgot } from 'common/constants/schema'
import { ScrollToTop } from 'common/functions'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthComponent from 'components/AuthComponent'
import ButtonField from 'custom-fields/ButtonField'
import classes from './style.module.scss'
import InputField from 'custom-fields/InputField'
import LabelField from 'custom-fields/LabelField'

const ChangePassForgot = ({ loading, onSubmit }) => {
  ScrollToTop()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaChangePassForgot),
  })

  return (
    <AuthComponent isChangePass>
      <div className={classes.changepass}>
        <div className={classes.changepass__wrapped}>
          <div className={classes.contentAuth}>{t('content-change-pass')}</div>
          <div className={classes.titleAuth}>{t('changepass')}</div>
          <div className={classes.compulsory}>(*: {t('Compulsory')})</div>
          <form onSubmit={handleSubmit(onSubmit)} className={classes['changepass__wrapped--form']}>
            <LabelField label={t('newpass')} isCompulsory />
            <InputField
              type="password"
              placeholder={t('phd-new-pass')}
              {...register('password')}
              errors={errors.password?.message}
            />

            <LabelField label={t('confirm-pass')} isCompulsory />
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
              {t('changepass')}
            </ButtonField>
          </form>
        </div>
      </div>
    </AuthComponent>
  )
}

export default ChangePassForgot
