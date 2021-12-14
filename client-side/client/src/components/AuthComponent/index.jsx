import {
  BackgroundForgot,
  EmployerSignInLottie,
  GuestLogInLottie,
  GuestRegisterLottie,
  EmployerSignUpLottie,
} from 'assets'
import { useRouteMatch } from 'react-router'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import Lottie from 'lottie-react'

const AuthComponent = ({ children, isChangePass = false }) => {
  const { url } = useRouteMatch()
  const { t } = useTranslation()

  return (
    <section className={classes.auth}>
      <div className={classes['auth__title']}>{t('welcome-to-MST')}</div>
      <div className={classes['auth__wrapped']}>
        <div className={classes['auth__wrapped-left']}>
          {url === '/home/sign-in' && <Lottie animationData={GuestLogInLottie} loop={false} />}
          {url === '/home/sign-up' && <Lottie animationData={GuestRegisterLottie} loop={false} />}
          {url === '/home/forgot-pass' && (
            <img src={BackgroundForgot} alt="ForgotPassImage" style={{ maxWidth: '100%' }} />
          )}
          {url === '/employers/sign-in' && <Lottie animationData={EmployerSignInLottie} />}
          {url === '/employers/sign-up' && <Lottie animationData={EmployerSignUpLottie} />}
          {url === '/employers/forgot-pass' && (
            <img src={BackgroundForgot} alt="ForgotPassImage" style={{ maxWidth: '100%' }} />
          )}

          {isChangePass && (
            <img src={BackgroundForgot} alt="ForgotPassImage" style={{ maxWidth: '100%' }} />
          )}
        </div>
        <div className={classes['auth__wrapped-right']}>{children}</div>
      </div>
    </section>
  )
}

export default AuthComponent
