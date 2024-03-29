import { fetchEmployerDetailAsync } from 'features/SystemManager/slices/thunks'
import { issueAccountEmployer } from 'features/SystemManager/api/systemManager.api'
import { Modal } from 'antd'
import { schemaSignUpEmployer } from 'common/constants/schema'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WrappedInput as InputField, ButtonField, LabelField } from 'custom-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'components'
import classes from './style.module.scss'

export const ModalSignUp = ({ showModal, onCloseModal, id }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSignUpEmployer),
  })

  const submitSignUpEmployer = async (dataSignUp) => {
    setLoading(true)
    const payload = {
      id: id,
      username: dataSignUp.username,
      password: dataSignUp.password,
    }
    const result = await issueAccountEmployer(payload)
    if (result.status === 'success') {
      dispatch(fetchEmployerDetailAsync(id))
      notification(`${t('Grant an account to a successful employer')}`, 'success')
      onCloseModal()
      setLoading(false)
    } else {
      notification(result.message, 'error')
      setLoading(false)
    }
  }

  return (
    <Modal
      centered
      visible={showModal}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      width={700}
      footer={null}
    >
      <div className={classes.modalSignUp}>
        <div className={classes.modalSignUp__wrapped}>
          <div className={classes['modalSignUp__wrapped--title']}>
            {t('Create an account for an employer')}
          </div>
          <form onSubmit={handleSubmit(submitSignUpEmployer)}>
            <div>
              <LabelField label={t('username')} isCompulsory={true} />
              <InputField
                placeholder={t('phd-username-employer')}
                {...register('username')}
                errors={errors?.username?.message}
              />
            </div>
            <div>
              <LabelField label={t('password')} isCompulsory={true} />
              <InputField
                type="password"
                placeholder={t('phd-password-employer')}
                {...register('password')}
                errors={errors?.password?.message}
              />
            </div>
            <div>
              <LabelField label={t('confirm password')} isCompulsory={true} />
              <InputField
                type="password"
                placeholder={t('phd-confirm-pass')}
                {...register('passwordConfirm')}
                errors={errors?.passwordConfirm?.message}
              />
            </div>
            <div className={classes['modalSignUp__wrapped--actions']}>
              <div>
                <ButtonField
                  backgroundcolor="#ff4d4f"
                  backgroundcolorhover="#ff7875"
                  radius="5px"
                  onClick={() => {
                    reset()
                  }}
                >
                  {t('Cancel')}
                </ButtonField>
              </div>
              <div>
                <ButtonField
                  type="submit"
                  backgroundcolor="#0a426e"
                  backgroundcolorhover="#324554"
                  radius="5px"
                  loading={loading}
                >
                  {t('Create account')}
                </ButtonField>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}
