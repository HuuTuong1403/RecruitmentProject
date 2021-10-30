import { forwardRef } from "react";
import { Input } from "reactstrap";
import classes from "./style.module.scss";
import ErrorText from "components/ErrorText";

const WrappedInput = forwardRef((props, ref) => {
  const { errors } = props;

  const style = {
    fontSize: props.fontSize,
    fontWeight: props.bold ?? "normal",
    border: errors && "1px dashed #fc4b08",
  };

  return (
    <div className={classes.input}>
      <Input
        style={style}
        className={classes.input__noneicon}
        innerRef={ref}
        {...props}
      />
      <div className={classes.input__error}>
        <ErrorText errors={errors} />
      </div>
    </div>
  );
});

export default WrappedInput;
