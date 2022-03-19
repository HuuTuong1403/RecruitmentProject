import { Controller } from 'react-hook-form'
import { ErrorText } from 'components'
import { Fragment } from 'react'
import { WrappedInput } from 'custom-fields'
import NumberFormat from 'react-number-format'

export const InputNumField = ({ control, nameCtrl, placeholder, errors }) => {
  return (
    <Fragment>
      <Controller
        control={control}
        name={nameCtrl}
        render={({ field: { onChange, value, name } }) => {
          return (
            <NumberFormat
              value={value}
              name={name}
              placeholder={placeholder}
              thousandsGroupStyle="thousand"
              thousandSeparator={true}
              customInput={WrappedInput}
              suffix="₫"
              onValueChange={(v) => onChange(v.value)}
            />
          )
        }}
      />
      <ErrorText errors={errors} />
    </Fragment>
  )
}
