import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
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
  } = props;

  return (
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
            handleAddData({ [name]: selectedOption.label });
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
  );
};

export default SelectField;
