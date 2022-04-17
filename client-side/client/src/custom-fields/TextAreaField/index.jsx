import { Controller } from 'react-hook-form'
import { ErrorText } from 'components'
import { Fragment } from 'react'
import { Input } from 'antd'

export const TextAreaField = ({
  name,
  control,
  errors,
  maxLength = 100,
  showCount = false,
  rows = 4,
  placeholder = '',
  allowClear = true,
}) => {
  const { TextArea } = Input

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextArea
            value={value}
            allowClear={allowClear}
            showCount={showCount}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
            rows={rows}
          />
        )}
      />
      {errors && <ErrorText errors={errors} />}
    </Fragment>
  )
}
