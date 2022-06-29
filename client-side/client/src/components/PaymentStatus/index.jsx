import { PaymentSuccess, PaymentFail } from 'assets'
import { useLocation } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import classes from './style.module.scss'
import Lottie from 'lottie-react'

export const PaymentStatusPage = () => {
  const type = new URLSearchParams(useLocation().search).get('type')
  useTitle(type === 'success' ? 'Thanh toán thành công' : 'Thanh toán thất bại')

  return (
    <div className={classes.wrapper}>
      <Lottie
        className={type === 'success' ? classes.success : classes.fail}
        animationData={type === 'success' ? PaymentSuccess : PaymentFail}
      />
      <div
        className={
          type === 'success'
            ? `${classes.title} ${classes.title__success}`
            : `${classes.title} ${classes.title__fail}`
        }
      >
        {type === 'success' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
      </div>
    </div>
  )
}
