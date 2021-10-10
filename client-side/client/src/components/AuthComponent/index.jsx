import { useRouteMatch } from "react-router";
import { useTranslation } from "react-i18next";
import classes from "./style.module.scss";
import EmployersLogin from "assets/lottie/employers-login.json";
import LogInAnimation from "assets/lottie/login.json";
import Lottie from "lottie-react";
import RegisterAnimation from "assets/lottie/register.json";

const AuthComponent = (props) => {
  const { url } = useRouteMatch();
  const { t } = useTranslation();
  return (
    <section className={classes.auth}>
      <div className={classes.auth__container}>
        <div className={classes["auth__container--title"]}>
          {t("welcome-to-MST")}
        </div>
        <div className={classes["auth__container--wrapped"]}>
          <div className={classes["auth__container--wrapped--column-left"]}>
            {url === "/home/sign-in" && (
              <Lottie animationData={LogInAnimation} loop={false} />
            )}
            {url === "/home/sign-up" && (
              <Lottie animationData={RegisterAnimation} loop={false} />
            )}
            {url === "/home/forgot-pass" && (
              <img
                src="https://res.cloudinary.com/university-of-education-technology/image/upload/v1632905416/nqu7stknbrswdvf3pouf.jpg"
                alt="ForgotPassImage"
                style={{ maxWidth: "100%" }}
              />
            )}
            {url === "/employers/sign-in" && (
              <Lottie animationData={EmployersLogin} />
            )}
            {url === "/employers/sign-up" && (
              <Lottie animationData={EmployersLogin} />
            )}
            {url === "/employers/forgot-pass" && (
              <img
                src="https://res.cloudinary.com/university-of-education-technology/image/upload/v1632905416/nqu7stknbrswdvf3pouf.jpg"
                alt="ForgotPassImage"
                style={{ maxWidth: "100%" }}
              />
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
