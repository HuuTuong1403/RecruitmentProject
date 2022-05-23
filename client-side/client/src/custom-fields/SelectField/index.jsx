import {
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
} from 'features/Home/slices/thunks'
import { Controller } from 'react-hook-form'
import { ErrorText } from 'components'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Select from 'react-select'

export const SelectField = ({
  control,
  defaultValue,
  optionList,
  name,
  placeholder,
  errors,
  isLocation = false,
  handleAddData,
  setValue,
  getValue,
  ...props
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (defaultValue) {
      if (optionList[0].options.length > 1) {
        if (name === 'city') {
          const findLocation = optionList[0].options.find((c) => c.label === defaultValue)
          dispatch(fetchDistrictsByProvinceAsync({ code: findLocation?.value }))
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionList[0].options.length > 1, defaultValue])

  useEffect(() => {
    if (defaultValue) {
      if (optionList[0].options.length > 1) {
        if (name === 'district') {
          const findLocation = optionList[0].options.find((c) => c.label === defaultValue)
          if (findLocation) {
            dispatch(fetchWardsByDistrictsAsync({ code: findLocation.value }))
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionList[0].options.length > 1, defaultValue])

  const formatGroupLabel = (data) => (
    <div>
      {data.options.length}/{data.options.length}
    </div>
  )

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              {...props}
              placeholder={placeholder}
              options={optionList}
              value={
                isLocation
                  ? optionList[0].options.find((c) => c.label === value) ?? ''
                  : optionList[0].options.find((c) => c.value === value) ?? ''
              }
              isDisabled={isLocation ? optionList[0].options.length <= 1 : false}
              onChange={(selectedOption) => {
                if (getValue) {
                  getValue(selectedOption.value)
                }
                
                if (isLocation) {
                  onChange(selectedOption.label)
                } else {
                  onChange(selectedOption.value)
                }

                if (handleAddData) {
                  handleAddData({
                    [name]: isLocation ? selectedOption.label : selectedOption.value,
                  })
                }

                if (isLocation && selectedOption.value) {
                  if (name === 'city') {
                    setValue('district', '', { shouldValidate: true })
                    setValue('ward', '', { shouldValidate: true })
                    dispatch(
                      fetchDistrictsByProvinceAsync({
                        code: selectedOption.value,
                      })
                    )
                  }
                  if (name === 'district') {
                    setValue('ward', '', { shouldValidate: true })
                    dispatch(
                      fetchWardsByDistrictsAsync({
                        code: selectedOption.value,
                      })
                    )
                  }
                }
              }}
              formatGroupLabel={formatGroupLabel}
            />
          )
        }}
      />
      <ErrorText errors={errors} />
    </Fragment>
  )
}
