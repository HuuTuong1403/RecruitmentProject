import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "reactstrap";
import { useState, forwardRef } from "react";
import classes from "./style.module.scss";
import ErrorText from "components/ErrorText";

const WrappedInput = forwardRef(({ icon, errors, type, ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  const changeVisibleHandler = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <div className={classes.input}>
      {type !== "password" ? (
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
      {type === "password" && (
        <div className={classes.input__suffix}>
          {visible ? (
            <AiOutlineEye onClick={changeVisibleHandler} />
          ) : (
            <AiOutlineEyeInvisible onClick={changeVisibleHandler} />
          )}
        </div>
      )}
      <ErrorText errors={errors} />
    </div>
  );
});

export default WrappedInput;
