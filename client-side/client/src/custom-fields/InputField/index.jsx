import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "reactstrap";
import classes from "./style.module.scss";
import ErrorText from "components/ErrorText";
import { useState, forwardRef } from "react";

const WrappedInput = forwardRef((props, ref) => {
  const { icon, errors } = props;
  const [visible, setVisible] = useState(false);

  const changeVisibleHandler = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <div className={classes.input}>
      {props.type !== "password" ? (
        <Input
          className={`${
            icon ? classes.input__inputfield : classes.input__noneicon
          }`}
          innerRef={ref}
          {...props}
        />
      ) : (
        <Input
          className={`${
            icon ? classes.input__inputfield : classes.input__noneicon
          }`}
          innerRef={ref}
          {...props}
          type={visible ? "text" : "password"}
        />
      )}
      {icon && <div className={classes.input__prefix}>{icon}</div>}
      {props.type === "password" && (
        <div className={classes.input__suffix}>
          {visible ? (
            <AiOutlineEyeInvisible onClick={changeVisibleHandler} />
          ) : (
            <AiOutlineEye onClick={changeVisibleHandler} />
          )}
        </div>
      )}
      <ErrorText errors={errors} />
    </div>
  );
});

export default WrappedInput;
