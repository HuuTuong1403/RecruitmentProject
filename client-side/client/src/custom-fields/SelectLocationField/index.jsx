import { Controller } from 'react-hook-form'
import {
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
} from 'features/Home/slices/thunks'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ErrorText from 'components/ErrorText'
import Select from 'react-select'

const SelectLocationField = ({
  control,
  defaultValue,
  locationList,
  name,
  placeholder,
  errors,
  setValue,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (defaultValue) {
      if (locationList.length > 1) {
        if (name === 'city') {
          const findLocation = locationList.find((c) => c.label === defaultValue)
          dispatch(fetchDistrictsByProvinceAsync({ code: findLocation?.value }))
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationList.length > 1, defaultValue])

  useEffect(() => {
    if (defaultValue) {
      if (locationList.length > 1) {
        if (name === 'district') {
          const findLocation = locationList.find((c) => c.label === defaultValue)
          if (findLocation) {
            dispatch(fetchWardsByDistrictsAsync({ code: findLocation.value }))
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationList.length > 1, defaultValue])

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              placeholder={placeholder}
              options={locationList}
              value={locationList.find((c) => c.label === value) ?? ''}
              isDisabled={locationList.length <= 1}
              onChange={(selectedOption) => {
                onChange(selectedOption.label)
                if (selectedOption.value) {
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
            />
          )
        }}
      />
      <ErrorText errors={errors} />
    </Fragment>
  )
}

export default SelectLocationField
