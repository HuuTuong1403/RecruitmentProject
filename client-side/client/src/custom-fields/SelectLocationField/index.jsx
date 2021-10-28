import { Controller } from "react-hook-form";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "components/ErrorText";
import Select from "react-select";

const SelectLocationField = (props) => {
  const dispatch = useDispatch();

  const {
    control,
    defaultValue,
    fetchData,
    locationList,
    name,
    placeholder,
    errors,
  } = props;

  useEffect(() => {
    if (locationList.length > 1) {
      if (name === "city") {
        const findLocation = locationList.find((c) => c.label === defaultValue);
        dispatch(fetchData({ code: findLocation?.value }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationList.length > 1, defaultValue]);

  useEffect(() => {
    if (locationList.length > 1) {
      if (name === "district") {
        const findLocation = locationList.find((c) => c.label === defaultValue);
        dispatch(fetchData({ code: findLocation?.value }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationList.length > 1, defaultValue]);

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
              options={locationList}
              value={locationList.find((c) => c.label === value) ?? ""}
              isDisabled={locationList.length <= 1}
              onChange={(selectedOption) => {
                onChange(selectedOption.label);
                if (fetchData && selectedOption.value !== "") {
                  dispatch(
                    fetchData({
                      code: selectedOption.value,
                    })
                  );
                }
              }}
            />
          );
        }}
      />
      <ErrorText errors={errors} />
    </Fragment>
  );
};

export default SelectLocationField;
