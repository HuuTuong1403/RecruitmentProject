import { Controller } from "react-hook-form";
import InputField from "custom-fields/InputField";

const PostJobField = (props) => {
  const {
    name,
    control,
    defaultValue,
    handleAddData,
    errors,
    placeholder,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        return (
          <InputField
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={(e) => {
              handleAddData({ [name]: e.target.value });
            }}
            errors={errors}
          />
        );
      }}
    />
  );
};

export default PostJobField;
