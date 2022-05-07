import { ButtonField } from 'custom-fields'
import { PayPal, VnPay } from 'assets'
import { Radio } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import NumberFormat from 'react-number-format'

export const PayStep2 = ({ data, onChangeStep, onChangePaymentType, paymentType }) => {
  const { t } = useTranslation()
  const [title, setTitle] = useState(() => {
    if (paymentType === 1) {
      return 'Selected to pay with PayPal'
    } else if (paymentType === 2) {
      return 'Selected to pay with VnPay'
    } else {
      return 'Select a payment method'
    }
  })

  const sumPrice = data.servicePackages.reduce((preVal, curVal) => {
    return preVal + curVal.quantity * curVal.servicePackage.price.VND
  }, 0)

  const handleChangeRadio = (value) => {
    onChangePaymentType(value)
    if (value === 1) {
      setTitle('Selected to pay with PayPal')
    } else if (value === 2) {
      setTitle('Selected to pay with VnPay')
    }
  }

  return (
    <div className={classes.payStep2}>
      <div className={`${classes.payStep2__wrap} ${classes.payStep2__left}`}>
        <div className={classes.payStep2__title}>{t('Your orders')}</div>
        <div className={`${classes.row} ${classes.payStep2__left__top}`}>
          <div>{t('service package')}</div>
          <div>{t('Provisional')}</div>
        </div>

        <div className={classes.payStep2__left__center}>
          {data.servicePackages.map((servicePackage, index) => {
            return (
              <div className={classes.row} key={index}>
                <div>
                  {servicePackage.servicePackage.packageName} -{' '}
                  {servicePackage.servicePackage.servicePackageCode}
                  <span className={classes.payStep2__left__center__quantity}>
                    {' '}
                    <span>x</span> {servicePackage.quantity}
                  </span>
                </div>
                <div className={classes.payStep2__left__center__price}>
                  <NumberFormat
                    thousandsGroupStyle="thousand"
                    thousandSeparator={true}
                    value={servicePackage.quantity * servicePackage.servicePackage.price.VND}
                    suffix=" ₫"
                    displayType={'text'}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className={`${classes.row} ${classes.payStep2__left__sum}`}>
          <div>{t('Total')}</div>
          <div>
            <NumberFormat
              thousandsGroupStyle="thousand"
              thousandSeparator={true}
              value={sumPrice}
              suffix=" ₫"
              displayType={'text'}
            />
          </div>
        </div>

        <div>
          <ButtonField
            backgroundcolor="#f79d25"
            backgroundcolorhover="#f79d259e"
            radius="5px"
            margin="10px 0 0"
            uppercase
            onClick={onChangeStep}
          >
            {t('Payment')}
          </ButtonField>
        </div>
      </div>

      <div className={`${classes.payStep2__wrap} ${classes.payStep2__right}`}>
        <div className={classes.payStep2__title}>{t(title)}</div>
        <div>
          <Radio.Group
            className={classes.payStep2__payment}
            name="payment"
            defaultValue={paymentType}
            onChange={(e) => handleChangeRadio(e.target.value)}
          >
            <Radio style={{ alignItems: 'center' }} value={1}>
              <div className={classes.payStep2__payment__wrap}>
                <img style={{ width: '80%' }} src={PayPal} alt="Payment with Paypal" />
              </div>
            </Radio>
            <Radio style={{ alignItems: 'center' }} value={2}>
              <div className={classes.payStep2__payment__wrap}>
                <img style={{ width: '80%' }} src={VnPay} alt="Payment with VnPay" />
              </div>
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  )
}
