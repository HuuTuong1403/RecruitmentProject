import { Controller } from 'react-hook-form'
import { ErrorText } from 'components'
import { Fragment } from 'react'
import Select from 'react-select'

export const SelectField = ({ control, defaultValue, optionList, name, placeholder, errors }) => {
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
              options={optionList}
              value={optionList.find((c) => c.value === value) ?? ''}
              onChange={(selectedOption) => {
                onChange(selectedOption.value)
              }}
            />
          )
        }}
      />
      <ErrorText errors={errors} />
    </Fragment>
  )
}
