import { Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { ErrorText } from 'components'
import Select from 'react-select'

export const SelectMultiField = ({
  control,
  defaultValue,
  optionList,
  name,
  placeholder,
  errors,
  change,
}) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              isMulti
              placeholder={placeholder}
              options={optionList}
              value={value}
              onChange={(option) => {
                onChange(option)
                change(option)
              }}
            />
          )
        }}
      />
      <ErrorText errors={errors} />
    </Fragment>
  )
}
