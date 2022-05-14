import { LoadingSuspense } from 'components'
import { ButtonField } from 'custom-fields'
import { getOrder } from 'features/Employers/api/employer.api'
import { fetchCartAsync } from 'features/Employers/slices/thunks'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'
import classes from './style.module.scss'

export const PayStep4 = ({ idOrder, onChangeStep, onSetIdOrder }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const handleGetOrder = async () => {
      const data = await getOrder({ id: idOrder })
      setOrder(data)
    }
    handleGetOrder()
  }, [idOrder])

  const handleCompleteCheck = () => {
    onChangeStep()
    onSetIdOrder()
    dispatch(fetchCartAsync())
  }

  return !order ? (
    <LoadingSuspense height="80vh" />
  ) : (
    <div className={classes.payStep4}>
      <div className={classes.payStep4__title}>{t('Check the order')}</div>

      <div className={classes.payStep4__content}>
        <div className={classes.payStep4__content__left}>
          <div className={classes.payStep4__title}>Thông tin gói dịch vụ đã đăng ký</div>
          {order.servicePackages.map((item) => {
            const data = item.servicePackage
            return (
              <div key={data._id}>
                <div className={classes.payStep4__content__left__name}>{data.packageName}:</div>
                <div className={classes.payStep4__content__left__info}>
                  <span>
                    + {t('Service package code')}: <span>{data.servicePackageCode}</span>
                  </span>
                  <span>
                    + {t('Post quantity')}: <span>{data.extantQuantity}</span>
                  </span>
                  <span>
                    + {t('Price')}:{' '}
                    <NumberFormat
                      thousandsGroupStyle="thousand"
                      thousandSeparator={true}
                      value={data.price.VND}
                      suffix=" ₫"
                      displayType={'text'}
                    />
                  </span>
                  <span>
                    + {t('Quantity')}: {item.quantity}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className={classes.payStep4__content__right}>
          <div className={classes.payStep4__title}>Thông tin hóa đơn</div>
          <div className={classes.payStep4__content__right__info}>
            <span>
              + {t('Tổng số lượng gói đã đăng ký')}: <span>{order.totalQuantity}</span>
            </span>

            <span>
              + {t('Tổng thành tiền')}:{' '}
              <NumberFormat
                thousandsGroupStyle="thousand"
                thousandSeparator={true}
                value={order.paidPrice.VND}
                suffix=" ₫"
                displayType={'text'}
              />
            </span>

            <span>
              + {t('Payment method')}: <span>{order.paymentMethods}</span>
            </span>

            <span>
              + {t('Order status')}:{' '}
              <span
                className={
                  order.status === 'Paid'
                    ? classes['payStep4__content__right__info--paid']
                    : classes['payStep4__content__right__info--notPaid']
                }
              >
                {t(`${order.status}`)}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className={classes.payStep4__action}>
        <ButtonField
          backgroundcolor="#f79d25"
          backgroundcolorhover="#f79d259e"
          radius="5px"
          margin="10px 0 0"
          width="100%"
          uppercase
          onClick={handleCompleteCheck}
        >
          {t('Complete invoice check')}
        </ButtonField>
      </div>
    </div>
  )
}
