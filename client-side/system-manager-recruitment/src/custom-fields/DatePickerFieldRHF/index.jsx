import { Controller } from 'react-hook-form'
import { DatePicker } from 'antd'
import { ErrorText } from 'components'
import { Fragment } from 'react'

export const DatePickerFieldRHF = ({
  control,
  dateFormat,
  disabledDate,
  errors,
  handleAddData,
  name,
  placeholder,
  showTime,
  value,
}) => {
  const onOk = (value) => {}

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field: { onChange } }) => (
          <DatePicker
            style={{ minHeight: '38px', width: '100%' }}
            dateRender={(current) => {
              const style = {}
              if (disabledDate(current)) {
                style.textDecoration = 'line-through'
              }
              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              )
            }}
            showNow={false}
            format={dateFormat}
            value={value}
            placeholder={placeholder}
            showTime={showTime}
            disabledDate={disabledDate}
            onChange={(_, dateString) => {
              onChange(dateString)
              if (handleAddData) {
                handleAddData({ [name]: dateString })
              }
            }}
            onOk={onOk}
          />
        )}
      />
      <ErrorText errors={errors} />
    </Fragment>
  )
}
