import { Controller } from "react-hook-form";
import { Fragment } from "react";
import ErrorText from "components/ErrorText";
import Select from "react-select";

const SelectProfileField = (props) => {
  const { control, defaultValue, optionList, name, placeholder, errors } =
    props;

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
              value={optionList.find((c) => c.value === value) ?? ""}
              onChange={(selectedOption) => {
                onChange(selectedOption.value);
              }}
            />
          );
        }}
      />
      <ErrorText errors={errors} />
    </Fragment>
  );
};

export default SelectProfileField;
