import { useState } from "react";
import classes from "./style.module.scss";

const ButtonField = (props) => {
  const [hover, setHover] = useState(false);

  const style = {
    backgroundColor: props.backgroundcolor,
    color: props.color,
    width: props.width,
  };

  const styleHover = {
    backgroundColor: props.backgroundcolorhover,
  };

  return (
    <button
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...style, ...(hover ? styleHover : null) }}
      className={`${classes.button} ${props.disabled ? classes.disabled : ""}`}
    >
      {props.children}
    </button>
  );
};

export default ButtonField;
