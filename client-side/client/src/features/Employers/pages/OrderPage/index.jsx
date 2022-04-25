import classes from './style.module.scss'
import { useTranslation } from 'react-i18next'
import { useTitle } from 'common/hook/useTitle'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import { fetchCartAsync } from 'features/Employers/slices/thunks'
import { selectCart, selectedStatus } from 'features/Employers/slices/selectors'
import { LoadingSuspense, NotFoundData, StepsPay } from 'components'
import { PayStep1, PayStep2, PayStep3, PayStep4 } from 'features/Employers/components'

const OrderPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  useTitle(`${t('My orders')}`)
  const carts = useSelector(selectCart) || {}
  const loading = useSelector(selectedStatus)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    dispatch(fetchCartAsync())
  }, [dispatch])

  const changeStep = (current) => {
    setCurrentStep(current)
  }

  const stepArray = [
    {
      title: 'Check cart',
      description: '',
      content: () => carts && <PayStep1 data={carts} />,
    },
    { title: 'Select a payment method', description: '', content: () => <PayStep2 /> },
    { title: 'Payment', description: '', content: () => <PayStep3 /> },
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

            <div className={classes.order__stepContent}>{stepArray[currentStep].content()}</div>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default OrderPage
