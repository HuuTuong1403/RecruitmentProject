import { Button } from 'antd'
import { useState } from 'react'
import classes from './style.module.scss'

const ButtonField = ({
  backgroundcolor,
  color = '#fff',
  backgroundcolorhover,
  width = '100%',
  radius = '20px',
  uppercase = false,
  padding = '8px',
  type = 'button',
  disabled = false,
  children,
  ...props
}) => {
  const [hover, setHover] = useState(false)

  const style = {
    backgroundColor: backgroundcolor,
    color: color,
    width: width,
    borderRadius: radius,
    textTransform: uppercase ? 'uppercase' : '',
    padding: padding,
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

export default ButtonField
