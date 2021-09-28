import Lottie from "lottie-react";
import classes from "./style.module.scss";
import LogInAnimation from "../../../../assets/lottie/login.json";
import RegisterAnimation from "../../../../assets/lottie/register.json";
import { useRouteMatch } from "react-router";

const AuthComponent = (props) => {
  const { url } = useRouteMatch();

  return (
    <section className={classes.auth}>
      <div className={classes.auth__container}>
        <div className={classes["auth__container--title"]}>
          Chào mừng bạn đến với MST Company
        </div>
        <div className={classes["auth__container--wrapped"]}>
          <div className={classes["auth__container--wrapped--column-left"]}>
            {url === "/home/sign-in" && (
              <Lottie animationData={LogInAnimation} />
            )}
            {url === "/home/sign-up" && (
              <Lottie animationData={RegisterAnimation} loop={false} />
            )}
          </div>
          <div className={classes["auth__container--wrapped--column-right"]}>
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthComponent;
