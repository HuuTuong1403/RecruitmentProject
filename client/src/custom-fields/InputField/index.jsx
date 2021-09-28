import React from "react";
import { Input } from "reactstrap";
import classes from "./style.module.scss";

const WrappedInput = React.forwardRef((props, ref) => {
  const { icon, errors } = props;
  return (
    <div className={classes.input}>
      <Input
        className={`${
          icon ? classes.input__inputfield : classes.input__noneicon
        }`}
        innerRef={ref}
        {...props}
      />
      {icon && <div className={classes.input__prefix}>{icon}</div>}
      <p>{errors}</p>
    </div>
  );
});

export default WrappedInput;
