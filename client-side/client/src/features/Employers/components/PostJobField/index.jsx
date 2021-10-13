import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Controller } from "react-hook-form";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputField from "custom-fields/InputField";

const PostJobField = (props) => {
  const {
    name,
    control,
    defaultValue,
    handleAddData,
    isInput,
    errors,
    placeholder,
  } = props;

  const config = {
    toolbar: [
      "undo",
      "redo",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
    ],
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        return isInput ? (
          <InputField
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={(e) => {
              handleAddData({ [name]: e.target.value });
            }}
            errors={errors}
          />
        ) : (
          <CKEditor
            editor={ClassicEditor}
            config={config}
            data={value}
            onChange={(event, editor) => {
              onChange(editor.getData());
            }}
            onBlur={(event, editor) => {
              handleAddData({ [name]: editor.getData() });
            }}
          />
        );
      }}
    />
  );
};

export default PostJobField;
