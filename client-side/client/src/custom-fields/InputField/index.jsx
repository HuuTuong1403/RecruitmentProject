import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import React, { useState } from "react";

const WrappedInput = React.forwardRef((props, ref) => {
  const { icon, errors } = props;
  const { t } = useTranslation();
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
      {errors && <p>{t(errors)}</p>}
    </div>
  );
});

export default WrappedInput;
