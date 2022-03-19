import { Table } from 'antd'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import NumberFormat from 'react-number-format'
import classes from './style.module.scss'

export const TableServicePackage = ({ datas }) => {
  const { t } = useTranslation()

  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
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
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 5 }}
      scroll={{ x: 'max-content' }}
      style={{ cursor: 'pointer' }}
    />
  )
}
