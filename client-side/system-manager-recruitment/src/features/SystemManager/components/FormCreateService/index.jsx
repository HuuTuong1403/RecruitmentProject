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
import { isNunberic } from 'common/functions'

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
      setValue('tagName', dataUpdate.tagName)
      setValue('tagValue', dataUpdate.tagValue)
    }
  }, [isUpdate, dataUpdate, setValue])

  const submitCreateService = async (dataCreate) => {
    setLoading(true)
    const { tagName, tagValue, ...data } = dataCreate
    const arrayTagName = convertTagToArray(tagName.trim())
    const arrayTagValue = convertTagToArray(tagValue.trim())
    if (arrayTagName.length !== arrayTagValue.length) {
      notification(
        `Số phần tử giữa tên tag (${arrayTagName.length} phần tử) và giá trị tag (${arrayTagValue.length} phần tử) phải bằng nhau`,
        'warn'
      )
    } else {
      const tags = []
      arrayTagName.forEach((item, index) => {
        tags.push({ [item]: arrayTagValue[index] })
      })

      const payload = { ...data, tags }
      const result = await createService(payload)
      if (result.status === 'success') {
        notification(t('Create service successfully'), 'success')
        dispatch(getAllServiceAsync())
        handleCancelSubmit()
      } else {
        notification(result.message, 'error')
      }
    }
    setLoading(false)
  }

  const convertTagToArray = (tag) => {
    const tagNoSpace = tag.replace(/\s+/g, '')
    let arrayTag = []
    if (tagNoSpace.includes(',')) {
      arrayTag = tagNoSpace.split(',').filter((item) => item !== '')
    } else {
      arrayTag = [tag]
    }

    return arrayTag.map((item) => {
      if (item === 'true' || item === 'false') {
        return item === 'true'
      } else if (isNunberic(item)) {
        return +item
      } else {
        return item
      }
    })
  }

  const submitUpdateService = async (data) => {
    setLoading(true)
    if (
      data.price === dataUpdate.servicePrice &&
      data.serviceName === dataUpdate.serviceName &&
      data.description === dataUpdate.serviceDesc &&
      data.tagName === dataUpdate.tagName &&
      data.tagValue === dataUpdate.tagValue
    ) {
      notification(`${t('Updated data unchanged')}`, 'error')
    } else {
      const { tagName, tagValue, ...props } = data
      const arrayTagName = convertTagToArray(tagName.trim())
      const arrayTagValue = convertTagToArray(tagValue.trim())
      if (arrayTagName.length !== arrayTagValue.length) {
        notification(
          `Số phần tử giữa tên tag (${arrayTagName.length} phần tử) và giá trị tag (${arrayTagValue.length} phần tử) phải bằng nhau`,
          'warn'
        )
      } else {
        const tags = []
        arrayTagName.forEach((item, index) => {
          tags.push({ [item]: arrayTagValue[index] })
        })
        const payload = { ...props, tags }
        const result = await updateService(dataUpdate.key, payload)
        if (result.status === 'success') {
          notification(t('Update service successfully'), 'success')
          dispatch(getAllServiceAsync())
          setDataUpdate({
            ...dataUpdate,
            servicePrice: data.price,
            serviceName: data.serviceName,
            serviceDesc: data.description,
            tagName: data.tagName,
            tagValue: data.tagValue,
          })
        } else {
          notification(result.message, 'error')
        }
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
      <div className={classes.formService__group}>
        <div>
          <LabelField label={t('Service name')} />
          <InputField
            placeholder={t('phd-serviceName')}
            {...register('serviceName')}
            errors={errors?.serviceName?.message}
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
      </div>

      <div className={classes.formService__group}>
        <div>
          <LabelField
            label={t('Tag name')}
            labelTooltip={t(
              "Enter the tag name corresponding to the name of the key used to store the key to display the service. If there are multiple values, each value is separated by a ','. For example: key1, key2,...."
            )}
          />
          <InputField
            placeholder={t('phd-tagName')}
            {...register('tagName')}
            errors={errors?.tagName?.message}
          />
        </div>

        <div>
          <LabelField
            label={t('Tag value')}
            labelTooltip={t(
              "Enter the tag value corresponding to the value of the key used to store the value to display the service. If there are multiple values, each value is separated by a ','. Only true, false, numeric or literal values ​​are accepted. For example: true, false, 30, value,..."
            )}
          />
          <InputField
            placeholder={t('phd-tagValue')}
            {...register('tagValue')}
            errors={errors?.tagValue?.message}
          />
        </div>
      </div>

      <div>
        <LabelField label={t('Service description')} />
        <InputField
          placeholder={t('phd-serviceDesc')}
          {...register('description')}
          errors={errors?.description?.message}
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
