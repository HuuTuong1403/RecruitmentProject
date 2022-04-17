import {
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
} from 'features/Home/slices/thunks'
import { Controller } from 'react-hook-form'
import { ErrorText } from 'components'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Select from 'react-select'

export const SelectPostJobField = ({
  control,
  defaultValue,
  errors,
  handleAddData,
  isLocation,
  list,
  name,
  placeholder,
  setValue,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (defaultValue) {
      if (list.length > 1) {
        if (name === 'city') {
          const findLocation = list.find((c) => c.label === defaultValue)
          dispatch(fetchDistrictsByProvinceAsync({ code: findLocation?.value }))
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length > 1, defaultValue])

  useEffect(() => {
    if (defaultValue) {
      if (list.length > 1) {
        if (name === 'district') {
          const findLocation = list.find((c) => c.label === defaultValue)
          if (findLocation) {
            dispatch(fetchWardsByDistrictsAsync({ code: findLocation.value }))
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length > 1, defaultValue])

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            placeholder={placeholder}
            options={list}
            value={
              isLocation
                ? list.find((c) => c.label === value) ?? ''
                : list.find((c) => c.value === value) ?? ''
            }
            isDisabled={list.length <= 1}
            onChange={(selectedOption) => {
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
                }
                if (name === 'district') {
                  setValue('ward', '', { shouldValidate: true })
                }
              }
            }}
          />
        )}
      />
      <ErrorText errors={errors} />
    </Fragment>
  )
}
