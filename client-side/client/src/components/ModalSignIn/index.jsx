import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaGooglePlusSquare } from 'react-icons/fa'
import { FiLock, FiUser } from 'react-icons/fi'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Modal } from 'antd'
import { schemaSignInUser } from 'common/constants/schema'
import { signInGuestAsync } from 'features/Home/slices/thunks'
import { signInEmployerAsync } from 'features/HomeEmployers/slices/thunks'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonField, WrappedInput as InputField } from 'custom-fields'
import { notification } from 'components'
import classes from './style.module.scss'

export const ModalSignIn = ({ onCloseModal, showModal, isEmployee = false }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [isVerify, setIsVerify] = useState(null)
  const history = useHistory()
  const location = useLocation()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'all', resolver: yupResolver(schemaSignInUser) })

  const signInHandler = async (dataLogIn) => {
    setLoading(true)
    if (isEmployee) {
      const result = await dispatch(signInEmployerAsync(dataLogIn))
      const { status } = result.payload
      if (status === 'success') {
        notification(`${t('Signed in successfully')}`, 'success')
        onCloseModal()
        history.push(location.pathname)
      } else {
        notification(`${t('Login information is incorrect. Please try again')}`, 'error')
        reset()
      }
    } else {
      const result = await dispatch(signInGuestAsync(dataLogIn))
      const { data, status } = result.payload

      if (status === 'success') {
        const { isEmailVerified } = data?.JobSeeker
        if (isEmailVerified) {
          notification(`${t('Signed in successfully')}`, 'success')
          onCloseModal()
          history.push(location.pathname)
        } else {
          setIsVerify(
            'The account has not been activated. Please check your email inbox for activation'
          )
        }
      } else {
        notification(`${t('Login information is incorrect. Please try again')}`, 'error')
        reset()
      }
    }
    setLoading(false)
  }

  return (
    <Modal
      centered
      visible={showModal}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      width={850}
      footer={null}
    >
      <div className={classes.modalSignIn}>
        <div className={classes.modalSignIn__title}>
          {isEmployee
            ? t('Please login to the employer account to perform this function')
            : t('Please login to the job seeker account to perform this function')}
        </div>
        {isVerify && (
          <div className={classes.modalSignIn__verify}>
            <AiOutlineCloseCircle style={{ marginRight: '5px' }} />
            {t(isVerify)}
          </div>
        )}
        <form onSubmit={handleSubmit(signInHandler)}>
          <div className={classes.modalSignIn__formSignIn}>
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
            <div className={classes.modalSignIn__forgot}>
              <Link
                className={`${classes['link']} ${classes['link-fz-14']} ${classes['medium']}`}
                to="/home/forgot-pass"
              >
                {t('forgotpass')}
              </Link>
            </div>
          </div>

          <div className={classes.modalSignIn__actions}>
            <div className={classes['modalSignIn__actions-social']}>
              {t('Sign in with')}: <FaGooglePlusSquare className={classes.modalSignIn__icon} />
            </div>
            <div className={classes['modalSignIn__actions-default']}>
              <ButtonField
                type="submit"
                backgroundcolor="#0a426e"
                backgroundcolorhover="#0a436ead"
                padding="5px"
                radius="10px"
                loading={loading}
              >
                {t('signin')}
              </ButtonField>
            </div>
          </div>
        </form>
        <div className={classes.modalSignIn__signUp}>
          <span>{t('no-account')} </span>
          <Link
            className={`${classes['link']} ${classes['link-fz-14']} ${classes['medium']}`}
            to={isEmployee ? '/employers/sign-up' : '/home/sign-up'}
          >
            {t('signup')}
          </Link>
        </div>
      </div>
    </Modal>
  )
}
