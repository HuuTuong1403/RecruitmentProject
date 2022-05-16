import { PaymentFail, PaymentSuccess } from 'assets'
import { Fragment, useEffect, useState } from 'react'
import classes from './style.module.scss'
import Lottie from 'lottie-react'
import { ButtonField } from 'custom-fields'
import { useTranslation } from 'react-i18next'
import { getOrder } from 'features/Employers/api/employer.api'
import { LoadingSuspense } from 'components'

export const PayStep3 = ({ dataUrl, idOrder, paymentType, onChangeStep, onChangeProcess }) => {
  const { t } = useTranslation()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleClose = async () => {
      const data = await getOrder({ id: idOrder })
      setStatus(data.status)
      setLoading(false)
    }

    const handleClosePopup = (url, updateUrl) => {
      const popUp = window.open(url, '_blank', 'left = 100, top = 100')
      const s = setInterval(() => {
        if (popUp.closed) {
          clearInterval(s)
          if (updateUrl) {
            handleClosePopup(updateUrl)
            return
          }
          setLoading(true)
          handleClose()
        }
      }, 500)
    }

    if (dataUrl) {
      if (paymentType === 1) {
        handleClosePopup(dataUrl)
      } else if (paymentType === 2) {
        handleClosePopup(dataUrl.returnUrl, dataUrl.updateUrl)
      }
    }
  }, [dataUrl, idOrder, paymentType])

  const handleOrder = () => {
    onChangeProcess()
    onChangeStep()
  }

  return (
    <div className={classes.payStep3}>
      <div className={classes.payStep3__title}>
        Thanh toán với {paymentType === 1 && 'Paypal'} {paymentType === 2 && 'VnPay'}
      </div>

      {loading ? (
        <LoadingSuspense height="50vh" />
      ) : (
        <Fragment>
          {status === 'Paid' && (
            <div className={classes.payStep3__notify}>
              <Lottie
                className={classes.payStep3__notify__success}
                animationData={PaymentSuccess}
              />
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
        </Fragment>
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
