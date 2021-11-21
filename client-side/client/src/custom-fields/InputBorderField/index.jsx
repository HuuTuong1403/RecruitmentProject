import { forwardRef } from 'react'
import { Input } from 'reactstrap'
import classes from './style.module.scss'
import ErrorText from 'components/ErrorText'

const InputBorderField = forwardRef(({ errors, fontSize, bold = 'normal', ...props }, ref) => {
  const style = {
    fontSize: fontSize,
    fontWeight: bold,
    border: errors && '1px dashed #fc4b08',
  }

  return (
    <div className={classes.input}>
      <Input style={style} className={classes.input__noneicon} innerRef={ref} {...props} />
      <div className={classes.input__error}>
        <ErrorText errors={errors} />
      </div>
    </div>
  )
})

export default InputBorderField
