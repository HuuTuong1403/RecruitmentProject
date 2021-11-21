import { Input } from 'antd'
import { Controller } from 'react-hook-form'
import { Fragment } from 'react'
import ErrorText from 'components/ErrorText'

const TextAreaField = ({
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

export default TextAreaField
