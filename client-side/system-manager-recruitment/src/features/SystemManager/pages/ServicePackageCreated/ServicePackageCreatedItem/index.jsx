import {
  LabelField,
  InputNumField,
  ButtonField,
  WrappedInput as InputField,
  SelectField,
  SelectMultiField,
  PopoverField,
} from 'custom-fields'
import { BiArrowBack } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import {
  createServicePackage,
  softDeleteServicePackage,
  updateServicePackage,
} from 'features/SystemManager/api/systemManager.api'
import { getAllServiceAsync } from 'features/SystemManager/slices/thunks'
import { notification } from 'components'
import { postTypeOptions } from 'common/constants/options'
import { schemaCreatePackageService } from 'common/constants/schema'
import { selectServices } from 'features/SystemManager/slices/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useTitle } from 'common/hook/useTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './style.module.scss'
import { FaSave, FaUndo, FaTrash } from 'react-icons/fa'

const ServicePackageCreatedItem = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState({ create: false, delete: false })
  const [isUpdate, setIsUpdate] = useState(false)
  const [servicePackage, setServicePackage] = useState(null)
  const [sumPriceService, setSumPriceService] = useState(
    servicePackage ? servicePackage.price?.VND : 0
  )
  const services = useSelector(selectServices)
  useTitle(isUpdate ? `${t('Update Service Package')}` : `${t('Create Service Package')}`)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    // reset,
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
    if (servicePackage) {
      setValue('servicePackageCode', servicePackage.servicePackageCode)
      setValue('packageName', servicePackage.packageName)
      setValue('description', servicePackage.description)
      setValue('postType', servicePackage.postType)
      setValue('postQuantity', servicePackage.postQuantity)
    } else {
      setValue('postQuantity', 0)
    }
  }, [setValue, sumPriceService, servicePackage])

  const submitFormServicePackage = async (dataServicePackage) => {
    const { services } = dataServicePackage
    dataServicePackage['services'] = services.map((data) => data.value)
    setLoading((prevValue) => ({ ...prevValue, create: true }))
    const result = isUpdate
      ? await updateServicePackage(servicePackage._id, dataServicePackage)
      : await createServicePackage(dataServicePackage)
    if (result.status === 'success') {
      setIsUpdate(true)
      setServicePackage(result.data.data)
      notification(
        isUpdate
          ? t('Update service package successfully')
          : t('Create service package successfully'),
        'success'
      )
    } else {
      notification(result.message, 'error')
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

  const handleDeleteServicePackage = async () => {
    setLoading((prevValue) => ({ ...prevValue, delete: true }))
    const result = await softDeleteServicePackage(servicePackage._id)
    if (result.status === 204) {
      notification(t('Delete service package successfully'), 'success')
      history.goBack()
    } else {
      notification(t('Error! An error occurred. Please try again later'), 'error')
    }
    setLoading((prevValue) => ({ ...prevValue, delete: false }))
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
          <ButtonField
            type="button"
            backgroundcolor="#17a2b8"
            backgroundcolorhover="#138496"
            radius="10px"
            padding="5px"
          >
            <FaUndo className={classes.formServicePackage__actions__icon} />
            {t('Recovery')}
          </ButtonField>
        )}

        {isUpdate && (
          <PopoverField
            title={t('Confirm delete forever service')}
            subTitle={t('Do you want to delete forever this service?')}
            loading={loading.delete}
            onClickOk={handleDeleteServicePackage}
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
        )}

        <ButtonField
          backgroundcolor="#0a426e"
          backgroundcolorhover="#324554"
          radius="10px"
          padding="5px"
          onClick={handleSubmit(submitFormServicePackage)}
          loading={loading.create}
        >
          <FaSave className={classes.formServicePackage__actions__icon} />
          {isUpdate ? t('Update Service Package') : t('Create Service Package')}
        </ButtonField>
      </div>

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
              defaultValue={
                servicePackage
                  ? servicePackage.services.map((service) => ({
                      value: service._id,
                      label: service.serviceName,
                      price: service.price,
                    }))
                  : null
              }
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
    </div>
  )
}

export default ServicePackageCreatedItem
