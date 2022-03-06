import { ButtonField, WrappedInput as InputField, LabelField, InputNumField } from 'custom-fields'
import { createService, updateService } from 'features/SystemManager/api/systemManager.api'
import { notification } from 'components'
import { schemaCreateService } from 'common/constants/schema'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { getAllServiceAsync } from 'features/SystemManager/slices/thunks'
import classes from './style.module.scss'

export const FormCreateService = ({ isUpdate = false, dataUpdate, setIsUpdate, setDataUpdate }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaCreateService),
  })

  useEffect(() => {
    if (isUpdate) {
      setValue('serviceName', dataUpdate.serviceName)
      setValue('description', dataUpdate.serviceDesc)
      setValue('price', dataUpdate.servicePrice)
    }
  }, [isUpdate, dataUpdate, setValue])

  const submitCreateService = async (dataCreate) => {
    setLoading(true)
    const result = await createService(dataCreate)
    if (result.status === 'success') {
      notification(t('Create service successfully'), 'success')
      dispatch(getAllServiceAsync())
      handleCancelSubmit()
    } else {
      notification(result.message, 'error')
    }
    setLoading(false)
  }

  const submitUpdateService = async (data) => {
    setLoading(true)
    if (
      data.price === dataUpdate.servicePrice &&
      data.serviceName === dataUpdate.serviceName &&
      data.description === dataUpdate.serviceDesc
    ) {
      notification(`${t('Updated data unchanged')}`, 'error')
    } else {
      const result = await updateService(dataUpdate.key, data)
      if (result.status === 'success') {
        notification(t('Update service successfully'), 'success')
        dispatch(getAllServiceAsync())
        setDataUpdate({
          ...dataUpdate,
          servicePrice: data.price,
          serviceName: data.serviceName,
          serviceDesc: data.description,
        })
      } else {
        notification(result.message, 'error')
      }
    }

    setLoading(false)
  }

  const handleCancelSubmit = () => {
    if (isUpdate) {
      setIsUpdate(false)
    }
    reset({
      price: 0,
      serviceName: '',
      description: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(isUpdate ? submitUpdateService : submitCreateService)}
      className={classes.formService}
    >
      <div>
        <LabelField label={t('Service name')} />
        <InputField
          placeholder={t('phd-serviceName')}
          {...register('serviceName')}
          errors={errors?.serviceName?.message}
        />
      </div>
      <div>
        <LabelField label={t('Service description')} />
        <InputField
          placeholder={t('phd-serviceDesc')}
          {...register('description')}
          errors={errors?.description?.message}
        />
      </div>
      <div>
        <LabelField label={t('Service price')} />
        <InputNumField
          placeholder={t('phd-servicePrice')}
          control={control}
          nameCtrl="price"
          errors={errors?.price?.message}
        />
      </div>
      <div className={classes.formService__actions}>
        <ButtonField
          type="button"
          backgroundcolor="#dd4b39"
          backgroundcolorhover="#bf0000"
          onClick={handleCancelSubmit}
          uppercase
        >
          {isUpdate ? t('Cancel update') : t('Cancel')}
        </ButtonField>

        <ButtonField
          type="submit"
          backgroundcolor="#0a426e"
          backgroundcolorhover="#324554"
          uppercase
          loading={loading}
        >
          {isUpdate ? t('Update service') : t('Create service')}
        </ButtonField>
      </div>
    </form>
  )
}
