import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

export const TableOrderAvailable = ({ orders }) => {
  const { t } = useTranslation()

  const columns = [
    {
      title: `${t('Service package code')}`,
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
    },
    {
      title: `${t('Service package name')}`,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: `${t('Number of service packages')}`,
      dataIndex: 'quantity',
      key: 'quantity',
      width: 250,
      sorter: (a, b) => a.quantity - b.quantity,
      render: (text) => (
        <div style={{ textAlign: 'right', fontWeight: '500' }}>
          {text} {t('service package')}
        </div>
      ),
    },
    {
      title: `${t('Number of remaining posts')}`,
      dataIndex: 'extantQuantity',
      key: 'extantQuantity',
      width: 250,
      sorter: (a, b) => a.extantQuantity - b.extantQuantity,
      render: (text) => (
        <div style={{ textAlign: 'right', fontWeight: '500' }}>
          {text} {t('post')}
        </div>
      ),
    },
    {
      title: `${t('Apply for')}`,
      dataIndex: 'postType',
      key: 'postType',
      sorter: (a, b) => a.postType - b.postType,
      render: (text) => <span>{t(text)}</span>,
    },
    {
      title: `${t('Support services')}`,
      dataIndex: 'services',
      key: 'services',
      width: 250,
      render: (services) => {
        return services.map((service) => {
          const { _id, serviceName } = service
          return (
            <div style={{ fontWeight: '500' }} key={_id}>
              - {serviceName}
            </div>
          )
        })
      },
    },
    {
      title: `${t('Detail')}`,
      dataIndex: 'description',
      key: 'description',
      width: 300,
      sorter: (a, b) => a.description.length - b.description.length,
    },
  ]

  const data = orders.map((item) => {
    const { quantity, servicePackage } = item
    const {
      _id,
      servicePackageCode,
      packageName,
      extantQuantity,
      postType,
      description,
      services,
    } = servicePackage

    return {
      key: _id,
      code: servicePackageCode,
      name: packageName,
      quantity,
      extantQuantity,
      postType,
      description,
      services,
    }
  })

  return (
    <Table
      bordered
      scroll={{ x: 'max-content' }}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
      }}
      style={{ cursor: 'pointer' }}
      showSorterTooltip={false}
    />
  )
}
