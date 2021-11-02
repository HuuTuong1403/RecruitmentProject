import { Controller } from "react-hook-form";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "components/ErrorText";
import Select from "react-select";

const SelectField = ({
  control,
  defaultValue,
  errors,
  fetchData,
  handleAddData,
  isLocation,
  list,
  name,
  placeholder,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (list.length > 1) {
      if (name === "city") {
        const findLocation = list.find((c) => c.label === defaultValue);
        dispatch(fetchData({ code: findLocation?.value }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length > 1, defaultValue]);

  useEffect(() => {
    if (list.length > 1) {
      if (name === "district") {
        const findLocation = list.find((c) => c.label === defaultValue);
        dispatch(fetchData({ code: findLocation?.value }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length > 1, defaultValue]);

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            placeholder={placeholder}
            options={list}
            value={
              isLocation
                ? list.find((c) => c.label === value) ?? ""
                : list.find((c) => c.value === value) ?? ""
            }
            isDisabled={list.length <= 1}
            onChange={(selectedOption) => {
              if (isLocation) {
                onChange(selectedOption.label);
              } else {
                onChange(selectedOption.value);
              }

              if (handleAddData) {
                handleAddData({
                  [name]: isLocation
                    ? selectedOption.label
                    : selectedOption.value,
                });
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
