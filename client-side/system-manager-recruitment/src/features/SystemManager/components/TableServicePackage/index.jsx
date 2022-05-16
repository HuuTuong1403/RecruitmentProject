import {
  getAllServicePackageAsync,
  getAllServicePackageDeletedAsync,
} from 'features/SystemManager/slices/thunks'
import {
  softDeleteServicePackage,
  restoreServicePackage,
  hardDeleteServicePackage,
} from 'features/SystemManager/api/systemManager.api'
import { FaEdit, FaTrash, FaTrashRestore } from 'react-icons/fa'
import { Fragment, useState } from 'react'
import { notification } from 'components'
import { pathSystemManager as path } from 'common/constants/path'
import { PopoverField } from 'custom-fields'
import { Table, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import NumberFormat from 'react-number-format'

export const TableServicePackage = ({ datas, isTrash = false }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSoftDeleteServicePackage = async ({ key }) => {
    setLoading(true)
    const result = await softDeleteServicePackage(key)
    if (result.status === 204) {
      notification(t('Delete service package successfully'), 'success')
      dispatch(getAllServicePackageAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
    setLoading(false)
  }

  const handleRestoreServicePackage = async ({ key }) => {
    setLoading(true)
    const result = await restoreServicePackage(key)
    if (result.status === 'success') {
      notification(t('Restore service package successfully'), 'success')
      dispatch(getAllServicePackageDeletedAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
  }

  const handleHardDeleteService = async ({ key }) => {
    setLoading(true)
    const result = await hardDeleteServicePackage(key)
    if (result.status === 204) {
      notification(t('Delete service package successfully'), 'success')
      dispatch(getAllServicePackageDeletedAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
    setLoading(false)
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div className={classes.service__table__action}>
          {isTrash ? (
            <Fragment>
              <Fragment>
                <PopoverField
                  title={t('Confirm restore service package')}
                  subTitle={t('Do you want to restore this service package?')}
                  loading={loading}
                  onClickOk={() => handleRestoreServicePackage(record)}
                  titleCancel={t('Cancel')}
                  titleOk={t('Restore')}
                  isSwap
                >
                  <FaTrashRestore className={`${classes.icon} ${classes.icon__restore}`} />
                </PopoverField>

                <PopoverField
                  title={t('Confirm delete forever service package')}
                  subTitle={t('Do you want to delete forever this service package?')}
                  loading={loading}
                  onClickOk={() => handleHardDeleteService(record)}
                  titleCancel={t('Cancel')}
                  titleOk={t('Delete')}
                >
                  <FaTrash className={`${classes.icon} ${classes.icon__delete}`} />
                </PopoverField>
              </Fragment>
            </Fragment>
          ) : (
            <Fragment>
              <Tooltip title={t('Edit')}>
                <FaEdit
                  className={`${classes.icon} ${classes.icon__edit}`}
                  onClick={() => history.push(`${path.packageCreateItem}?id=${record.key}`)}
                />
              </Tooltip>

              <PopoverField
                title={t('Confirm delete service package')}
                subTitle={t('Do you want to delete this service package?')}
                loading={loading}
                onClickOk={() => handleSoftDeleteServicePackage(record)}
                titleCancel={t('Cancel')}
                titleOk={t('Delete')}
              >
                <FaTrash className={`${classes.icon} ${classes.icon__delete}`} />
              </PopoverField>
            </Fragment>
          )}
        </div>
      ),
    },
    {
      title: `${t('Service package code')}`,
      dataIndex: 'servicePackageCode',
      key: 'servicePackageCode',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: `${t('Service package name')}`,
      dataIndex: 'packageName',
      key: 'packageName',
    },
    {
      title: `${t('Service package description')}`,
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: `${t('Post type')}`,
      dataIndex: 'postType',
      key: 'postType',
    },
    {
      title: `${t('Service package price')}`,
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <Fragment>
          <div className={classes.table__price}>
            <span>Giá tiền Việt:</span>
            <span className={classes.table__price__item}>
              <NumberFormat
                thousandsGroupStyle="thousand"
                thousandSeparator={true}
                value={text.VND}
                suffix="₫"
                displayType={'text'}
              />
            </span>
          </div>
          <div className={classes.table__price}>
            <span>Giá tiền Đô:</span>
            <span className={classes.table__price__item}>
              <NumberFormat
                thousandsGroupStyle="thousand"
                thousandSeparator={true}
                value={text.USD}
                suffix="$"
                displayType={'text'}
              />
            </span>
          </div>
          <div className={classes.table__price}>
            <span>Giá tiền Euro:</span>
            <span className={classes.table__price__item}>
              <NumberFormat
                thousandsGroupStyle="thousand"
                thousandSeparator={true}
                value={text.EUR}
                suffix="€"
                displayType={'text'}
              />
            </span>
          </div>
        </Fragment>
      ),
    },
    {
      title: `${t('Services support')}`,
      dataIndex: 'services',
      key: 'services',
      width: 300,
      render: (datas) => {
        return datas.map((data) => (
          <div className={classes.table__service} key={data._id}>
            <div className={classes.table__service__title}>{data.serviceName}:</div>
            <div className={classes.table__service__body}>
              <div>Mô tả: {data.description}</div>
              <div>
                Giá:{' '}
                <span className={classes.table__service__body__price}>
                  <NumberFormat
                    thousandsGroupStyle="thousand"
                    thousandSeparator={true}
                    value={data.price}
                    suffix="₫"
                    displayType={'text'}
                  />
                </span>
              </div>
            </div>
          </div>
        ))
      },
    },
    {
      title: `${t('Post quantity')}`,
      dataIndex: 'postQuantity',
      key: 'postQuantity',
      render: (text) => <div style={{ textAlign: 'right' }}>{text}</div>,
    },
  ]

  const dataSource = datas.map((data, index) => ({
    key: data._id,
    stt: index + 1,
    servicePackageCode: data.servicePackageCode,
    packageName: data.packageName,
    description: data.description,
    postType: t(`${data.postType}`),
    price: data.price,
    services: data.services,
    postQuantity: data.postQuantity,
  }))

  return (
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 5 }}
      scroll={{ x: 'max-content' }}
      style={{ cursor: 'pointer' }}
    />
  )
}
