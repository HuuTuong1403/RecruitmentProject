import { PaymentFail, PaymentSuccess } from 'assets'
import { useEffect, useState } from 'react'
import classes from './style.module.scss'
import Lottie from 'lottie-react'
import { ButtonField } from 'custom-fields'
import { useTranslation } from 'react-i18next'

export const PayStep3 = ({ url, paymentType, onChangeStep, onChangeProcess }) => {
  const { t } = useTranslation()
  const [status, setStatus] = useState('Paid')

  useEffect(() => {
    if (url) {
      const popUpPayment = window.open(url, '_blank', 'left = 100, top = 100')
      var s = setInterval(() => {
        if (popUpPayment.closed) {
          clearInterval(s)
          console.log('Đóng')
          setStatus('Paid')
        }
      }, 500)
    }
  }, [url])

  const handleOrder = () => {
    onChangeProcess()
    onChangeStep()
  }

  return (
    <div className={classes.payStep3}>
      <div className={classes.payStep3__title}>
        Thanh toán với {paymentType === 1 && 'Paypal'} {paymentType === 2 && 'VnPay'}
      </div>
      {status === 'Paid' && (
        <div className={classes.payStep3__notify}>
          <Lottie className={classes.payStep3__notify__success} animationData={PaymentSuccess} />
          <div
            className={`${classes.payStep3__notify__title} ${classes['payStep3__notify--success']}`}
          >
            {t('Successful bill payment')}
          </div>
        </div>
      )}

      {status === 'NotPaid' && (
        <div className={classes.payStep3__notify}>
          <Lottie className={classes.payStep3__notify__fail} animationData={PaymentFail} />
          <div
            className={`${classes.payStep3__notify__title} ${classes['payStep3__notify--failure']}`}
          >
            {t('Bill payment failed')}
          </div>
        </div>
      )}

      <div className={classes.payStep3__notify__action}>
        <ButtonField
          backgroundcolor="#f79d25"
          backgroundcolorhover="#f79d259e"
          radius="5px"
          margin="10px 0 0"
          width="30%"
          uppercase
          onClick={handleOrder}
        >
          {t('Check the order')}
        </ButtonField>
      </div>
    </div>
  )
}
