import {
  createServicePackage,
  hardDeleteServicePackage,
  updateServicePackage,
} from 'features/SystemManager/api/systemManager.api'
import {
  getAllServiceAsync,
  getByIdServicePackageAsync,
} from 'features/SystemManager/slices/thunks'
import {
  LabelField,
  InputNumField,
  ButtonField,
  WrappedInput as InputField,
  SelectField,
  SelectMultiField,
  PopoverField,
} from 'custom-fields'
import {
  selectServices,
  selectServicePackage,
  selectStatus,
} from 'features/SystemManager/slices/selectors'
import { BiArrowBack } from 'react-icons/bi'
import { equalTwoArrays } from 'common/functions'
import { FaSave, FaUndo, FaTrash } from 'react-icons/fa'
import { LoadingSuspense, notification } from 'components'
import { postTypeOptions } from 'common/constants/options'
import { schemaCreatePackageService } from 'common/constants/schema'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './style.module.scss'

const ServicePackageCreatedItem = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const { url } = useRouteMatch()
  let query = new URLSearchParams(useLocation().search)
  const idServicePackage = query.get('id')
  const [loading, setLoading] = useState({ create: false, delete: false })
  const [isUpdate, setIsUpdate] = useState(false)
  const servicePackage = useSelector(selectServicePackage)
  const [sumPriceService, setSumPriceService] = useState(
    servicePackage ? servicePackage.price?.VND : 0
  )
  const services = useSelector(selectServices)
  const status = useSelector(selectStatus)
  useTitle(isUpdate ? `${t('Update Service Package')}` : `${t('Create Service Package')}`)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaCreatePackageService),
  })

  const optionsPostType = postTypeOptions.map((item, index) => ({
    value: index === 0 ? t('choose-postType') : item.value,
    label: index === 0 ? t('choose-postType') : t(item.label),
  }))

  useEffect(() => {
    dispatch(getAllServiceAsync())
  }, [dispatch])

  useEffect(() => {
    if (idServicePackage) {
      dispatch(getByIdServicePackageAsync(idServicePackage))
      setIsUpdate(true)
    }
  }, [dispatch, idServicePackage])

  useEffect(() => {
    if (servicePackage) {
      setValue('servicePackageCode', servicePackage.servicePackageCode)
      setValue('packageName', servicePackage.packageName)
      setValue('description', servicePackage.description)
      setValue('postType', servicePackage.postType)
      setValue('postQuantity', servicePackage.postQuantity)
      setSumPriceService(servicePackage.price.VND)
      setValue(
        'services',
        servicePackage.services.map((data) => ({
          value: data._id,
          label: data.serviceName,
          price: data.price,
        }))
      )
    } else {
      setValue('postQuantity', 0)
    }
  }, [setValue, servicePackage])

  const submitFormServicePackage = async (dataServicePackage) => {
    dataServicePackage['services'] = dataServicePackage['services'].map((data) => data.value)
    setLoading((prevValue) => ({ ...prevValue, create: true }))
    const result = await createServicePackage(dataServicePackage)
    if (result.status === 'success') {
      setIsUpdate(true)
      history.replace(`${url}?id=${result.data.data._id}`)
      notification(t('Create service package successfully'), 'success')
    } else {
      notification(result.message, 'error')
    }
    setLoading((prevValue) => ({ ...prevValue, create: false }))
  }

  const submitUpdateServicePackage = async (dataServicePackage) => {
    dataServicePackage['services'] = dataServicePackage['services'].map((data) => data.value)
    const { servicePackageCode, packageName, description, postType, postQuantity, services } =
      dataServicePackage
    setLoading((prevValue) => ({ ...prevValue, create: true }))
    if (
      equalTwoArrays(
        services,
        servicePackage.services.map((service) => service._id)
      ) &&
      sumPriceService === servicePackage.price.VND &&
      postQuantity === servicePackage.postQuantity &&
      postType === servicePackage.postType &&
      description === servicePackage.description &&
      packageName === servicePackage.packageName &&
      servicePackageCode === servicePackage.servicePackageCode
    ) {
      notification(`${t('Updated data unchanged')}`, 'error')
    } else {
      const result = await updateServicePackage(servicePackage._id, dataServicePackage)
      if (result.status === 'success') {
        dispatch(getByIdServicePackageAsync(servicePackage._id))
        notification(t('Update service package successfully'), 'success')
      } else {
        notification(result.message, 'error')
      }
    }
    setLoading((prevValue) => ({ ...prevValue, create: false }))
  }

  const getPriceChange = (option) => {
    setSumPriceService(() => {
      const initValue = 0
      const sumValue = option.reduce((prevValue, currentValue) => {
        return (prevValue += currentValue.price)
      }, initValue)
      return sumValue
    })
  }

  const handleHardDeleteServicePackage = async () => {
    setLoading((prevValue) => ({ ...prevValue, delete: true }))
    const result = await hardDeleteServicePackage(servicePackage._id)
    if (result.status === 204) {
      notification(t('Delete service package successfully'), 'success')
      history.goBack()
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
    setLoading((prevValue) => ({ ...prevValue, delete: false }))
  }

  const handleUndoData = () => {
    dispatch(getByIdServicePackageAsync(idServicePackage))
  }

  return (
    <div className={classes.formServicePackage}>
      <div className={classes.formServicePackage__header}>
        <div>
          <BiArrowBack onClick={() => history.goBack()} />
        </div>
        <div>{isUpdate ? t('Update Service Package') : t('Add new service package')}</div>
      </div>

      <div className={classes.formServicePackage__actions}>
        {isUpdate && (
          <Fragment>
            <ButtonField
              type="button"
              backgroundcolor="#17a2b8"
              backgroundcolorhover="#138496"
              radius="10px"
              padding="5px"
              loading={status}
              onClick={handleUndoData}
            >
              <FaUndo className={classes.formServicePackage__actions__icon} />
              {t('Recovery')}
            </ButtonField>

            <PopoverField
              title={t('Confirm delete forever service package')}
              subTitle={t('Do you want to delete forever this service package?')}
              loading={loading.delete}
              onClickOk={handleHardDeleteServicePackage}
              titleCancel={t('Cancel')}
              titleOk={t('Delete')}
            >
              <ButtonField
                type="button"
                backgroundcolor="#dd4b39"
                backgroundcolorhover="#bf0000"
                radius="10px"
                padding="5px"
              >
                <FaTrash className={classes.formServicePackage__actions__icon} />
                {t('Delete')}
              </ButtonField>
            </PopoverField>
          </Fragment>
        )}

        <ButtonField
          backgroundcolor="#0a426e"
          backgroundcolorhover="#324554"
          radius="10px"
          padding="5px"
          onClick={handleSubmit(isUpdate ? submitUpdateServicePackage : submitFormServicePackage)}
          loading={loading.create}
        >
          <FaSave className={classes.formServicePackage__actions__icon} />
          {isUpdate ? t('Update Service Package') : t('Create Service Package')}
        </ButtonField>
      </div>

      {status ? (
        <LoadingSuspense height="50vh" />
      ) : (
        <form>
          <div className={classes.formServicePackage__wrapper}>
            <div className={classes.formServicePackage__wrapper__formGroup}>
              <LabelField label={t('Service package code')} />
              <InputField
                style={{ borderRadius: '5px' }}
                placeholder={t('phd-servicePackageCode')}
                {...register('servicePackageCode')}
                errors={errors?.servicePackageCode?.message}
              />
            </div>

            <div className={classes.formServicePackage__wrapper__formGroup}>
              <LabelField label={t('Service package name')} />
              <InputField
                style={{ borderRadius: '5px' }}
                placeholder={t('phd-servicePackageName')}
                {...register('packageName')}
                errors={errors?.packageName?.message}
              />
            </div>

            <div className={classes.formServicePackage__wrapper__formGroup}>
              <LabelField label={t('Service package description')} />
              <InputField
                style={{ borderRadius: '5px' }}
                placeholder={t('phd-servicePackageDescription')}
                {...register('description')}
                errors={errors?.description?.message}
              />
            </div>

            <div className={classes.formServicePackage__wrapper__formGroup}>
              <LabelField label={t('Post type')} />
              <SelectField
                control={control}
                name="postType"
                errors={errors?.postType?.message}
                optionList={optionsPostType}
                placeholder={t('choose-postType')}
              />
            </div>

            <div className={classes.formServicePackage__wrapper__formGroup}>
              <LabelField label={t('Service')} />
              <SelectMultiField
                control={control}
                name="services"
                placeholder={t('Choose service')}
                optionList={services.map((service) => ({
                  value: service._id,
                  label: service.serviceName,
                  price: service.price,
                }))}
                change={getPriceChange}
                errors={errors?.services?.message}
              />
            </div>

            <div className={classes.formServicePackage__wrapper__formGroup}>
              <LabelField label={t('Service package price')} />
              <InputNumField
                style={{ borderRadius: '5px' }}
                control={control}
                value={sumPriceService}
                nameCtrl="VND"
                errors={errors?.VND?.message}
                disabled
              />
            </div>

            <div className={classes.formServicePackage__wrapper__formGroup}>
              <LabelField label={t('Post quantity')} />
              <InputNumField
                style={{ borderRadius: '5px' }}
                control={control}
                nameCtrl="postQuantity"
                errors={errors?.postQuantity?.message}
                suffix=""
              />
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default ServicePackageCreatedItem
