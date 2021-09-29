import ReactTypingEffect from "react-typing-effect";
import classes from "./style.module.scss";
import { useTranslation } from "react-i18next";

const LoadingSuspense = (props) => {
  const { t } = useTranslation();

  return (
    <div style={{ height: `${props.height}` }} className={classes["loading"]}>
      <div className={classes["loading__wrapped"]}>
        <div className={classes["loading__wrapped--lds-roller"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {props.showText && (
          <div className={classes["loading__wrapped--text"]}>
            <ReactTypingEffect
              text={[`${t("loading-suspense")}`, `${t("wait-moment")}`]}
              cursorRenderer={(cursor) => <div>{cursor}</div>}
              eraseDelay={1000}
              eraseSpeed={5}
              typingDelay={500}
              speed={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSuspense;
