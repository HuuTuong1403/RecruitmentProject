import { FiLock } from 'react-icons/fi'
import { logoutHandler } from 'features/Auth/slices'
import { schemaChangePass } from 'common/constants/schema'
import { scrollToTop } from 'common/functions'
import { updatePasswordSystemManager } from 'features/SystemManager/api/systemManager.api'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonField from 'custom-fields/ButtonField'
import classes from './style.module.scss'
import InputField from 'custom-fields/InputField'
import LabelField from 'custom-fields/LabelField'
import notification from 'components/Notification'

const SettingPage = () => {
  scrollToTop()
  const { t } = useTranslation()
  useTitle(`${t('Setting')}`)
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaChangePass),
  })

  const handleSubmitChangePass = async (dataChangePass) => {
    setLoading(true)
    const result = await updatePasswordSystemManager(dataChangePass)
    if (result.status === 204) {
      setLoading(false)
      dispatch(logoutHandler())
      notification(`${t('Change password successfully. Please re-login to the system')}`, 'success')
      history.push('/')
    } else {
      setLoading(false)
      notification(result.message, 'error')
    }
  }

  return (
    <div className={classes.changePass}>
      <div className={classes.changePass__wrapped}>
        <div className={classes.titleDashboard}>{t('System management password setting')}</div>
        <div className={classes.subTitleDashboard}>{t('Change login password')}</div>
        <form
          className={classes['changePass__wrapped--changePass']}
          onSubmit={handleSubmit(handleSubmitChangePass)}
        >
          <div>
            <div>
              <LabelField label={t('Enter current password')} isCompulsory={true} />
              <InputField
                type="password"
                placeholder={t('Please enter your current password')}
                {...register('currentPassword')}
                errors={errors?.currentPassword?.message}
                icon={<FiLock />}
              />
            </div>
            <div>
              <LabelField label={t('Enter your new password')} isCompulsory={true} />
              <InputField
                type="password"
                placeholder={t('Please enter a new password')}
                {...register('password')}
                errors={errors?.password?.message}
                icon={<FiLock />}
              />
            </div>
            <div>
              <LabelField label={t('Enter confirm a new password')} isCompulsory={true} />
              <InputField
                type="password"
                placeholder={t('Please enter confirm a new password')}
                {...register('passwordConfirm')}
                errors={errors?.passwordConfirm?.message}
                icon={<FiLock />}
              />
            </div>
            <div className={classes['changePass__wrapped--changePass--actions']}>
              <ButtonField
                type="button"
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                uppercase
                onClick={() => reset()}
              >
                {t('Cancel')}
              </ButtonField>
              <ButtonField
                type="submit"
                backgroundcolor="#0a426e"
                backgroundcolorhover="#324554"
                uppercase
                loading={loading}
              >
                {t('Save')}
              </ButtonField>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SettingPage
