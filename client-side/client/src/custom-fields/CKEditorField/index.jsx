import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Controller } from 'react-hook-form'
import { ErrorText } from 'components'
import { Fragment } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export const CKEditorField = ({
  name,
  control,
  defaultValue,
  placeholder = '',
  handleAddData,
  errors,
  setText,
}) => {
  const config = {
    placeholder: placeholder,
    toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
  }

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
              onChange(editor.getData())
              if (setText) {
                setText(editor.getData())
              }
            }}
            onBlur={(event, editor) => {
              if (handleAddData) {
                handleAddData({ [name]: editor.getData() })
              }
            }}
          />
        )}
      />
      <ErrorText errors={errors} />
    </Fragment>
  )
}
