import { ErrorText } from 'components'
import { forwardRef } from 'react'
import { Input } from 'reactstrap'
import classes from './style.module.scss'

export const WrappedInput = forwardRef(({ errors, fontSize, bold = 'normal', ...props }, ref) => {
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
