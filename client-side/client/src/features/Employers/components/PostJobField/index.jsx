import { Controller } from "react-hook-form";
import InputField from "custom-fields/InputField";

const PostJobField = ({
  name,
  control,
  defaultValue,
  handleAddData,
  errors,
  placeholder,
}) => {
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
              if (handleAddData) {
                handleAddData({ [name]: e.target.value });
              }
            }}
            errors={errors}
          />
        );
      }}
    />
  );
};

export default PostJobField;
