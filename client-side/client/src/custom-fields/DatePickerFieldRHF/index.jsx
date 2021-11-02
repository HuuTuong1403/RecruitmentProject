import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import { Fragment } from "react";
import ErrorText from "components/ErrorText";
import moment from "moment";

const DatePickerFieldRHF = ({
  control,
  dateFormat,
  disabledDate,
  errors,
  handleAddData,
  name,
  placeholder,
  showTime,
  defaultValue,
}) => {
  const onOk = (value) => {};

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              style={{ minHeight: "38px", width: "100%" }}
              dateRender={(current) => {
                const style = {};
                if (disabledDate(current)) {
                  style.textDecoration = "line-through";
                }
                return (
                  <div className="ant-picker-cell-inner" style={style}>
                    {current.date()}
                  </div>
                );
              }}
              showNow={false}
              format={dateFormat}
              defaultValue={value ? moment(value, dateFormat) : ""}
              value={value ? moment(value, dateFormat) : ""}
              placeholder={placeholder}
              showTime={showTime}
              disabledDate={disabledDate}
              allowClear={false}
              onChange={(_, dateString) => {
                onChange(dateString);
                if (handleAddData) {
                  handleAddData({ [name]: dateString });
                }
              }}
              onOk={onOk}
            />
          );
        }}
      />
      <ErrorText errors={errors} />
    </Fragment>
  );
};

export default DatePickerFieldRHF;
