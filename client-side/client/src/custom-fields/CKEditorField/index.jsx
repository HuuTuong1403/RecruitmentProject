import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Controller } from "react-hook-form";
import { Fragment } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ErrorText from "components/ErrorText";

const CKEditorField = (props) => {
  const { name, control, defaultValue, handleAddData, errors, setText } = props;

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
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <CKEditor
            editor={ClassicEditor}
            config={config}
            data={value}
            onChange={(event, editor) => {
              onChange(editor.getData());
              if (setText) {
                setText(editor.getData());
              }
            }}
            onBlur={(event, editor) => {
              if (handleAddData) {
                handleAddData({ [name]: editor.getData() });
              }
            }}
          />
        )}
      />
      <ErrorText errors={errors} />
    </Fragment>
  );
};

export default CKEditorField;
