import { Button } from 'antd'
import { useState } from 'react'
import classes from './style.module.scss'

export const ButtonField = ({
  backgroundcolor,
  uppercase = false,
  color = '#fff',
  backgroundcolorhover,
  radius = '20px',
  padding = '8px',
  type = 'button',
  disabled,
  width = '100%',
  children,
  margin = '',
  ...props
}) => {
  const [hover, setHover] = useState(false)

  const style = {
    backgroundColor: backgroundcolor,
    color: color,
    borderRadius: radius,
    width: width,
    textTransform: uppercase ? 'uppercase' : '',
    padding: padding,
    margin: margin,
  }

  const styleHover = {
    backgroundColor: backgroundcolorhover,
  }

  return (
    <Button
      {...props}
      htmlType={type}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...style, ...(hover ? styleHover : null) }}
      className={`${classes.button} ${disabled ? classes.disabled : ''}`}
    >
      {children}
    </Button>
  )
}
