import { Button } from 'antd'
import { useState } from 'react'
import classes from './style.module.scss'

const ButtonField = (props) => {
  const [hover, setHover] = useState(false)

  const style = {
    backgroundColor: props.backgroundcolor,
    color: props.color,
    width: props.width,
    borderRadius: props.radius,
    textTransform: props.uppercase === 'true' ? 'uppercase' : '',
    padding: props.padding,
  }

  const styleHover = {
    backgroundColor: props.backgroundcolorhover,
  }

  return (
    <Button
      {...props}
      htmlType={props.type}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...style, ...(hover ? styleHover : null) }}
      className={`${classes.button} ${props.disabled ? classes.disabled : ''}`}
    >
      {props.children}
    </Button>
  )
}

export default ButtonField
