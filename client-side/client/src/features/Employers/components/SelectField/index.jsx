import { Controller } from "react-hook-form";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "components/ErrorText";
import Select from "react-select";

const SelectField = (props) => {
  const dispatch = useDispatch();

  const {
    control,
    defaultValue,
    fetchData,
    handleAddData,
    locationList,
    name,
    placeholder,
    errors,
  } = props;

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            placeholder={placeholder}
            options={locationList}
            value={locationList.find((c) => c.label === value) ?? ""}
            onChange={(selectedOption) => {
              onChange(selectedOption.label);
              if (handleAddData) {
                handleAddData({ [name]: selectedOption.label });
              }
              if (fetchData && selectedOption.value !== "") {
                dispatch(
                  fetchData({
                    code: selectedOption.value,
                  })
                );
              }
            }}
          />
        )}
      />
      <ErrorText errors={errors} />
    </Fragment>
  );
};

export default SelectField;
