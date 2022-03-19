import { BiArrowBack } from 'react-icons/bi'
import { dateFormatPicker } from 'common/constants/dateFormat'
import { FaEdit, FaTrash, FaTrashRestore } from 'react-icons/fa'
import { FormCreateService } from 'features/SystemManager/components'
import { Fragment, useEffect, useState } from 'react'
import { getAllServiceAsync, getAllDeletedServiceAsync } from 'features/SystemManager/slices/thunks'
import { notification } from 'components'
import { PopoverField } from 'custom-fields'
import { selectServices, selectDeletedServices } from 'features/SystemManager/slices/selectors'
import {
  softDeleteService,
  restoreService,
  hardDeleteService,
} from 'features/SystemManager/api/systemManager.api'
import { Table, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import classes from './style.module.scss'
import moment from 'moment'
import NumberFormat from 'react-number-format'

const ServiceCreatedPage = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isUpdate, setIsUpdate] = useState(false)
  const [dataUpdate, setDataUpdate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const services = useSelector(isDeleted ? selectDeletedServices : selectServices)

  useTitle(isDeleted ? `${t('Deleted service')}` : `${t('Create service')}`)

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllDeletedServiceAsync())
    } else {
      dispatch(getAllServiceAsync())
    }
  }, [dispatch, isDeleted])

  const handleUpdateSerivce = (dataUpdate) => {
    setIsUpdate(true)
    setDataUpdate(dataUpdate)
  }

  const handleSoftDeleteService = async ({ key }) => {
    setLoading(true)
    const result = await softDeleteService(key)
    if (result.status === 204) {
      notification(t('Delete service successfully'), 'success')
      dispatch(getAllServiceAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
    setLoading(false)
  }

  const handleRestoreService = async ({ key }) => {
    setLoading(true)
    const result = await restoreService(key)
    if (result.status === 'success') {
      notification(t('Restore service successfully'), 'success')
      dispatch(getAllDeletedServiceAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
    setLoading(false)
  }

  const handleHardDeleteService = async ({ key }) => {
    setLoading(true)
    const result = await hardDeleteService(key)
    if (result.status === 204) {
      notification(t('Delete service successfully'), 'success')
      dispatch(getAllDeletedServiceAsync())
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
    setLoading(false)
  }

  const handleClickServiceDeleted = () => {
    setIsDeleted(!isDeleted)
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
          {isDeleted ? (
            <Fragment>
              <PopoverField
                title={t('Confirm restore service')}
                subTitle={t('Do you want to restore this service?')}
                loading={loading}
                onClickOk={() => handleRestoreService(record)}
                titleCancel={t('Cancel')}
                titleOk={t('Restore')}
                isSwap
              >
                <FaTrashRestore className={`${classes.icon} ${classes.icon__restore}`} />
              </PopoverField>

              <PopoverField
                title={t('Confirm delete forever service')}
                subTitle={t('Do you want to delete forever this service?')}
                loading={loading}
                onClickOk={() => handleHardDeleteService(record)}
                titleCancel={t('Cancel')}
                titleOk={t('Delete')}
              >
                <FaTrash className={`${classes.icon} ${classes.icon__delete}`} />
              </PopoverField>
            </Fragment>
          ) : (
            <Fragment>
              <Tooltip title={t('Edit')}>
                <FaEdit
                  className={`${classes.icon} ${classes.icon__edit}`}
                  onClick={() => handleUpdateSerivce(record)}
                />
              </Tooltip>

              <PopoverField
                title={t('Confirm delete service')}
                subTitle={t('Do you want to delete this service?')}
                loading={loading}
                onClickOk={() => handleSoftDeleteService(record)}
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
      title: `${t('Service name')}`,
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: `${t('Service description')}`,
      dataIndex: 'serviceDesc',
      key: 'serviceDesc',
    },
    {
      title: `${t('Service price')}`,
      dataIndex: 'servicePrice',
      key: 'servicePrice',
      render: (text) => (
        <NumberFormat
          thousandsGroupStyle="thousand"
          thousandSeparator={true}
          value={text}
          suffix="₫"
          displayType={'text'}
        />
      ),
    },
    {
      title: `${t('Created date')}`,
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ]

  return (
    <div className={classes.service}>
      <div className={classes.service__header}>
        <div className={classes.service__header__left}>
          <div>
            <BiArrowBack onClick={() => history.goBack()} />
          </div>
          <div>{t('Add new service')}</div>
        </div>
        <div onClick={handleClickServiceDeleted} className={classes.service__header__right}>
          {isDeleted ? t('List of service created') : t('List of service deleted')}
        </div>
      </div>
      {!isDeleted && (
        <div className={classes.service__body}>
          <FormCreateService
            isUpdate={isUpdate}
            dataUpdate={dataUpdate}
            setIsUpdate={setIsUpdate}
            setDataUpdate={setDataUpdate}
          />
        </div>
      )}
      <div className={classes.service__table}>
        <div className={classes.service__table__title}>
          {isDeleted ? t('List of service deleted') : t('List of services in system')}
        </div>
        {services && (
          <Table
            columns={columns}
            dataSource={services.map((service, index) => ({
              stt: index + 1,
              key: service._id,
              serviceName: service.serviceName,
              serviceDesc: service.description,
              servicePrice: service.price,
              createdAt: moment(service.createdAt).format(dateFormatPicker),
            }))}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  handleUpdateSerivce(record)
                },
              }
            }}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 'max-content' }}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    </div>
  )
}

export default ServiceCreatedPage
