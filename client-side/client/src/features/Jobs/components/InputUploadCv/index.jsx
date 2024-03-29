import { useState, forwardRef } from 'react'
import { ErrorText } from 'components'
import classes from './style.module.scss'

export const InputUploadCv = forwardRef(({ error, setError, placeholder = '' }, ref) => {
  const [fileName, setFileName] = useState('')

  const checkValidCvFile = (file) => {
    const validCvFile = [
      'application/msword',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!validCvFile.includes(file.type)) {
      setError('Only .doc .docx .pdf format is supported')
      return false
    }

    if (file.size >= 5000000) {
      setError('File limit 5MB')
      return false
    }
    setError('')
    return true
  }

  const handleChangeFile = () => {
    if (ref.current.files && ref.current.files[0]) {
      const cvFile = ref.current.files[0]
      if (checkValidCvFile(cvFile)) {
        setFileName(cvFile.name)
      } else {
        ref.current.value = null
        setFileName('')
      }
    } else {
      setError('CV file cannot be empty')
      setFileName('')
    }
  }

  return (
    <div className={classes.inputFile}>
      <input
        className={classes.inputFile__fakeFile}
        placeholder={placeholder}
        value={fileName}
        disabled
      />
      <input
        type="file"
        onChange={handleChangeFile}
        ref={ref}
        className={classes.inputFile__file}
      />
      <ErrorText errors={error} />
    </div>
  )
})
