import { ButtonField } from 'custom-fields'
import { changeQuantity, clearServicePackageInCart } from 'features/Employers/slices'
import { notification } from 'components'
import { Table } from 'antd'
import { updateQuantityServicePackage } from 'features/Employers/api/employer.api'
import { useDelay } from 'common/hook/useDelay'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import NumberFormat from 'react-number-format'

export const PayStep1 = ({ data, onChangeStep }) => {
  const dispatch = useDispatch()
  const delay = useDelay(500)
  const { t } = useTranslation()

  const columns = [
    {
      title: `${t('Service package code')}`,
      dataIndex: 'servicePackageCode',
      key: 'servicePackageCode',
      sorter: (a, b) => a.servicePackageCode.length - b.servicePackageCode.length,
    },
    {
      title: `${t('Service package name')}`,
      dataIndex: 'packageName',
      key: 'packageName',
      sorter: (a, b) => a.packageName.length - b.packageName.length,
    },
    {
      title: `${t('Unit price')}`,
      dataIndex: 'price',
      key: 'price',
      render: (text) => (
        <div className={classes.payStep1__table__price}>
          <NumberFormat
            thousandsGroupStyle="thousand"
            thousandSeparator={true}
            value={text}
            suffix=" ₫"
            displayType={'text'}
          />
        </div>
      ),
      align: 'right',
    },
    {
      title: `${t('Quantity')}`,
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <div className={classes.payStep1__table__quantity}>
          <button
            onClick={() => delay(() => handleUpdateSPBtn(record, 'Decrease'))}
            className={classes['payStep1__table__quantity--prev']}
          >
            -
          </button>
          <input
            type="text"
            defaultValue={text}
            key={text}
            onChange={(event) => delay(() => handleUpdateSPInput(record, event.target.value))}
            className={classes['payStep1__table__quantity__num']}
          />
          <button
            onClick={() => delay(() => handleUpdateSPBtn(record, 'Increase'))}
            className={classes['payStep1__table__quantity--next']}
          >
            +
          </button>
        </div>
      ),
      align: 'center',
    },
    {
      title: `${t('Provisional')}`,
      dataIndex: 'provisional',
      key: 'provisional',
      render: (text) => (
        <div className={classes.payStep1__table__price}>
          <NumberFormat
            thousandsGroupStyle="thousand"
            thousandSeparator={true}
            value={text}
            suffix=" ₫"
            displayType={'text'}
          />
        </div>
      ),
      align: 'right',
    },
    {
      title: `${t('Post quantity')}`,
      dataIndex: 'postQuantity',
      key: 'postQuantity',
      align: 'right',
    },
    {
      title: `${t('Sum post quantity')}`,
      dataIndex: 'sumPostQuantity',
      key: 'sumPostQuantity',
      align: 'right',
    },
    {
      title: `${t('Post type')}`,
      dataIndex: 'postType',
      key: 'postType',
    },
  ]

  const datas = data.servicePackages.map((item, i) => {
    const { quantity } = item
    const { _id, packageName, servicePackageCode, price, postQuantity, postType } =
      item.servicePackage
    return {
      key: _id,
      quantity: quantity,
      servicePackageCode: servicePackageCode,
      packageName: packageName,
      price: price.VND,
      provisional: quantity * price.VND,
      postQuantity: postQuantity,
      sumPostQuantity: postQuantity * quantity,
      postType: t(postType),
    }
  })

  const handleUpdateSPBtn = async (item, status) => {
    let _quantity = item.quantity
    if (status === 'Increase') {
      _quantity = item.quantity + 1
    } else if (status === 'Decrease') {
      _quantity = item.quantity - 1
    }

    const res = await updateQuantityServicePackage({
      idServicePackage: item.key,
      data: { quantity: _quantity },
    })

    if (_quantity === 0) {
      dispatch(clearServicePackageInCart({ id: item.key }))
      notify(item.packageName, _quantity)
      return
    }

    if (res.status === 'success') {
      dispatch(changeQuantity({ id: item.key, status, quantity: item.quantity }))
      notify(item.packageName, item.quantity)
    }
  }

  const notify = (packageName, quantity) => {
    if (quantity === 0) {
      notification(
        `${t('Remove service package')} ${packageName} ${t('from cart successfully')}`,
        'success'
      )
    } else {
      notification(
        `${t('Change quantity of service package')} ${packageName} ${t('successfully')}`,
        'success'
      )
    }
  }

  const checkValueQuantity = (val) => {
    const regNum = new RegExp(/^\d+$/)
    if (regNum.test(val)) {
      const quantity = parseInt(val, 0)
      if (quantity > 50) {
        notification(`${t('Please enter a value less than 50')}`, 'error')
        return false
      } else {
        return true
      }
    } else {
      notification(`${t('Please enter the value as number')}`, 'error')
      return false
    }
  }

  const handleUpdateSPInput = async (item, valInput) => {
    if (!checkValueQuantity(valInput)) {
      return
    }

    const quantity = parseInt(valInput, 0)

    const res = await updateQuantityServicePackage({
      idServicePackage: item.key,
      data: { quantity: quantity },
    })

    if (quantity === 0) {
      dispatch(clearServicePackageInCart({ id: item.key }))
      notify(item.packageName, quantity)
    } else {
      if (res.status === 'success') {
        dispatch(changeQuantity({ id: item.key, status: 'Typing', quantity: quantity }))
        notify(item.packageName, quantity)
      }
    }
  }

  const SumPriceFooter = () => {
    const sumQuantity = data.servicePackages.reduce((preVal, curVal) => {
      return preVal + curVal.quantity
    }, 0)

    const sumPrice = data.servicePackages.reduce((preVal, curVal) => {
      return preVal + curVal.quantity * curVal.servicePackage.price.VND
    }, 0)

    return (
      <div className={classes.sumFooter}>
        <div className={classes.sumFooter__wrap}>
          <div className={classes.sumFooter__title}>{t('Total order')}</div>

          <div className={classes.sumFooter__content}>
            <div className={classes.sumFooter__content__tleft}>{t('Total quantity')}:</div>
            <div className={classes.sumFooter__content__tright}>
              {sumQuantity} {t('service package')}
            </div>
          </div>

          <div className={classes.sumFooter__content}>
            <div className={classes.sumFooter__content__tleft}>{t('Total price')}:</div>
            <div className={classes.sumFooter__content__tright}>
              <NumberFormat
                thousandsGroupStyle="thousand"
                thousandSeparator={true}
                value={sumPrice}
                suffix=" ₫"
                displayType={'text'}
              />
            </div>
          </div>

          <hr />

          <ButtonField
            backgroundcolor="#f79d25"
            backgroundcolorhover="#f79d259e"
            radius="5px"
            margin="10px 0 0"
            uppercase
            onClick={onChangeStep}
          >
            {t('Proceed to the payment')}
          </ButtonField>
        </div>
      </div>
    )
  }

  return (
    <Table
      scroll={{ x: 'max-content' }}
      columns={columns}
      dataSource={datas}
      pagination={false}
      footer={() => <SumPriceFooter />}
    />
  )
}
