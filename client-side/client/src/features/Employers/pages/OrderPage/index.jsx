import { fetchCartAsync } from 'features/Employers/slices/thunks'
import { Fragment, useEffect, useState } from 'react'
import { LoadingSuspense, NotFoundData, notification, StepsPay } from 'components'
import { PayStep1, PayStep2, PayStep3, PayStep4 } from 'features/Employers/components'
import { selectCart, selectedStatus } from 'features/Employers/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import {
  checkoutCart,
  createPayPal,
  createVnPay,
  fetchCart,
} from 'features/Employers/api/employer.api'

const OrderPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  useTitle(`${t('My orders')}`)
  const carts = useSelector(selectCart) || {}
  const loading = useSelector(selectedStatus)
  const [currentStep, setCurrentStep] = useState(0)
  const [payment, setPayment] = useState(null) // 1: Paypal, 2: VnPay
  const [url, setUrl] = useState('')
  const [isProcess, setIsProcess] = useState(false)
  const [loadingStep, setLoadingStep] = useState(false)

  useEffect(() => {
    dispatch(fetchCartAsync())
  }, [dispatch])

  const changeStep = (current) => {
    if (currentStep === 3) {
      return
    }

    switch (current) {
      case 0: {
        if (isProcess) {
          notification(`${t('Payment in progress')}!!!`, 'warn')
        } else {
          setCurrentStep(current)
        }
        break
      }
      case 1: {
        if (isProcess) {
          notification(`${t('Payment in progress')}!!!`, 'warn')
        } else {
          setCurrentStep(current)
        }
        break
      }
      case 2: {
        handleFetchPrice(current)
        break
      }
      default: {
        setCurrentStep(current)
        break
      }
    }
  }

  const handleFetchPrice = async (current) => {
    if (payment) {
      setLoadingStep(true)
      const res = await fetchCart()
      if (res.status === 'success') {
        const _data = res.data.data || {}
        const paidPrice = _data.paidPrice || {}
        handleCheckoutCart(paidPrice, current)
      } else {
        notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
      }
    } else {
      setCurrentStep(1)
      notification(`${t('Please choose a payment method')}`, 'error')
    }
  }

  const handleCheckoutCart = async (price, step) => {
    const res = await checkoutCart({ data: { paidPrice: price } })
    if (res.status === 'success') {
      const _data = res.data.data || {}
      const { id } = _data
      if (id) {
        handlePayment(id, step)
      }
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
  }

  const handlePayment = async (idOrder, step) => {
    const res =
      payment === 1 ? await createPayPal({ id: idOrder }) : await createVnPay({ id: idOrder })
    if (res.status === 'success') {
      const _data = res.data || {}
      const _url = payment === 1 ? _data.data : payment === 2 ? _data.data.returnUrl : ''
      setUrl(_url)
      setCurrentStep(step)
      setIsProcess(true)
    } else {
      notification(`${t('Error! An error occurred. Please try again later')}`, 'error')
    }
    setLoadingStep(false)
  }

  const stepArray = [
    {
      title: 'Check cart',
      description: '',
      content: () => carts && <PayStep1 data={carts} onChangeStep={() => changeStep(1)} />,
    },
    {
      title: 'Select a payment method',
      description: '',
      content: () => (
        <PayStep2
          data={carts}
          onChangeStep={() => changeStep(2)}
          onChangePaymentType={(val) => setPayment(val)}
          paymentType={payment}
        />
      ),
    },
    {
      title: 'Payment',
      description: '',
      content: () => (
        <PayStep3
          url={url}
          paymentType={payment}
          onChangeStep={() => changeStep(3)}
          onChangeProcess={() => setIsProcess(false)}
        />
      ),
    },
    { title: 'Check the order', description: '', content: () => <PayStep4 /> },
  ]

  return loading ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.order}>
      <div className={classes.order__wrapper}>
        <div className={classes.titleDashboard}>{t('Order list')}</div>
        {(carts.servicePackages || []).length === 0 ? (
          <NotFoundData title={t("You don't have any products in your cart")} />
        ) : (
          <Fragment>
            <div className={classes.subTitleDashboard}>{`${t('There are')} ${
              (carts.servicePackages || []).length
            } ${t('products in your cart')}`}</div>

            <StepsPay
              stepArray={stepArray}
              currentStep={currentStep}
              onChangeStep={changeStep}
            ></StepsPay>
            {loadingStep ? (
              <LoadingSuspense height="80vh" />
            ) : (
              <div className={classes.order__stepContent}>{stepArray[currentStep].content()}</div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default OrderPage
